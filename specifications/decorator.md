# Decorators

## State

❌ Classes

❌ Functions

❌ Variables

## Reference

### Class Decorators
```c++

// Decorator that counts all function calls
decorator call_counter(TargetClass) class {
  // Extending structure
  TargetClass->add_decl |> {
    private:
      unsigned int calls;
      
    public:
      unsigned int getCalls() {
        return calls;
      }
  };
  
  // Selectors
  auto all_functions = TargetClass[?(...params)];
  for (func in all_functions) {
    function.overwrite_decl |> {
      super();
      this->calls++;
    }
  }
}

// The target class
@call_counter
class Foo {
  public:
    int give_10() { return 10; }
};

```
