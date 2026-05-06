---
title: "Cross-Site Request Forgery: Demystified"
description: "CSRF is amongst the most common vulnerabilities in websites, yet many developers have difficulty understanding the concept on how to prevent the vulnerability. Here we will attempt to clarify the concept and explain some of the potential solutions and outline the ones which work and the ones which don't."
slug: "cross-site-request-forgery-demystified"
date: "2014-01-26"
shareImage: /img/blog/csrf_demystified.png
updateRemark: Originally published on halls-of-valhalla.org. Re-published on May 3, 2026.
---

What exactly is cross-site request forgery? According to [many studies](https://www.whitehatsec.com/news/13pressarchives/PR_050213_statsreport.html), cross-site request forgery, or CSRF, is amongst the top three most common vulnerabilities in web applications. Yet in spite of the prevalence of this common vulnerability, many developers are either unaware of the concept, or have difficulty grasping the severity of this vulnerability and the methods to prevent it. Here we will attempt to clarify the concept and explain some of the potential solutions and outline the ones which work and the ones which don't.

## What is Cross-Site Request Forgery?

In layman's terms, CSRF is an attack intended to cause a victim to unknowingly perform a particular action on a particular site. The simplest way to clarify the methodology is through an example:

Let's say there exists a website called `testsite.com`, and this site has user accounts. It is given that an admin user is able to delete the user account for "bob" by visiting the URL `testsite.com/user.php?delete=bob`. If a non-admin user visits this URL, nothing will happen because they don't have admin privileges.

Now assume there is a malicious user with his own website, `malicioususer.com`. This malicious user could include code on a page of his site like this:

```html
<img src="http://testsite.com/user.php?delete=bob"/>
```

Now when the admin of testsite.com visits this page, he won't see anything because `http://testsite.com/user.php?delete=bob` is not a valid image. However testsite.com still received a request, and if the admin is logged in, the action will be performed and bob's account will be deleted.

![](/img/blog/csrf_flowchart.png)

This is the simplest form of CSRF. Typically the more interesting types of actions on a website will be performed using POST, so an img tag or hyperlink won't be a possible attack vector in most cases, but it's still possible to include auto-submitting forms and AJAX requests to perform CSRF.

## What Prevention Methods Do Not Work?

### Secret Cookies

*The idea:* Otherwise known as "security through obscurity". The concept is to create a cookie for the user containing some secret data such as an MD5 hash of the current timestamp. When the user visits a page with a form, the secret cookie will be set, and upon submitting a form, the backend code will verify that the cookie is set.

*Why it doesn't work:* Cookies are part of every request. Once a user has a cookie set, it doesn't matter whether or not the user intended to send a request to the site, the cookie will be there either way.

### Checking For a Session Id

*The idea:* If the user has a session id then the user already viewed the page before submitting data to it.

*Why it doesn't work:* While the above statement is true, it doesn't prove that the user viewed the page immediately before submitting the data for the same reason that secret cookies aren't valid proof, and additionally it proves absolutely nothing in the case that the target website has an XSS vulnerability to use as an attack vector for the CSRF attack.

### Only Allowing POST Requests

*The idea:* Only use POST requests for performing data-altering actions. This will prevent img tags and hyperlinks from being usable as attack vectors.

*Why it doesn't work:* While it is a good idea in general to not use GET requests for performing data-altering actions, it does not protect against POST's made using JavaScript, or forms on external sites with a destination pointing to the target site.

## How Can I Effectively Prevent CSRF?

There are a number of effective solutions, each with differing technologies, constraints, and weaknesses. The solution generally accepted as the "best" is the Synchronizer Token Pattern. We'll begin by explaining the most common implementation of this popular design pattern, and then go into some detail on alternative solutions.

### Synchronizer Token Pattern
This design pattern is typically considered the recommended technique for preventing cross-site request forgery attacks. It has a handful of different implementations, but the common attribute of each of them is the presence of a unique 'token'.

The most common implementation of the synchronizer token pattern consists of generating a unique token for each user and storing it in the session. When displaying a form or sensitive URL, this token should be included as a hidden input, GET parameter, or posted in some other way along with the other POST data.

![](/img/blog/csrf_token_flowchart.png)

Here is an example of a basic framework for CSRF prevention using synchronized tokens in PHP:

```php
<?php
/* 
 * Example Usage:
 * $csrfToken = new CsrfToken();
 * if($csrfToken->isValidToken($_POST)){
 *   //CSRF token is valid, so perform action
 * }
 * 
 * To display in forms, just use:
 * $token = $csrfToken->getToken();
 */

namespace Valhalla\CoreUtilities\Security;

use Valhalla\CoreUtilities\Http\HttpSession;

class CsrfToken {
    const TOKEN_NAME = 'CSRFToken';
    
    /**
     * @var Valhalla\CoreUtilities\Http\SessionInterface
     */
    protected $_session;
    
    /**
     * Gets a token from the session. If there isn't one, puts one there.
     * 
     * @return string
     */
    public function getToken() {
        $session = $this->getSession();
        if ($session->get(self::TOKEN_NAME) === false){
            $session->set(self::TOKEN_NAME, self::generateToken());
        }
        return $session->get(self::TOKEN_NAME);
    }
    
    /**
     * Checks if the CSRF token is set in the request.
     * 
     * @param array $requestParams
     * @return boolean
     */
    public function isTokenSet($requestParams){
        return ( !empty($requestParams[self::TOKEN_NAME]) );
    }

    /**
     * Checks if there exists a token and if it's valid.
     * 
     * @param array $requestParams
     * @return boolean
     */
    public function isValidToken($requestParams) {
        return ($this->isTokenSet($requestParams) and
                self::getToken() === $requestParams[self::TOKEN_NAME]);
    }

    /**
     * Generates a unique token.
     * 
     * @return string
     */
    protected function generateToken() {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
                mt_rand(0, 0xffff), 
                mt_rand(0, 0xffff), 
                mt_rand(0, 0xffff), 
                mt_rand(0, 0x0fff) | 0x4000, 
                mt_rand(0, 0x3fff) | 0x8000, 
                mt_rand(0, 0xffff), 
                mt_rand(0, 0xffff), 
                mt_rand(0, 0xffff)
        );
    }
    
    /**
     * Sets the session variable to be used.
     * 
     * @param Valhalla\CoreUtilities\Http\SessionInterface $session
     */
    public function setSession($session){
        $this->_session = $session;
    }
    
    /**
     * Gets the session object if set, otherwise uses HttpSession by default.
     * 
     * @return Valhalla\CoreUtilities\Http\SessionInterface
     */
    public function getSession(){
        if(is_null($this->_session)){
            $this->setSession(new HttpSession());
        }
        return $this->_session;
    }

}
```

### The Importance of The Same-Origin Policy
What most developers fail to realize with the synchronizer token is that it relies on the same-origin policy. The same-origin policy is a security policy implemented in standard browsers. "The policy permits scripts running on pages originating from the same site – a combination of scheme, hostname, and port number – to access each other's DOM with no specific restrictions, but prevents access to DOM on different sites." By default, JavaScript is only able to request pages from the same domain, however it's possible to manually set headers allowing specific domains to access your pages. For instance, when a website has multiple subdomains which need to request elements from each other, you can allow this by using the following header:

`Access-Control-Allow-Origin: <origin>`

Additionally, it's possible to allow from all sites by setting the above-mentioned header with an origin of '*'. Doing this allows any site to request pages from your domain using JavaScript, and this completely eliminates the security provided by the synchronizer token. A demonstration will be provided in the next section which outlines the importance of preventing cross-site scripting attacks to ensure CSRF prevention is effective. In short, ensure that your site is not granting exceptions to the same-origin policy to any sites which you do not control or which do not require it.

### Challenge-Response
One somewhat effective measure for preventing CSRF is to include a challenge for the user such as a CAPTCHA or requiring the re-entry of the user's password. When these techniques are properly implemented, they can prevent CSRF fairly successfully, however it isn't always feasible to include a challenge in every request, and it can have a negative impact on user experience.

### Checking The Referer
Referer is generally considered a weak identifier. While it's quite easy to spoof the referer, it's not possible in the context of a CSRF attack, and additionally the method requires no memory usage for things such as sessions. However, this technique can be circumvented on GET requests using a redirect vulnerability. Additionally, it should be noted that https domains do not send the referer header when the destination is not also https.

It should also be noted that many browsers don't send the header at all, or that sometimes users like to set their own website as the referer so that their link will appear in a site's logs. Under this circumstance, a user who legitimately intended to perform an action would be rejected.

### Checking The Origin Header
The concept here is similar to checking the referer, however the origin header will be present even when the user comes from an https domain to an http domain. However this technique is not yet perfect according to Mozilla:

> [One] approach to solving CSRF is to send a "Same-Origin" header with requests, setting its value to "YES" if the referrer is of the same origin as the requested content and "NO" otherwise. While this one-bit approach can be effective against CSRF, it doesn't seem robust enough for deployment.
>
> Some sites post data cross-site when they own multiple domains. Additionally, a state-changing request might not be actually intended: an open redirect might be exploited, thus spoofing the content submission.

## The Importance of Preventing Cross-Site Scripting Vulnerabilities

Nearly all of the above-mentioned techniques can be easily circumvented when an appropriately significant XSS vulnerability is present on the target website including the synchronizer token, checking referer, and checking the origin header. Only the challenge-response technique is safe from an XSS attack vector.

It's clear that when you have an XSS vulnerability, allowing the request to be made from the same domain as the target site, the referer and origin header with both indicate that the request came from the appropriate location. However it's somewhat more complex to circumvent the synchronizer token. To show the importance of preventing XSS vulnerabilities in order to ensure effective CSRF prevention, here is a simple demo. Note that this demo is also relevant for cross-domain attacks when the following header is set on your site: `Access-Control-Allow-Origin: *`

Assume you have a page on your website, `testsite.com/test.php`. Here we have a hard-coded CSRF token to simplify the demonstration.

```php
<html>
<head></head>
<body>
<?php
$csrfToken = 'wkjdb-iouer-234k3-wklu3k';

if(isset($_POST['data']) and isset($_POST['csrf_token']) and
  $_POST['csrf_token'] == $csrfToken){
  echo "Successful post.<br/>";
}
?>
<form action='' method='post'>
  <input type='text' name='data' value=''/>
  <input type='hidden' name='csrf_token' value='<?php echo $csrfToken; ?>'/>
  <input type='submit' name='submit' value='submit'/>
</form>
</body>
</html>
```

Now assume that on another page, `testsite.com/vulnerablePage.php` (or your own site in the case that the same-origin policy is removed), we have:

```javascript
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script>
request = jQuery.get('http://testsite.com/test.php', function( data ) {
  response = request.responseText;
  page_dom = $(response);
  csrf_token = page_dom.find('input[name="csrf_token"]').val();
  $.post('http://testsite.com/test.php', {'data':'you got hacked', 'csrf_token':csrf_token}, function(data){ $(".post_result").html(data);});
});
</script>
<div class='post_result'></div>
```

If you try out this experiment yourself, upon accessing this page, you should see the text "Successful post".

## Further Reading

- [OWASP CSRF Definition](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF))
- [OWASP CSRF Prevention Techniques](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet)
- [Wikipedia Same-Origin Policy](http://en.wikipedia.org/wiki/Same-origin_policy)
- [Mozilla Same-Origin Header](https://wiki.mozilla.org/Security/Origin)
- [Mozilla Access-Control Headers](https://developer.mozilla.org/en/docs/HTTP/Access_control_CORS#Access-Control-Allow-Origin)
