---
title: "Intro To Number Theory"
description: "This article is intended to show a simple introduction into number theory, and give readers some insight into the applications of number theory in encryption."
slug: "intro-to-number-theory"
date: "2011-09-04"
shareImage: /img/blog/number-theory.png
updateRemark: Originally published on halls-of-valhalla.org. Re-published on May 3, 2026.
---

This article is intended to show a simple introduction into number theory, and give readers some insight into the applications of number theory in encryption.

### Division

The first piece of knowledge you need to make sense of this is division. Note that this is not just `10/2=5`, this is a general definition of the concept that will be used later on in the article.

Definition:

`'a'` (such that `a¹0`) divides `'b'` if there exists `'k'` such that `b = ak`

This is denoted as: `a|b` (read as: a divides b)

Example:
- `3 | 7` – false
- `3 | 12` – true

Let `'a'`, `'b'`, `'c'` be integers. Then these are a few tautologies (something that is always true):

- If `a|b` and `a|c` , then `a|(b + c)`
- If `a|b`  then  `a | bc`
- If `a|b` and  `b|c`  then  `a|c`

I'll prove the first tautology mathematically: `a|b` and  `a|c ? a|(b + c)`

- Assume `a|b` and `a|c`.
- `b=ak1`, `c=ak2` where `k1` and `k2` are constants
- `b+c=ak1 + ak2`
- `b+c=a(k1+k2)`
- Since `k1+k2` is an integer, by the definition of division `a|b+c`

### Modulus

Definition:
`'a'` and `'b'` are integers, and `'m'` is a positive integer. `'a'` is congruent to `b modulo m` if `m|(a-b)`.
- This is written as: `a=b mod m`
- `a=b mod m` if `a%m=b%m` where `x%y` is the remainder of `x/y`

Example:
- `17%5=2`, `12%5=2`, therefore `17=12 mod 5`
- `3%10=7`, `17%10=7`, therefore `-3 =17 mod 10`

Here are a few tautologies (the first one being the most important in this case):

- `a=b mod m` if there exists `'k'` such that `a=b+km`. Note that this is equivalent to the definition shown above: `m|(a-b)`
- `(a+b)mod m =((a mod m)+(b mod m)) mod m`
- `ac mod m=((a mod m)(b mod m)) mod m`
- Let `'m'` be a positive integer. If `a=b mod m` and `c=d mod m`, then: `a+c=b+d(mod m)` and `ac=bd(mod m)`

Here's an example: Prove that if `'n'` is odd, then `n^2=1 mod 8`

There exists a `'k'` such that `n=2k+1` (note that this is the definition of an odd number)

So:

- `n^2=4k^2+4k+1`
- `n^2-1=4k^2+4k`
- `n^2-1=4k(k+1)`
- `n^2=1 mod 8` is the same as `8|n2-1` which is the same as `8|4k(k+1)`
- `4k(k+1)=8c` reduces to `k(k+1)=2c` when you divide both sides by 4

Note that both `k(k+1)` and `2c` are always even, and since k and c are just arbitrary constants, this is true.

Modulus is used in the definition for the Caesar Cipher: `E(x)=(x+k) mod 26` (note that the original Caesar Cipher used `k=3`). Where E(x) is the encrypted text and x is the original text.

### Greatest Common Divisor

The greatest common divisor of two integers `'a'` and `'b'` is the largest integer `'d'` such that `d|a` and `d|b`. This is denoted by `gcd(a, b)`.
Two numbers are considered relatively prime if they don't have any common factors (besides 1).

Here is a collection of functions containing the Euclidean algorithm for finding the GCD of two numbers (written in Python, but fairly simple to convert into whatever language you're comfortable with):

```python
#!/bin/python
import math

#computes the greatest common divisor between two numbers
def gcd(a, b):
  x=a
  y=b
  while y!=0:
    r=x%y
    x=y
    y=r
  return x

#computes least common multiple of two numbers
def lcm(a, b):
  c=gcd(a, b)
  return a*b/c

#determines if a number is prime or not
def isPrime(num):
  if num%2==0:
    return False
  maxnum=math.floor(math.sqrt(num))
  i=3
  while i<=maxnum:
    if num%i==0:
      return False
    else:
      i+=2
  return True

#returns a list of all the prime factors of a number
def factorize(num):
  if isPrime(num):
    return [num]
  maxnum=int(math.floor(math.sqrt(num)))
  if gcd(num, 2)>1:
    ans=[2]
    return ans+factorize(int(num/2))
  for x in range(3, maxnum+1, 2):
    if not isPrime(x):
      continue
    if gcd(x, num)>1:
      ans=[x]
      return ans+factorize(int(num/x))

#returns the nth fibonacci number
def fib(n):
  a, b = 0, 1
  for i in range(n):
    a, b = b, a + b
    return a

#get list of fibonacci numbers
def getFibs(n):
  a, b = 0, 1
  l = [a, b]
  for i in range(n):
    a, b = b, a + b
    l+=[b]
  return l

#returns the number of combinations n C r
def nCr(n, r):
  return math.factorial(n)/(math.factorial(r)*math.factorial(n-r))

#returns the number of permutations n P r
def nPr(n, r):
  total = 1
  for x in range(0, r):
    total *= n-x
  return total

#returns true if the string or number is a palindrome
def isPalindrome(x):
  x=str(x)
  for y in range(0, len(x)/2):
    if(x[y]!=x[-y-1]): return False
  return True

#the classic 3n+1 problem
def collatz(n, memory={1:1}):
  if not n in memory:
    memory[n] = collatz(3*n+1 if n%2 else n/2, memory) + 1
  return memory[n]
```

### Multiplicative Inverse

Given `a=b mod m`, there exists `'A'` such that `aA=1 mod m`. The inverse only exists if the `gcd(a, m)=1`.

So, for example, `3A=1 mod 7`. `'A'` must be equal to -2 since `3*(-2)` is -6, and `-6=1 mod 7` (since by definition, mod is `a-b=mk`, so `-7=7k`)

The inverse can be used in this type of situation: `3x=2 mod 5`. To solve for x, you need to isolate it (i.e. get rid of the 3 in front). The inverse of `3=2 mod 5` is 2, so multiply both sides by the inverse: `3xA=2A mod 5`, so we get `x=4 mod 5`.

If `gcd(a, m)` is not equal to one, you have to solve it differently. For example: `2x=2 mod 4`. Break the problem down to the definition of modulus.

- `2x=2+4k` Notice that everything is divisible by 2.
- `x=1+2k` Now you can use the definition of modulus to change it back.
- `x=1 mod 2`, therefore `x=1` is a solution (note that there are many solutions)

This can all be applied to when creating simple encryption algorithms and reversing them. For example, suppose that messages are encrypted using this formula: `F(p)=(ap+b) mod 26` such that `gcd(a, 26)=1` where p is the original data, a and b are integers, and `F(p)` is the encrypted data.

Here's how you can find the decryption algorithm:

- First break the problem down using the definition of modulus: `F(p)=26k+ap+b`
- Isolate 'p': `F(p)-b+26k=ap`
- Convert it back to modulus form: `ap=(F(p)-b) mod 26`
- Find the multiplicative inverse to solve for p: `p=A(F(p)-b) mod 26`
