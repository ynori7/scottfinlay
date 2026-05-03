---
title: "Scheme Programming III"
description: "A look at how object-oriented programming can be possible with a basic functional programming language such as Scheme."
slug: "scheme-programming-iii"
date: "2011-09-04"
shareImage: /img/blog/scheme3.png
updateRemark: Originally published on halls-of-valhalla.org. Re-published on May 3, 2026.
---

At first glance, one might think that scheme isn't capable of object oriented programming, but it in fact it is one of the earliest languages capable of it. However, there are a number of important concepts that need to be understood first. Before reading further, it is recommended that you first read [Scheme Programming I](/blog/scheme-programming-i) and [II](/blog/scheme-programming-ii).

## Foundation

### Global Symbol Table
When you create an abstraction at the main level, it is stored in the global symbol table so it can be referred to later. When a variable or procedure is made, data is stored into the global symbol table as such:

Procedure name: parameters, body, environment

Note first that the name of the procedure is not actually part of the data for the procedure, but it is only a reference. Environment refers to the environment that the procedure was created in (e.g. global)
For example if you were to (define a 10) then define the procedure

```scheme
(define proc
        (define a 20)
        a)
```

If you called up proc it would return 20, not 10 because when you call up 'a' the scheme interpreter checks the global symbol table for 'a' defined locally (i.e. environment=proc) first before it checks for 'a' defined globally.

### Pointers
Unlike some other languages such as C/C++, scheme very good about garbage collecting. If there is nothing pointing at a procedure then the interpreter will kill it.
For example if you were to create (list 1 2 3) the interpreter would output (1 2 3), but then nothing is pointing at that list, so it would be deleted.

## Special Language Constructs

### Lambda
This is a special form used to create procedures. If you recall in my scheme programming 1 article, you use define to make a procedure an abstraction (i.e. put the procedure in memory linked to a specified name), but the lambda is how the procedure itself is actually being created.  It is used like this:

```scheme
(lambda (parameter1 parameter2 ... parameterN) body)
```

Note that you cannot refer to this procedure in memory because it has no abstraction, but lambda's have their uses. Also note that procedures always return the last value, so if you create a procedure that ends with a lambda, you can return a procedure.

### Let
Let is yet another special form which allows you to create a special environment to do stuff, so variable aren't affected globally. It is used as follows:

```scheme
(let ((var1 expression1)
      (var2 expression2)
      ...
      (varN expression))
      Body)
```

For example:

```scheme
(define a 5)
(+ (let ((a 3)
         (b 4))
         (+ a b))   ;this will be 3+4
a) ; +5 (uses the global one, not the let's local one)
```

### Mutator Methods
These allow you change what variables are pointing to and are used as follows

```scheme
(set! varName expression) ;this changes a variable/procedure
(set-car! Pair expression) ;changes the car of a pair (i.e. left side)
(set-cdr! Pair expression) ;changes the cdr of a pair (i.e. right side)
```

The ! is pronounced 'bang' and if you see a procedure with that symbol after it, it is a mutator.

## Object Oriented Programming

Finally we have all the tools we need to start thinking about objects. As an example, here's a counter object. This allows me to have a bunch of counters with a bunch of count variables without having to have a whole bunch of external methods and variables.

```scheme
(define (make-counter count)
  (lambda () (set! count (+ 1 count)) count))
```

All you have to do is instantiate your object and call it up.

```scheme
(define a (make-counter 0))
```

Note that the 0 is the initial value to start counting from. All you have to do to use it is call up a like this:

```scheme
(a)
```

Every time you call it up, it will output a value one larger than the last time. This works because the make-counter procedure is returning a procedure and that procedure's environment is make-counter, so when you use set! on count, it changes the count within that procedure, not globally so you can have as many counter objects as you want.

There is an alternative method, though I'm not sure you would consider it object oriented programming.
Here's an alternative that defines all the variables it needs within itself. So multicount is the only variable name in the global environment.

```scheme
(define multicount
  (let ((count1 0) ;initialize a bunch of counters
        (count2 0)
        (count3 0))
    (lambda(count)
      (cond ((= count 1) (set! count1 (+ 1 count1)) count1)
            ((= count 2) (set! count2 (+ 1 count2)) count2)
            ((= count 3) (set! count3 (+ 1 count3)) count3)))))
```

You can do this then:

```scheme
(multicount 1)
```

And it will increment count1. This works because the 'let' is only called up the first time (when you initialize it) and the lambda that is returned uses that same environment.
