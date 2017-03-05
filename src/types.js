'use strict';

module.exports = (tokens, expressions) => {
    const t = tokens;
    const e = expressions;

    const output = {};
    const o = output;

    // references a type with given namespace
    output.TYPEREF = e.createGrammar({
        type: 'exp',
        name: 'typeref',
        grammar: `${t.IDENT}:name #_${t.NSS} -SELF-_#`,
        parsed: (tokens, children) => {
            let path = [tokens.name.value];

            if (children.length > 0) {
                path = path.concat(children[0].parse().path);
            }

            return {
                type: 'typeref',
                path: path,
            };
        },
    });

    // variable declaration with optional assignment
    e.createGrammar({
        type: 'stmt',
        name: 'variable_decl',
        grammar: `${o.TYPEREF}:type ${t.IDENT}:name #_${t.ASSIGN} ${e.EXPR}_#`,
        parsed: (tokens, children) => {
            return {
                type: 'variable_decl',
                name: tokens.name.value,
                varType: children.type.parse(),
            };
        }
    });

    // assignment
    e.createGrammar({
        type: 'stmt',
        name: 'variable_assign',
        grammar: `${e.EXPR} ${t.ASSIGN} ${e.EXPR}`,
    });

    return output;
};
