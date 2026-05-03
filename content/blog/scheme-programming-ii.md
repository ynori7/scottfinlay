---
title: "Scheme Programming II"
description: "A slightly deeper look at programming in Scheme. Explains iteration and recursion (information applicable for other languages as well)."
slug: "scheme-programming-ii"
date: "2011-09-04"
shareImage: /img/blog/scheme2.jpg
updateRemark: Originally published on halls-of-valhalla.org. Re-published on May 3, 2026.
---

This introduction to Scheme programming is the sequel to [Scheme Programming I](/blog/scheme-programming-i). It is recommended that you read the Scheme Programming I article or that you have some background knowledge.

The primary topic in this article will be writing loops with Scheme. Unlike most languages, Scheme is a very barren language with very few built-in constructs. Scheme doesn't even have for and while loops! In scheme, all loops are done through recursion. It is also possible to make iterative solutions, but we'll get into that towards the end of this article. Within this article I'll also describe the underlying differences between recursion and iteration (these differences are applicable to all programming languages, not only Scheme).

## Recursion

Before we begin, note that '!' is the [factorial](http://en.wikipedia.org/wiki/Factorial) operator in mathematics. For this demonstration, we'll start with a simple recursive procedure to find factorials.

In recursive procedures, you must first determine two things:

1. **Base Case** (simplest form of the problem) For example:  0! = 1
2. **Recurrence Relation** For Example: (n!) = n*(n-1)!

Here is a simple factorial function in Scheme:

```scheme
(define (fact n)
  (if (= n 0) ;this is our base case
    1 ;if the base case is true, the procedure will return a one
    (* (fact (- n 1)) n) ;else the procedure will call itself up with n-1
  )
)
```

So, (fact 3) will return 6. Let's walk through it now. The key difference between iteration and recursion is that recursion needs to keep all of its calls in memory because it needs to come back to perform a calculation. So let's look at this one in depth.

When you start, you call up (fact 3), which will result in 3*(fact 2), and (fact 2) is 2*(fact 1), and (fact 1) is 1*(fact 0), so once it reaches the 0, it has reached the base case which the procedure has a value for. So we end up with 1*1*2*3=6.

Activation records (stack tower):
- (fact 0)
- (fact 1)
- (fact 2)
- (fact 3)
- Scheme
- Operating system

## Iteration

In iterative procedures, you need to keep track of three things:
1. Starting state
2. Terminating Criteria
3. Progress

To keep things simple, I'm going to use the example of factorials again:

```scheme
(define (factIter n progress partial) ;note that partial is used to keep track of the answer so far
  (if (= progress n)  ;terminating criteria
    Partial ;if the procedure is done, it will return the current answer
    (factIter n (+ progress 1) (* partial (+ progress 1) ) ) ;here's your recursive call
  )
)
```

While there is a recursive call in the iterative solution, there is a difference. The difference is that the iterative method does not require the interpreter to keep all the method calls in memory since it doesn't have to come back to do any calculations. Another name for the iterative procedure is 'tail-recursive' because the recursive call is the very last thing that is done in the procedure. (recall that in the recursive method the last thing done was the multiplication procedure, not the recursive call)

Since the interpreter doesn't need to keep track of each method call, the new call can just overwrite the old one in the stack tower, so it will look like this:

- (fact 3) (because each call to factiter will just overwrite this one with the new call)
- scheme
- op system

Iterative methods will probably run faster since the stack takes up less space and the computer doesn't have to trace down the stack, but recursive procedures are still valuable. Some problems are just naturally solved recursively such as tree methods and Fibonacci sequences.
