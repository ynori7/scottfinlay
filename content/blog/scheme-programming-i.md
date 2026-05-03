---
title: "Scheme Programming I"
description: "A basic introduction to programming in functional programming language, Scheme."
slug: "scheme-programming-i"
date: "2011-09-04"
shareImage: /img/blog/scheme1.png
updateRemark: Originally published on halls-of-valhalla.org. Re-published on May 3, 2026.
---

In this tutorial series I'll explain the programming language 'Scheme' and how it can be used. To begin with, we should take a look at what Scheme is. Scheme is a dialect of the language Lisp which stands for "list processing". Scheme is a very old (since 1975) functional programming language as opposed to a procedural programming language such as java or c++. If you're just learning the basic concepts of computer programming, scheme is a good place to start since there is very little syntax required. Also, most scheme interpreters allow you to program in real time (i.e. you can write your code in the terminal window).

## What is Scheme?

As mentioned previously, Scheme is a **functional programming language**. But what exactly does that mean? According to Wikipedia, "functional programming is a programming paradigm, a style of building the structure and elements of computer programs, that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data". Functional programming is a subset of **declarative programming**, "a style of building the structure and elements of computer programs, that expresses the logic of a computation without describing its control flow". Further examples of functional programming languages include Lisp, Haskell, and Erlang.

Most developers tend to be more familiar with **procedural programming** (a subset of **imperative programming**). Examples of procedural programming languages include C, Java, PHP, Python, and Visual Basic.

The definition for functional programming is quite cryptic unfortunately. The difference between functional and procedural programming is difficult to explain, but here is a useful summary:

* **Functional** programming focuses on **expressions**
* **Procedural** programming focuses on **statements**

## Introduction to Scheme Programming

Note: Comments in Scheme begin with a semicolon, (i.e. ';').

### Combinations
If you want to perform a simple operation such as 1+2+3+4, you would type: (+ 1 2 3 4) and the interpreter would output 10. + is not an operator in scheme, it is a procedure that is generally predefined. The general form for combinations is:

```scheme
(Procedure Parameter1 Parameter2 ... ParameterN)
```

Procedures such as + and * and so on can take in an arbitrary number of parameters.

### Special Forms
In scheme, the interpreter generally evaluates from left to right, but sometimes it's necessary to not evaluate an expression in normal order.
If you want to create your own abstraction (i.e. a procedure or value with a name), you must use the 'define' special form.

```scheme
( define (procedureName Parameter1 Parameter2 ... ParameterN)
          Expression1
          Expression2
          ...
          ExpressionN
          )
```

NOTE: scheme will only return the last expression in a procedure, so in a procedure with 4 expressions, the first three would just be performed, but not outputted. Also, the 'define' special form is actually a shortcut created for the user, and is actually calling up the 'lambda' special form, but I won't get into that.

### Conditionals
(note: true is represented as #t and false is #f)

- **If** (just a basic if-else)
  This procedure is called up in this form: (if Predicate Consequent Alternative(optional) )
  So (if (this is true) (do this) (otherwise do this) )
  Example: ( if #t (+ x x) )
- **Cond** (basically an else if)

```scheme
(cond (predicate1 consequent1)
      (predicate2 consequent2)
      (...)
      (predicateN consequentN)
      (else consequent)  )
```

- **Booleans** (can take an arbitrary number of arguments)
  `(and a b)` returns a true if both a and b are true
  `(or a b)` returns a true if a or b is true
  `(not a)` returns the opposite of a
- **Relational Operators** (>  <  >=  <=  =)
  (note: there is no != operator in scheme, so instead you could use `(not (= a b))` )
  `(> 5 3)` will return a #t because 5 is > 3

### Pairs
You can create pairs in scheme by typing (cons parameter1 parameter2) and if you define that pair as an abstraction, you can refer to it and get the individual pieces of it with (car pairName) which will return the left side of the pair or (cdr pairName) which will return the right side.
Example:

```scheme
(cons 1 2)
;will output (1 . 2)
```

### Lists
Scheme is basically built around this concept (since lisp stands for list processing). The list is created using the pair.
Example:

```scheme
(cons 1 (cons 2 (cons 3 () ) ) )
; gives you (1 2 3)
```

The list must be terminated with `()` as you can see above. This empty set of parenthesis is referred to as nil.
There's a predefined function for you though:

```scheme
(list 1 2 3)
;will give you (1 2 3)
```

## Sources
* [Declarative Programming](http://en.wikipedia.org/wiki/Declarative_programming)
* [Functional Programming](http://en.wikipedia.org/wiki/Functional_programming)
