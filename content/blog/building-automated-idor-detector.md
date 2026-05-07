---
title: "Building an Automated IDOR/BOLA Detector"
description: "Access control issues such as IDORs/BOLAs are a major issue. Rather than discovering these issues manually, attackers often take a different approach: they reuse large collections of previously observed URLs and probe them for inconsistent behavior. This raises an interesting question: can we use the same strategy defensively?"
slug: "building-an-automated-idor-detector"
date: "2026-05-06"
shareImage: /img/blog/draque-idor-detector.png
---

In my experience, the most common (and often most severe) type of vulnerabilities are IDOR (insecure direct object reference) and BOLA (broken object-level authorization). These issues occur when an application fails to properly verify whether a user is allowed to access a specific resource. Rather than discovering these issues manually, attackers often take a different approach: they reuse large collections of previously observed URLs and probe them for inconsistent behavior. This raises an interesting question: can we use the same strategy defensively?

I'm by no means the only one seeing IDOR/BOLA as a high risk; they were also the number one vulnerability in 2024 and 2025 according to [OWASP](https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/). These occur when a resource can be accessed by modifying parameters in the URL and the server is either missing authentication/authorization or when auth checks are present, but the ownership of the resource being requested is not properly validated (e.g. user1 uses her own token to access data from user2). The two terms are closely related; IDOR is typically used in web apps, while BOLA is the API-focused equivalent defined by OWASP.

A while back I had an idea inspired by a common attacker workflow. Rather than discovering endpoints one-by-one manually or through brute force, attackers often utilize large collections of previously observed URLs, often gathered from leaks, crawled traffic, and shared datasets. They probe these collections to see which ones are accessible and behave in certain ways to identify potential targets.

After spending a while trying to find auth misses for defensive security before the bad guys can, it occurred to me that a similar technique could be applied proactively using data readily available within a system. That led to a simple idea: instead of fuzzing blindly, replay real, previously observed requests under different authorization contexts and look for inconsistent access control behavior.

Similarly to how attackers approach the problem, one approach to this is to analyze previously observed request patterns readily available to you (e.g., logs, traffic captures, or test datasets), filtering based on relevant criteria (e.g. response characteristics), identifying unique endpoints, and then sending the resulting list to a small tool that replays each request using various authorization contexts, and recording potentially inconsistent authorization behavior.

At a high level, the detection strategy is:

1. Collect real request patterns from various sources (e.g. logs, traffic, test data, specs, etc.)
2. Normalize them into endpoint templates
3. Replay them with different identities
4. Flag inconsistent responses

This worked great, and eventually turned into a full application which worked pretty well for detecting issues early, but it has some limitations:

- How do we best identify unique endpoints?
- What about endpoints that don't get called often and might not appear in the logs I used?
- What about dead endpoints that exist but aren't called? Or new ones that aren't used yet?

This led me to eventually build a more generic tool called [draque](https://github.com/ynori7/draque) which can be used to streamline the logic for parsing logs, using swagger docs to enrich them.

![draque](/img/portfolio/draque.png)

This tool works in the following way: it collects routes from swagger docs, then extracts and groups the URLs from logs. If it knows the route from the swagger docs, it can directly identify the endpoint and just collects the route parameters as example inputs. If it doesn't know the route from the docs, it attempts to identify the dynamic parts of the URL with pattern matching. If we have routes in the swagger docs which didn't appear in any logs, it attempts to infer valid inputs based on what it knows from the URLs it did find.

This tool can be used as a standalone CLI tool for analysis, but can also be used as a library for building tools such as the one I was working on for detecting IDORs and BOLAs. Here is a very minimalistic example demonstrating how draque could be used as a basis for such a scanner:

```go
package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/ynori7/draque"
)

func main() {
	// Gather the test data
	d := draque.New(
		// Parse all access log files in a directory; adjust the format 
        // pattern to match your log format
		draque.WithLogDirectory("testdata/logs", `"{method}","{host}","{path}","{status}"`),
		// Parse all Swagger/OpenAPI specs (.json, .yaml, .yml) in a directory
		draque.WithSwaggerDirectory("testdata/swagger"),
		// We only want to retain one example parameter value for each 
        // parameter for our case
		draque.WithMaxExamples(1),
		// We only want to track one example URL that we saw from the 
        // logs for each endpoint
		draque.WithMaxObservations(1),
	)

	templates, err := d.Scan()
	if err != nil {
		log.Fatal(err)
	}

	client := http.Client{}
	for _, t := range templates {
		// Do whatever filtering you may want to do here, for example 
        // only for GET requests to avoid breaking things
		if t.Method != "GET" {
			continue
		}

		if len(t.Observations) == 0 {
            // skip if we have no observed or inferred URLs for this 
            // endpoint template
			continue 
		}

        // Use the first observed URL for this endpoint template
		example := t.Observations[0]

		// Make the request
		resp, err := client.Get(example.URL)
		if err != nil {
			log.Printf("Error making request to %s: %v", example.URL, err)
			continue
		}
		resp.Body.Close()

		// Decide if the endpoint is interesting based on the response 
        // status code or other criteria
		if resp.StatusCode == http.StatusOK {
			fmt.Printf("Found interesting endpoint: %s %s\n", t.Method, t.PathTemplate)
		}
	}
}

```

In addition, sometimes you need to avoid rate limiting and bot blocking even when testing your own APIs. For this purpose, it can be helpful to use another tool I created called [hulksmash](https://github.com/ynori7/hulksmash).

This tool was built for testing rate limiting and verifying brute force risks while securing an application. It works by making requests appear more human by adding randomized but realistic headers and by using `refraction-networking/utls` for creating an HTTP client which uses a browser-like TCP handshake. This tool can also be used as a library, for example:

```go
package main

import (
    "net/http"
    
    "github.com/ynori7/hulksmash/anonymizer"
    hulkhttp "github.com/ynori7/hulksmash/http"
)

func main() {
    // Create the client and the request anonymizer
    client := hulkhttp.NewClientV2()
    requestAnonymizer := anonymizer.New(int64(rand.Int()))

    // Use it like a standard http.Client
    req, _ := http.NewRequest(http.MethodGet, "https://example.com", nil)
    requestAnonymizer.AnonymizeRequest(req) // Pass the request to the anonymizer to add randomized human-like headers

    resp, err := client.Do(req)
    ...
}
```

With those two tools, all you really need to do is build the custom parts for your environment such as fetching/refreshing auth tokens as well as any special configuration you may want to add such as whitelisting URLs known to return your own data or generic public data. This approach is of course not a silver bullet, but it can help shift IDOR/BOLA detection from reactive to proactive by leveraging data you already have.