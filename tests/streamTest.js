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

suite('Stream Test Suite', () => {
    const toolkit = new ParserToolkit();
    //toolkit.on('logDebug', msg => console.log(msg));
    ExtendedCpp(toolkit);

    const testProgram = `
        int main() {
          std::string name;
          std::cout << "What is your name? ";
          getline (std::cin, name);
          std::cout << "Hello, " << name << "!\\n";
        }
    `;

    test('should transpile left streams', () => {
        const result = toolkit.parse(testProgram);
        const parsed = result[0].parse()[0];

        const code = parsed.transpile()
            .replace(/\s/gm, '');

        const expected = testProgram
            .replace(/\s/gm, '');

        assert.equal(code, expected);
    });

    test('should parse left streams', () => {
        const result = toolkit.parse(testProgram);
        const actual = result[0].parse();
        removeProps(actual, ['transpile']);

        const expected = [
            {
                "name": "main",
                "type": "function_decl",
                "returnType":
                {
                    "type": "typeref",
                    "path": [
                        "int"
                    ]
                },
                "parameters": [],
                "inner": [
                    {
                        "type": "variable_decl",
                        "name": "name",
                        "varType": {
                            "type": "typeref",
                            "path": [
                                "std",
                                "string",
                            ]
                        },
                    },
                    {
                        "type": "left_stream",
                        "left": {
                            "type": "typeref",
                            "path": [
                                "std",
                                "cout",
                            ]
                        },
                        "right": {
                            "type": "string_expr",
                            "name": "\"What is your name? \""
                        }
                    },
                    {
                        "name": "call",
                        "callee": {
                            "type": "typeref",
                            "path": [
                                "getline"
                            ]
                        },
                        "params": [
                            {
                                "expr": {
                                    "type": "typeref",
                                    "path": [
                                        "std",
                                        "cin",
                                    ]
                                }
                            },
                            {
                                "expr": {
                                    "type": "typeref",
                                    "path": [
                                        "name",
                                    ],
                                }
                            }
                        ]
                    },
                    {
                        "type": "left_stream",
                        "left": {
                            "type": "typeref",
                            "path": [
                                "std",
                                "cout",
                            ]
                        },
                        "right": {
                            "type": "left_stream",
                            "left": {
                                "type": "string_expr",
                                "name": "\"Hello, \""
                            },
                            "right": {
                                "type": "left_stream",
                                "left": {
                                    "type": "typeref",
                                    "path": [
                                        "name"
                                    ]
                                },
                                "right": {
                                    "type": "string_expr",
                                    "name": "\"!\\n\""
                                }
                            }
                        }
                    }
                ]
            }
        ];

        assert.deepEqual(expected, actual);
    });
});
