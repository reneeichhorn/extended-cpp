# Modules

## State
:white_check_mark: Headerless compilation

:heavy_check_mark: Importing

:heavy_check_mark: Exporting

:x: Scoping

## Reference

### Headerless compilation
Header files are automatically generated when specifying at least one export within an cpp file
Header files are named like the source file (cpp) file.
Note that these headers should not be included manually! Please use import statement instead

### Importing
Importing allows scoped imports. For detailed scoping rules see 'Scoping' section.

```cpp
#import { foo, bar } from my::module;
```
Imports only specified symbols from a given module.
NOTE: the whole module is still needed to be compiled, this is only about making it public / private.

```cpp
#import { * } from my::module;
```
Imports every symbol from given module.


### Exporting
```cpp
#module my::module
```
This will specify the module name and namespace for the **whole file**!
It's mandatory to have this statement before any export statement

```cpp
export class Something { ... };
export enum Foo { ... };
export struct Bar { ... };
```
Marks the following class/enum/struct as public and will allow importing it from other modules.
Nested types are also exported if owner/parent is exported!


```cpp
#export ABC 123 
```
Creates a new define / macro for c++ and will also mark it as public.

```cpp
export typedef unsigned int uint32
```
Creates a new type alias / type definition and also exports it


### Scoping
Scoping is not yet implemented fully. More informations soon_tm.
**Why is this needed?** Look at the following code:
```cpp
// modulea.cpp
#import { x } from my::moduleC;
#import { foo, bar } from my::moduleB;
...

// moduleb.cpp
// moduleb scope is now already polluted with x as importing is not limiting it's scope.
```
Of course you are not supposed to abuse this but in the worst case you get redeclaration errors..

**How could this be archieved?**
A simple fix would be to only allow imports in the beginning of the file and actually renaming all imported symbols with some prefix '_prefix_do_not_use_...' and create a define after all imports that allows the original naming.
Simple and cheasy..
