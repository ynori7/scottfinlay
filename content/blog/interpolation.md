---
title: "Interpolation"
description: "An explanation of the definition of, process of computing, and uses of Interpolation in mathematics and numerical computing."
slug: "interpolation"
date: "2011-09-04"
shareImage: /img/blog/interpolation.png
updateRemark: Originally published on halls-of-valhalla.org. Re-published on May 3, 2026.
---

In the field of numerical computing and analysis, interpolation is a method for finding data points within the range of a discrete set of given points. In other words, given a series of data points, interpolation is a method by which you can approximate more points in between those given. There are quite a few different methods for interpolation, each with varying degrees of precision and complexity. These methods include: Newton Interpolating Polynomial (a.k.a. Gaussian Interpolation), Divided Difference, Lagrange Interpolation, Splines, and many other variations. I will be explaining just the first three. After explaining these three procedures I'll go into some detail on the uses and limitations of interpolation.

### Newton Interpolating Polynomial

This interpolation process is a logical approach to the problem. It's one of the most popular methods, and many other methods are essentially equivalent to this.

Given n data points, the general form of the Newton Interpolating Polynomial is:

![](/img/blog/F1.jpg)

For example, consider the following set of points:
`(1, 1)  (2, 2)  (4, -8)`

These points obviously don't come from a simple linear equation, so if we want to know what y is at x=3, we'll need to interpolate a polynomial to estimate. To do this, we begin by creating a simple linear equation that satisfies the first data point, and we gradually add terms to the equation so it satisfies the next point.

`P0(x)=1`
For x=1, y=1. This satisfies the first point.

`P1(x)=1+c(x-1)`
The (x-1) is there because we need this term to equal zero when x=1, otherwise it will no longer satisfy the first condition. C is a constant, but we don't know what it is. However, we do know what `P1(x)` is for x=2, so we can solve.

`2=1+c(2-1)`
So c must be equal to 1.

Now for the final term:

`P2(x)=1+(x-1)+c(x-1)(x-2)`
The (x-1) and (x-2) need to be present because this term needs to equal zero when x=1 and when x=2. So just like before, we can solve for c.

```
-8=1+(4-1)+c(4-1)(4-2)
-12=c*6
C=-2
```

So our final equation is:
`F(x)=1+(x-1)-2(x-1)(x-2)`

### Divided Difference

If you noticed a pattern when we solved for the C values in the previous process, you win. There is a pattern, and this method uses it to determine all the constants up front.

So let's use the same data points:
`(1, 1)  (2, 2)  (4, -8)`

We then construct a table like this:

```
|---------------------------------------------|
|     X    |    F(x)    |          |          |
|     1    |      1     |          |          |
|          |            |     ?    |          |
|     2    |      2     |          |     ?    |
|          |            |     ?    |          |
|     4    |     -8     |          |          |
|---------------------------------------------|
```

Our constants will be the three values along the top beginning with F(x)=1. We'll have to fill in those three question marks as we go. The method for finding the unknown values is difficult to put into a formula, but the process is quite simple, so it should be easy to follow in the example.

Let's solve for the first unknown (top left question mark):

Notice how this question mark sits between the rows with the first two points? That's because this constant relies on those values. So we take the difference of the F(x) values (top minus bottom) and divide that by the difference between the two corresponding x values.

```
(1-2)/(1-2) = 1
```

Now let's solve for the next unknown (bottom left question mark):
`(2-(-8))/(2-4)=-5`
This term is only used in order to determine the next term.

Now for the final unknown:
This one is a bit different than the others. It relies on two previous unknowns and the two outer-most terms, the 1 and the 4 (in the x column).
`(1-(-5))/(1-4)=-2`

So now our table looks like this:

```
|---------------------------------------------|
|     X    |    F(x)    |          |          |
|     1    |      1     |          |          |
|          |            |     1    |          |
|     2    |      2     |          |    -2    |
|          |            |    -5    |          |
|     4    |     -8     |          |          |
|---------------------------------------------|
```

So for our final equation, we write it out in the same form as the Newton Interpolating Polynomial, and we can use the c values: 1, 1, -2.

### Lagrange Interpolation

The Lagrange Polynomial is the result of an inversion of a complex matrix in linear algebra called the Vandermonde Matrix. That stuff is very dry and obscure, and it's not really necessary to understand the formula, so I'll leave it out. However, if you want to read up on it, look for: Vandermonde matrix, Vandermonde determinants, Linear Algebra, and matrix functions (e.g. determinants, cross products, Wronskians, Row-Echelon form, etc.).

Given the set of points:

```
X=[x1, x2, x3, ..., xn]
F(x)=[y1, y2, y3, ..., yn]
```

The formula for Lagrange Interpolation is:

![](/img/blog/F2.jpg)

The large operator on the left is an uppercase Greek letter Sigma, and the one to right of that is an uppercase Pi. For those of you who don't know, Sigma Notation is used to signify a series of summations, and Pi Notation is used to represent a series of multiplications. I won't go into specifics; you guys can look that up on Wikipedia if you need to.

So, for simplicity's sake we'll use the same three data points again:
`(1, 1)  (2, 2)  (4, -8)`

Given that there are three data points we can expand the Lagrange polynomial to look like this:

![](/img/blog/F3.jpg)

All we have to do now is plug in the data points and we're finished. So, we end up with this:

![](/img/blog/F4.jpg)

The Lagrange method can be easily converted into code so you can have a computer solve things for you. Here's some PHP code:

```php
//$n is the number of points.
//$x and $y are arrays of data.
//$point is the x value you want to know the corresponding y value for.
function Lagrange($n, $x, $y, $point) {
  $result=0.0;

  for ($i=0; $i<$n; $i++) {
    $temp=1.0;

    for ($j=0; $j<$n; $j++) {
      if($i!=$j) {
        $temp*=($point-$x[$j])/($x[$i]-$x[$j]);
      }
    }

    $result+=($temp*$y[$i]);
  }

  return $result;
}
```

### Uses and Limitations

If you've ever performed science experiments, you know that you rarely end up with data that works out to be a nice, perfect linear function. If you want your data to be useful, quite often you need a way to use it to predict a response to a certain condition.

You have an independant variable (x) and dependant variable (y). You need to find a way to express the relationship between these two variables in a meaningful way. Often this is done using a regression line or line-of-best-fit. This is called curve fitting. Interpolation is a form of curve fitting in which the generated function goes exactly through each of the data points.

Another use for interpolation is approximating a complex function by using a simple one. Sometimes we know what function generates our data, but it's too complex to efficiently evaluate (especially if you need to do it often). So instead, we can choose just a few data points using the complex function and interpolate a simpler function with them. Obviously the interpolated function will not be a perfect match, but sometimes the gain in simplicity outweighs the loss of precision.

Of course, interpolation is not perfect, and anybody using it needs to keep that in mind. Contrary to what one may think, more data points do not necessarily mean more accuracy. Using too many points leads to chaotic behavior because the degree of the function depends the number of data points used. Also, an interpolated function generally doesn't follow well outside the end points.
