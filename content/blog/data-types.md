---
title: "Data Types"
description: "A short article explaining the concepts around data types, and some of the more advanced ways to manipulate them."
slug: "data-types"
date: "2011-09-04"
shareImage: /img/blog/data-types.jpeg
updateRemark: Originally published on halls-of-valhalla.org. Re-published on May 3, 2026.
---

Data types are a vital component in any programming language, however, most people just take them for granted and don't really understand what they are or how they work. A type can be defined as a set of permitted values and a set of operations permitted on these values. Programming languages tend to have many different types, and they vary in their methods for handling them.

### Static vs. Dynamic and Strong vs. Weak

A type system for a programming language is a built-in method by which the language determines the type of data associated with a value. There are two major type systems: **static** and **dynamic**. Statically typed languages such as C++ and Java do not require a value to be set to variables before their use. For example:

```cpp
//C++ code
int x; //note that x has not been initialized to a value yet
x=5;
```

However, a dynamically typed language typically requires that every variable declaration is also an initialization or instantiation. For example:

```python
#Python code
a=0 #requires that you initialize the variable to a value
```

The compiler also handles the two type systems differently. In statically typed programs type checking is done at compile time, whereas in dynamically typed programs it is done at runtime.

Another important concept in relation to type systems is that of **strong** and **weak typing**. This is a concept commonly confused with static and dynamic typing. In strongly typed languages, all variables must be bound to a particular data type. For strongly typed languages at compile time, the compiler first performs a syntax analysis, and then it performs a few kinds of semantics analyses such as type-checking before finally generating the machine code. The compiler for strongly typed languages assigns a type to all expressions in a program at compile time. For example:

```java
//Java code
public class Example
{
  public static void main(String[] args)
  {
    int x=3;
    double y=1.01;
    y=x+y;
 /* In the above expression, x would be temporarily given the type "double". This is because of a kind of casting called "type promotion" that occurs when a variable of one type is converted to a larger type, in this case from an integer to a double precision float.*/
    if(x<y) {   //The expression x<y is assigned a "Boolean" type
      System.out.println("x="+x);
    }
  }
}
```

An important term when considering strong versus weak typing is "**typesafe**". A program is considered typesafe if it will always execute without type errors. A type system is considered strong if it will only accept typesafe programs. Otherwise it is considered weak. Essentially, a weak type system is one that allows the programmer to assign incorrect data to variables. Here is an example:

```cpp
/* C++ is an example of a strongly typed language */
#include<iostream>
#include<string>
using namespace std;
int main()
{
  string x="example";
  x=x+2;
  return 0;
}
```

Upon compilation, you receive an error similar to this:

```
test.cpp: In function 'int main()':
test.cpp:9: error: no match for 'operator+' in 'x + 2'
```

```php
/*PHP on the other hand is a weakly typed language*/
<?php
  $x="example";
  $x=$x+2; //this does not produce an error
?>
```

### Classification of Data Types

As well as having a type system, a compiler also supports many different types and usually provides a method for converting one type to another. There is also a multitude of different programming styles when it comes to dealing with types.

**Primitive data types** are types that generally have hardware support and/or are built directly into the language. Some examples of common primitive types are: integers, floating point numbers, characters and Boolean values. Other additional data types such as strings and arrays are considered complex data types.

**Ordinal Types** are those that have a fixed sequence. "Integer" is an example of an ordinal type because any subset of the set of all integers is finite, can be counted, and has a specific order. This cannot be said for floats (e.g. the subset from 10.000000 to 10.000001 has an infinite number of floating point values in between the two end points).

**Coercion** is the process of converting one type to another. Coercion can be done *implicitly* or *explicitly*.
For example:

```cpp
float x=5; //note that 5 is an integer and x is a float. This is an example of implicit coercion.
int x = (int)5.34; //This is called typecasting which is explicit coercion.
```

**Monomorphism** is the concept that a name (i.e. variable, function, struct, etc.) has exactly one type. **Polymorphism**, however, is the concept that a name can have multiple types. It allows us to explicitly provide many values or implementations of the same concept. There are two common forms of polymorphism seen in programming: Ad Hoc Polymorphism and Parametric Polymorphism (note that there are more than just those two, but these are the most common).

**Ad Hoc Polymorphism:**
Ad Hoc Polymorphism allows us to assign a new operation on a specific type to an existing operator or method. This is done by operator or method overloading. In C++, methods defined with the "virtual" keyword are methods that can be overloaded.
Here is an example of operator overloading in C++:

```cpp
#include<iostream>
#include<sstream>
#include<string>
using namespace std;
struct Pair
{
  Pair(int l, int r) : left(l), right(r) {}
  Pair operator+(Pair &p);
  string show()
  {
    ostringstream os;
    os<<"left: "<<left<<endl;
    os<<"right: "<<right<<endl;
    return os.str();
  }
  private:
    int left;
    int right;
};
//The following is an example of the plus operator overloaded.
//now you can add two Pair objects with +
Pair Pair::operator+ (Pair &p)
{
  return Pair(left+p.left, right+p.right);
}
```

Programs with parent classes and children that inherit their traits utilize method overloading. This occurs when a program has one main class with virtual methods, and one or more subclasses that extend the definition of those virtual methods.

**Parametric Polymorphism:**
Essentially, this allows for us to have the type of a variable passed into a method as a parameter. This is often known as Generic Programming which is a style of programming in which the types associated with data are specified by the program when necessary. This can be done using templates in C++.
Here is an example of a template in C++:

Following is a sample of functions that all have exactly the same body. The only difference is the type of data in the vector.

```cpp
void display_message (const string &, const vector<int>& ) ;
void display_message (const string &, const vector<double>& ) ;
void display_message (const string &, const vector<string>& ) ;
```

This is tedious, so instead we can create a template:

```cpp
template <typename elemType>
void display_message (const string &msg, const vector<elemType> &vec)
{
  cout << msg ;
  for ( int i = 0; i < vec.size(); ++i )
  {  cout << vec[i] << ' ' ;  }
}
```

Note: you want to put the template declaration in the .h file. In the above code, elemType is the name of the variable representing a type.

This subject of types, type systems, and programming styles can go on and on. This article only touches the tip of the iceberg, but it provides an explanation for the basic details. Understanding types and how the compiler handles them can help very much to improve your programming skills and efficiency. Once you've reached a basic understanding of types you can easily expand upon it. Simply search for any of the material mentioned above and you'll find hundreds of insightful sources.
