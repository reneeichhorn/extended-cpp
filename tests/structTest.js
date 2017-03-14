import ExtendedCpp from '../src/index';
import ParserToolkit from 'parser-toolkit';

import chai from 'chai';
const assert = chai.assert;

function removeProps(obj,keys){
    if(obj instanceof Array){
        obj.forEach(function(item){
            removeProps(item,keys)
        });
    }
    else if(typeof obj === 'object'){
        Object.getOwnPropertyNames(obj).forEach(function(key){
            if(keys.indexOf(key) !== -1)delete obj[key];
            else removeProps(obj[key],keys);
        });
    }
}

suite('Struct Test Suite', () => {
    const toolkit = new ParserToolkit();
    //toolkit.on('logDebug', msg => console.log(msg));
    //ExtendedCpp(toolkit);

    const testProgram = `
        struct Foo {
            int foo;
            int bar;
        };

        int main() {
            Foo obj;
            foo.foo = 123;
            foo.bar = 456;
        }
    `;

    test('should transpile struct', () => {
        const result = toolkit.parse(testProgram);
        const parsed = result[0].parse();

        const code = parsed
            .map(p => p.transpile())
            .join('')
            .replace(/\s/gm, '');

        const expected = testProgram
            .replace(/\s/gm, '');

        assert.equal(code, expected);
    });

    test('should parse struct', () => {
        const result = toolkit.parse(testProgram);
        const actual = result[0].parse();
        removeProps(actual, ['transpile']);

        const expected = [
            {
                "name": "Foo",
                "type": "struct_decl",
                "items": [
                    {
                        "name": "foo",
                        "type": {
                            "type": "typeref",
                            "path": [
                                "int"
                            ]
                        }
                    },
                    {
                        "name": "bar",
                        "type": {
                            "type": "typeref",
                            "path": [
                                "int"
                            ]
                        }
                    }
                ]
            },
            {
                "name": "main",
                "type": "function_decl",
                "returnType": {
                    "type": "typeref",
                    "path": [
                        "int"
                    ]
                },
                "parameters": [],
                "inner": [
                    {
                        "type": "variable_decl",
                        "name": "obj",
                        "varType": {
                            "type": "typeref",
                            "path": [
                                "Foo"
                            ]
                        }
                    },
                    {
                        "type": "assign",
                        "left": {
                            "type": "struct_item_expr",
                            "expr": {
                                "type": "typeref",
                                "path": [
                                    "foo"
                                ]
                            },
                            "chain": [
                                "foo"
                            ]
                        },
                        "right": {
                            "type": "int_expr",
                            "value": "123"
                        }
                    },
                    {
                        "type": "assign",
                        "left": {
                            "type": "struct_item_expr",
                            "expr": {
                                "type": "typeref",
                                "path": [
                                    "foo"
                                ]
                            },
                            "chain": [
                                "bar"
                            ]
                        },
                        "right": {
                            "type": "int_expr",
                            "value": "456"
                        }
                    }
                ]
            }
        ];
        assert.deepEqual(expected, actual);
    });
});
