---
title: "Binary, Booleans, and Bitwise Operations"
description: "A basic explanation of binary, Boolean logic, and bitwise operators."
slug: "binary-booleans-and-bitwise-operations"
date: "2011-09-04"
shareImage: /img/blog/binary-booleans-bitwise-operations.png
updateRemark: Originally published on halls-of-valhalla.org. Re-published on May 3, 2026.
---

Ever wonder about binary, Boolean algebra, and bitwise operations? All of computing can be broken down to the combination of these three topics, and there are many examples of their uses in the real world. In this article we'll dive into the basics of these three concepts and see how they're related and used in practical applications.

## Binary

### Foundation

Let's begin with the very basics by explaining binary representation. In day-to-day life we interpret numbers in base ten; each digit can range from zero to nine and represents some power of ten. As you may already know, binary is a number system of base two. This means that it consists of only the numbers zero and one. Each digit represents a power of two. This may be a difficult concept to wrap your head around if you aren't already familiar with it, so it's best to begin with an example.

Take a look at the decimal number system, i.e. a number system based on powers of ten, which you are already familiar with:
1234 is a number in base ten. The "4" on the right represents the 1's digit (i.e. 4\*10<sup>0</sup>) the "3" is in the 10's place (i.e. 3\*10<sup>1</sup>) the "2" is in the 100's place (i.e. 2\*10<sup>2</sup>) and the "1" is in the 1000's place (i.e. 1\*10<sup>3</sup>).

Binary works in the same way:
00101101 is an example of a number in binary. The "1" on the far right is 1\*2<sup>0</sup> which is 1. Then we have 0\*2<sup>1</sup> which is 0. Then 1\*2<sup>2</sup> which is 4, and so on. When we've gone all the way through the **bits** (the term meaning 'binary digit') we end up with 1+4+8+32 which equals 45 in decimal.

A group of eight bits is called a **byte**. A kilobyte is 2<sup>10</sup> bytes, and so on. Here are some units of measurement in binary which are useful to know:

```
8 bits=1 byte
1024 bytes=1 kilobyte
1024 kilobytes=1 megabytes
1024 megabytes=1 gigabyte
1024 gigabytes=1 terabyte
1024 terabytes=1 petabyte
```

### Signed Representation

Next we want to know how we can represent negative numbers in binary. The term **signed** refers to the inclusion of both positive and negative values whereas **unsigned** numbers are only positive. Let's take a brief look at a few different methods for signed binary integer representation that have been used in the past (it will help to understand the reasons behind the current typical method).

### Sign-Magnitude
This is a method of representing signed numbers in binary in which the first bit means "negative" if it is a one and the rest of the bits indicate the magnitude, i.e. the actual numeric value. The downside with this representation is that there are two ways to represent zero: for example: 1000 (which is -0) and 0000 (which is 0).

### One's Compliment
The first bit represents the negative sign if is a one. To make a number negative, you flip every bit. So, for example, 01011 (i.e. eleven) when negative is 10100. This method has the same problem as Sign-Magnitude, however, in that there are two ways to represent zero.

### Two's Compliment
This is the method that is used in most modern computers. In this method, the first bit (on the far left) represents -2<sup>n-1</sup> where n is the number of bits; all the rest of the bits represent positive numbers. It's best explained through example:

```
seven=0111 and negative seven=1001
```

In the case of -7 (i.e. 1001), the value is (-8)+0+0+1 which equals -7. To summarize, the digit which contains the negative value is on the far left, and all other digits are positive values which are added. A quick tip: to invert a positive number (i.e. to make it negative), simply flip the bits and add 1.

### Excess Bias
In this technique, you first set a **bias** to bring everything into the positive range. The general formula for determining the bias is 2<sup>n-1</sup>-1. So, for example, assuming a three bit number, you would have a bias of three.

You then offset all of the numbers by the bias, so:

```
111 = 4 (i.e. seven minus three)
110 = 3
101 = 2
100 = 1
011 = -0
010 = -1
001 = -2
000 = -3
```

This might seem like an extremely over-complicated technique, but we're going to come back to this later when we get into floating-point representation, so don't just brush it off.

### Floating-Point Representation

So as you know, the digits in binary (i.e. bits) go by powers of two for integers, and they also go by powers of two for non-whole values too, but how do you represent it? Next we'll take a look at **floating-point** numbers. A floating-point number is basically a number with a decimal point (technically actually a 'binary point' in binary), but more specifically a moving decimal point (i.e. one that floats). This is different from a **fixed-point** number which would always have X integer places and Y decimal places. Fixed-point representation is rarely seen since it has a very poor range of representable values.

Say you have this number in binary: 1.111 the first digit on the left is going to be 1 (i.e. 2<sup>0</sup>) and to the right of the dot you have 111. From here we just keep subtracting one from the exponent as we move to the right. So we had already 2<sup>0</sup>, next is 2<sup>-1</sup> then 2<sup>-2</sup> and so on. So the number 1.111 will be 1 + 0.5 + 0.25 + 0.125 which is 1.875. This is an example of fixed-point representation.

