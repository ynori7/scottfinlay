---
title: "Functional Options Pattern in Go"
description: "One of the many issues you'll encounter as a Golang developer is trying to make parameters to a function optional. In Go, the Functional Options Pattern, is a common solution to this problem. Here's how it works."
slug: "functional-options-pattern-in-go"
date: "2016-12-29"
shareImage: /img/blog/gopher.png
updateRemark: Originally published on halls-of-valhalla.org. Re-published on May 3, 2026.
---

One of the many issues you'll encounter as a Golang developer is trying to make parameters to a function optional. It's a pretty common use case that you have some object which should work out-of-the-box using some basic default settings, and you may occasionally want to provide some more detailed configuration.

In many languages this is easy; in C-family languages, you can provide multiple versions of the same function with different numbers of arguments; in languages like PHP, you can give parameters a default value and omit them when calling the method. But in Golang you can't do either of those. So how do you create a function which has some additional configuration a user can specify if they want, but only if they want to?

There are a number of possible ways to do this, but most are pretty unsatisfactory, either requiring a lot of additional checking and validating in the code on the service-side, or extra work for the client by passing in additional parameters which they don't care about.

I'll walk through some of the different options and show why each is suboptimal and then we'll build our way up to our final, clean solution: the Functional Options Pattern.

Let's take a look at an example. Let's say we have some service called StuffClient which does some stuff and has a two configuration options (timeout and retries):

```go
type StuffClient interface {
    DoStuff() error
}

type stuffClient struct {
    conn    Connection
    timeout int
    retries int
}
```

That struct is private, so we should provide some sort of constructor for it:

```go
func NewStuffClient(conn Connection, timeout, retries int) StuffClient {
    return &stuffClient{
        conn:    conn,
        timeout: timeout,
        retries: retries,
    }
}
```

Hmm, but now we always have to provide the timeout and retries every time we call NewStuffClient. And most of the time we'll want to just use the default values. We can't define multiple versions of NewStuffClient with different numbers of parameters or else we'll get a compile error like "NewStuffClient redeclared in this block".

One option would be to create another constructor with a different name like:

```go
func NewStuffClient(conn Connection) StuffClient {
    return &stuffClient{
        conn:    conn,
        timeout: DEFAULT_TIMEOUT,
        retries: DEFAULT_RETRIES,
    }
}

func NewStuffClientWithOptions(conn Connection, timeout, retries int) StuffClient {
    return &stuffClient{
        conn:    conn,
        timeout: timeout,
        retries: retries,
    }
}
```

But that's kind of crappy. We can do better than that. What if we passed in a config object:

```go
type StuffClientOptions struct {
    Retries int //number of times to retry the request before giving up
    Timeout int //connection timeout in seconds
}

func NewStuffClient(conn Connection, options StuffClientOptions) StuffClient {
    return &stuffClient{
        conn:    conn,
        timeout: options.Timeout,
        retries: options.Retries,
    }
}
```

But that's also not really great. Now we always have to create this struct and pass that in even if we don't want to specify any options. And we also don't have the defaults automatically filled in unless we add a bunch of checks in the code somewhere or we expode a DefaultStuffClientOptions variable which we could pass in (also not nice because it could be modified in one place which could cause issues somewhere else).

So what's the solution? The nicest way to solve this dilemma is with the Functional Options Pattern, making use of Go's convenient support of closures. Let's keep this StuffClientOptions we defined above, but we'll add some things to it:

```go
type StuffClientOption func(*StuffClientOptions)

type StuffClientOptions struct {
    Retries int //number of times to retry the request before giving up
    Timeout int //connection timeout in seconds
}

func WithRetries(r int) StuffClientOption {
    return func(o *StuffClientOptions) {
        o.Retries = r
    }
}

func WithTimeout(t int) StuffClientOption {
    return func(o *StuffClientOptions) {
        o.Timeout = t
    }
}
```

Clear as mud right? What's happening here exactly? Basically we have our struct defining the available options for our StuffClient. Additionally now we've defined something called StuffClientOption (singular this time) which is just a function which accepts our options struct as a parameter. We've defined a couple of functions additionally called WithRetries and WithTimeout which return a closure. Now comes the magic:

