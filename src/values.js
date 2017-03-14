'use strict';

module.exports = (tokens, expressions) => {
    const t = tokens;
    const e = expressions;

    e.createGrammar({
        type: 'exp',
        name: 'string_expr',
        grammar: `${t.STR}:str`,
        parsed: (tokens, children) => {
            return {
                type: 'string_expr',
                name: tokens.str.value,
                transpile() {
                    return `${this.name}`;
                },
            };
        }
    });

    e.createGrammar({
        type: 'exp',
        name: 'int_expr',
        grammar: `${t.INT}:int`,
        parsed: (tokens, children) => {
            return {
                type: 'int_expr',
                value: tokens.int.value,
                transpile() {
                    return `${this.value}`;
                },
            };
        }
    });
};