As mentioned, we can't just represent decimals like that with a fixed-point since we have a limited number of bits that we can use. Thus the idea of the floating-point number was created. In this, you use something similar to scientific notation to move the decimal point around so that you can represent larger numbers. Hence the term floating-point.

Floating point representation uses a Sign-Magnitude representation for the fractional part (referred to as the **Mantissa**), and an "excess bias" representation for the exponent part. The numbers are represented in this format:

Sign \* Mantissa \* 2<sup>Exponent</sup>

But when written they are in the format of:

```
S EEEEEEEE MMMMMMMMMMMMMMMMMMMMMMM
```

So say you have this number in binary: 0 1011 010 you are told that the exponent has four bits and the fraction has three bits. We can then conclude the following:

- The sign is zero, so the number is positive
- The exponent is 1011 (the four bits after the sign). Since there are four bits, the bias is 2<sup>4-1</sup>-1 = 7. Therefore the exponent, 1011, equals 11 - 7 = 4
- The mantissa is 010 (the last three bits). In floating point representation, if the number is **normalized** (I'll explain that in a bit (no pun intended)), then you always assume it leads with a one (i.e. 2<sup>0</sup>), so the fraction is going to be 1.010 which equals 1.25
- Therefore the floating point number equals 1.25\*2<sup>4</sup>

Coming back to the topic of normalization, if the number has an exponent of all zeroes or all ones, the number is considered **denormalized** otherwise it is **normalized**. Here's what that means:

- If the exponent is all zeroes, the fraction starts with a leading zero.
- If the exponent is all ones and the fraction is zero, you get infinity (positive infinity if the sign is positive, and negative infinity if the sign is negative).
- If the exponent is all ones and the fraction is not zero you get NaN (i.e. not a number).

## Boolean Logic

Your computer's integrated circuits use these things called **logic gates** that to make certain things happen. These gates are AND, OR, NOT, XOR, NAND, and NOR.

The symbols used to represent these can vary (they even include more graphical representations for diagrams), but the ones that I will be using in this article are:

```
AND  = &
OR   = |
NOT  = !
XOR  = ^
NAND = !&
NOR  = !|
```

You can write **truth tables** to see what the outcomes will be for each of the logic gates given various inputs. Here are a few examples (where A and B are input values. Note that 1 means **true** and 0 means **false**):

For AND:

```
A   B   A&B
0   0    0
1   0    0
0   1    0
1   1    1
```

For OR:

```
A   B   A|B
0   0    0
1   0    1
0   1    1
1   1    1
```

For XOR:

```
A   B   A^B
0   0    1
0   1    1
1   0    1
1   1    0
```

To summarize in words:

- AND means that the outcome will be true if both inputs are true, otherwise the output is false.
- OR means that the outcome will be true if either input is true. If both inputs are false then the output is false.
- XOR means 'exclusive or'. It works like an OR gate except it only returns true if exactly one of the inputs is true, and it returns false if both are true or false.
- NOT is a unary operator (meaning it takes just one input), and it just returns the opposite of the input. So !1 = 0 and !0 = 1
- NAND is basically just 'not and'. It gives the opposite value that an AND gate would give.
- NOR is just 'not or'. It gives the opposite value that an OR gate would give.

A special note for NAND and NOR: these can be reduced to simple ANDs and ORs using **de Morgan's Theorem**. The theorem works thusly:

```
A NAND B = (NOT A) OR (NOT B)
A NOR B = (NOT A) AND (NOT B)
```

For the case of NOR, it can be easily converted to simple English by thinking of it as "neither A nor B".

## Bitwise Operations

Bitwise operations are very much like Boolean logic operations. Bitwise operators are used in computer programming to perform logical operations on bit strings at the level of their individual bits (rather that on the object as a whole).

The bitwise operators are:

```
&  = AND
|  = OR
!  = NOT
^  = XOR
~  = One's Compliment (i.e. invert the bits)
>> = Right Shift
<< = Left Shift
```

You already know how the AND, OR, NOT, and XOR operators work from the Boolean Logic section, but you probably didn't know that you can apply them to full binary strings. For example, if you have 10100101 | 10110111 it would be the same as apply OR to each corresponding digit for the two strings.

```
10100101 OR
10110011 Equals
10110111
```

The same goes for the AND and XOR operators.

The NOT operator works slightly different than you may expect. If you have any non zero number, the NOT of it will give zero, and the NOT of zero will give one.

Now, if you remember back to the beginning of this article, we briefly learned about what One's Compliment was. Basically, if you use the ~ operator on a number, it will flip all of the bits, so 1011 would become 0100 (similar to how one might have expected the NOT bitwise operator to work).

Right shift does exactly what it sounds like. It shifts the bits to the right. So, if you have the binary number 0101000, and you use the right shift operator on it like this: 0101000 >> 3, it will shift all of the bits to the right 3 places, so you will get 0000101. This is the same as dividing by 2<sup>3</sup>.

So x >> n is the same as x / 2<sup>n</sup>

Note that the right shift does preserve sign. So if you have a number like 1011 (this number is negative since the sign bit on the far left is one) and you shift it to the right, it will fill in the leading bits with ones. So 1011 >> 2 will be 1110. Also note that since these are integers, there will be a round-off error.

Left shift works the same way as right shift. It shifts the numbers to the left. This always fills in the new bits with zeroes though. Left shift (x << n) is the same as x\*2<sup>n</sup>.

You can create all of the operators used in programming with these as well as the typical plus operator.

For example: To make a number negative, you can do this: `~x + 1` (remember that quick tip mentioned when we talked about two's compliment)

To see if two numbers are equal, you can do this:

- Given int x and int y, the is equal operator is: `!(x ^ y)`
- To see if a number is positive, you can do this: `!(x>>31) & !!x` (note: this assumes an integer is 32 bits)

There are many more things that you can do with these, but you are probably thinking "why the hell would I waste my time doing that crap when I can just use an if statement?" Well the simple explanation is that using bitwise operators is actually much faster and more efficient as far as processing time than using for loops and if statements. So if you are in dire need of performance in your code, this might be the way to go.

Here are some more examples of operations implemented using only bitwise operators:

```c
/*
 *Examples of operations using only
 *The following operators: ! ~ & ^ | + << >>
 */

///////////////////////////////////////////////////
//return -1
int minusOne(void) {
  int x=0;
  return (~x);
}

///////////////////////////////////////////////////
/* 
 * negate : return -x 
 *   Example: negate(5) = -5.
 */
int negate(int x) {
  return (~x)+1;
}

///////////////////////////////////////////////////
/* 
 * copyLSB - set all bits of result to least significant bit of x
 *   Example: copyLSB(5) = 0xFFFFFFFF (all 1's), copyLSB(6) = 0x00000000
 */
int copyLSB(int x) {
  return !(x & 1)+(~0);
}
///////////////////////////////////////////////////

/* 
 * fitsBits - return 1 if x can be represented as an 
 *  n-bit, two's complement integer.
 *   1 <= n <= 32
 *   Examples: fitsBits(5,3) = 0, fitsBits(-4,3) = 1
 */
int fitsBits(int x, int n) {
  int y=x>>(n+(~0));
  return !(y+1) | !y;
}
///////////////////////////////////////////////////

/* 
 * isEqual - return 1 if x == y, and 0 otherwise 
 *   Examples: isEqual(5,5) = 1, isEqual(4,5) = 0
 */
int isEqual(int x, int y) {
  return !(x ^ y);
}
///////////////////////////////////////////////////

/* 
 * isPositive - return 1 if x > 0, return 0 otherwise 
 *   Example: isPositive(-1) = 0.
 */
int isPositive(int x) {
  return !(x>>31) & !!x;
}
///////////////////////////////////////////////////

/* 
 * isGreater - if x > y  then return 1, else return 0 
 *   Example: isGreater(4,5) = 0, isGreater(5,4) = 1
 */
int isGreater(int x, int y) {
  int a=x>>30, b=y>>30;
  int q=~(1<<31);
  int c=x&q, d=y&q;
  int z=a+(~b + 1);
  int h=c+(~d + 1);
  int p=!z;
  return ((!(z>>31) & !p) | (p & (!(h>>31)))) ^ !(x ^ y); 
}
///////////////////////////////////////////////////

/* 
 * logicalShift - shift x to the right by n, using a logical shift
 *   Can assume that 1 <= n <= 31
 *   Examples: logicalShift(0x87654321,4) = 0x08765432 
 */
int logicalShift(int x, int n) {
  int y=(1<<31);
  int q= (~y) & x;
  int p= q>>n;
  int k= y&x;
  return ((k>>31) & (1<<(31+(~n+1)))) | p;
}
///////////////////////////////////////////////////

/* 
 * leastBitPos - return a mask that marks the position of the
 *               least significant 1 bit. If x == 0, return 0
 *   Example: leastBitPos(96) = 0x20
 */
int leastBitPos(int x) {
  return (~x+1)&x;
}
///////////////////////////////////////////////////

/*
 * bitParity - returns 1 if x contains an odd number of 0's
 *   Examples: bitParity(5) = 0, bitParity(7) = 1
 */
int bitParity(int x) {
  int a = x ^ (x << 16);
  int b = a ^ (a << 8);
  int c = b ^ (b << 4);
  int d = c ^ (c << 2);
  int e = d ^ (d << 1);
  return !!(e & (1<<31));
}
```
