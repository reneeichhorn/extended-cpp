import ExtendedCpp from '../src/index';
import ParserToolkit from 'parser-toolkit';

import chai from 'chai';
const assert = chai.assert;

suite('Stream Test Suite', () => {
    const toolkit = new ParserToolkit();
    //toolkit.on('logDebug', msg => console.log(msg));
    ExtendedCpp(toolkit);

    test('should parse left streams', () => {
        const test = `
            int main() {
              std::string name;
              std::cout << "What is your name? ";
              getline (std::cin, name);
              std::cout << "Hello, " << name << "!\\n";
            }
        `;
        const result = toolkit.parse(test);
        const actual = result[0].parse();

        const expected = [
            {
                "name": "name",
                "type": "function_decl",
                "returnType": [
                    {
                        "type": "typeref",
                        "path": [
                            "int"
                        ]
                    }
                ],
                "parameters": [],
                "inner": [
                    {
                        "type": "variable_decl",
                        "name": "name",
                        "varType": [
                            {
                                "type": "typeref",
                                "path": [
                                    "std",
                                    "string",
                                ]
                            }
                        ]
                    },
                    {
                        "type": "stream_left",
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
                        "type": "stream_left",
                        "left": {
                            "type": "typeref",
                            "path": [
                                "std",
                                "cout",
                            ]
                        },
                        "right": {
                            "type": "stream_left",
                            "left": {
                                "type": "string_expr",
                                "name": "\"Hello, \""
                            },
                            "right": {
                                "type": "stream_left",
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
