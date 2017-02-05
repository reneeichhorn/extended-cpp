# Tuples

## State
:x: Assignment
:x: Destructuring
:x: Type

## Assignment
```cpp
auto tup = (5, 3);
printf("(%d, %d)", tup.0, tup.1);
```
Assigns a new variable to an tuple

## Destructuring
```cpp
auto (t1, t2) = (5, 3);
printf("(%d, %d)", t1, t2);
```
Puts content of tuple to named variables

## Type
```cpp
(int, int) foo_bar(int a) {
  return (a, a * 2);
}
...
auto tup = foo_bar(5);
printf("(%d, %d)", tup.0, tup.1);
```
Define a tuple type.