```go
var defaultStuffClientOptions = StuffClientOptions{
    Retries: 3,
    Timeout: 2,
}

func NewStuffClient(conn Connection, opts ...StuffClientOption) StuffClient {
    options := defaultStuffClientOptions
    for _, o := range opts {
        o(&options)
    }

    return &stuffClient{
        conn:    conn,
        timeout: options.Timeout,
        retries: options.Retries,
    }
}
```

We've defined now an additional unexposed variable containing our default options, and we've adjusted our constructor now to instead accept a [variadic parameter](https://gobyexample.com/variadic-functions). We then iterate over that list of StuffClientOption (singular) and for each of them, we apply the returned closure to our options variable (and recall that those closures accept an StuffClientOptions variable and simply modify the option value on it).

Now all we have to do to use it is this:

```go
x := NewStuffClient(Connection{})
fmt.Println(x) // prints &{{} 2 3}

x = NewStuffClient(
    Connection{},
    WithRetries(1),
)
fmt.Println(x) // prints &{{} 2 1}

x = NewStuffClient(
    Connection{},
    WithRetries(1),
    WithTimeout(1),
)
fmt.Println(x) // prints &{{} 1 1}
```

That looks pretty nice and usable now. And the nice part about it is that we can very easily add new options any time we want with only a very minimal amount of change we need to make to the code.

Putting it all together we have something like this:

```go
var defaultStuffClientOptions = StuffClientOptions{
    Retries: 3,
    Timeout: 2,
}

type StuffClientOption func(*StuffClientOptions)

type StuffClientOptions struct {
    Retries int //number of times to retry the request before giving up
    Timeout int //connection timeout in seconds
}

func WithRetries(r int) StuffClientOption {
    return func(o *StuffClientOptions) {
        o.Retries = r
    }
}

func WithTimeout(t int) StuffClientOption {
    return func(o *StuffClientOptions) {
        o.Timeout = t
    }
}

type StuffClient interface {
    DoStuff() error
}
type stuffClient struct {
    conn    Connection
    timeout int
    retries int
}
type Connection struct {}

func NewStuffClient(conn Connection, opts ...StuffClientOption) StuffClient {
    options := defaultStuffClientOptions
    for _, o := range opts {
        o(&options)
    }

    return &stuffClient{
        conn:    conn,
        timeout: options.Timeout,
        retries: options.Retries,
    }
}

func (c stuffClient) DoStuff() error {
    return nil
}
```

If you want to try it out yourself, check it out on the [Go Playground](https://play.golang.org/p/VcWqWcAEyz).

But this could be simplified even more by removing the StuffClientOptions struct and applying the options directly to our StuffClient.

```go
var defaultStuffClient = stuffClient{
    retries: 3,
    timeout: 2,
}

type StuffClientOption func(*stuffClient)

func WithRetries(r int) StuffClientOption {
    return func(o *stuffClient) {
        o.retries = r
    }
}

func WithTimeout(t int) StuffClientOption {
    return func(o *stuffClient) {
        o.timeout = t
    }
}

type StuffClient interface {
    DoStuff() error
}
type stuffClient struct {
    conn    Connection
    timeout int
    retries int
}
type Connection struct{}

func NewStuffClient(conn Connection, opts ...StuffClientOption) StuffClient {
    client := defaultStuffClient
    for _, o := range opts {
        o(&client)
    }

    client.conn = conn

    return client
}

func (c stuffClient) DoStuff() error {
    return nil
}
```

Try it out [here](https://play.golang.org/p/Z5P5Om4KDL). In the case of our example, where we're just applying the config directly to our struct, it makes no sense to have an extra config struct in the middle. However, note that in many cases you may still want to use the config struct from the previous example; for instance, if your constructor is using the config options to perform some operations but then not storing them into the struct, or if they get passed around to other places. The config struct variant is the more generic implementation.

Credit to [Rob Pike](https://commandcenter.blogspot.de/2014/01/self-referential-functions-and-design.html) and [Dave Cheney](https://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis) for popularizing this design pattern.
