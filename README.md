# ExtendedCPP
ExtendedCPP is a c++ parser using parser-toolkit. It allows to extend c++ language features by transpiling.

# Motivation
Compared to newer languages c++ is sometimes behind in terms of feature sets. To no offense this is for good reason.
Creating language features needs to be tested and planned carefully, ExtendedCPP let's you do this.


**Why wouldn't you just extend clang since it also provides some experimental features (modules for instance)?**
Clang is a com*piler* while extended-cpp is a *trans*piler. extended-cpp only transforms code to standardized c++ code 
without the need to modify llvm/assembly. Besides that extended-cpp allows quick prototyping and is easy to use.

# Introduction
ExtendedCPP is designed to allow modern features in c++ before it is actually part of the standard.

# Feature List
Note that extended-cpp equips a fully powered c++ parser which can be used to parse c++ without any transpiling.

## Done

## Partly done / WIP
- Modules
  + DONE: Headerless c++
  + DONE: Exporting and importing classes/struct/enum
  + DONE: Exporting and importing defines/typedefs
  + TODO: Exporting global functions and variables

## ToDo
- Constraints and concepts
- Ranges
- Reflection
- Async / Await (Coroutines)
