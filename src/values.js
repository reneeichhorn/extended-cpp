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
};
