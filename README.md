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
It's using parser-toolkit as a backend for parsing and analyzing, this means syntax and grammar can also
be applied to your custom language/syntax created with parser-toolkit to allow for example inline c++ blocks. (with or without extensions)

To get an overview of all features and their wip state, see the specification/ folder.

## Feature namespacing
- `base`: Basic language features that are required to parse normal c++11.
- `std`: Stable additional features that are considered the standard of extended c++. It should be always safe to use all.
- `extra`: Stable additional features that don't fit the standard yet due to issues with other features for example.
- `dev`: In development features that are not considered stable / ready yet. Syntax changes might still happen here.

## Feature versioning
All features expect the features in the `base` namespace are versioned. The version of the features MUST be always added to the feature list. When a feature moves one namespace up the version is reset to `v1`. Only major versions are tracked in the feature list. Only changes that might break existing usage.

# Usage
```js
// build_script.js
// -----------------

// Transpiling
// ---------------------
const ExtendedCpp = require('extended-cpp');

const cpp = new ExtendedCpp([
  // feature list
  ...ExtendedCpp.base.all,
  ExtendedCpp.std.modules.v1,
  ExtendedCpp.extra.tuples.v1,
  ...
]);

cpp.addSource('my_module_a.cpp');
cpp.addSource('my_module_b.cpp');
cpp.transpile('temp/');

// Compiling
// ------------------
cpp.compile();
// Note: compile() will use ${CXX} environment variable as a compiler

```
