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
            let path = [tokens[0].value];

            if (children.length > 0) {
                path = path.concat(children[0].parse()[0].path);
            }

            return {
                type: 'typeref',
                path: path,
                transpile() {
                  return path.join('::');
                },
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
                varType: children.type.parse()[0],
                transpile() {
                  return `${this.varType.transpile()} ${this.name}`;
                },
            };
        }
    });

    // assignment
    e.createGrammar({
        type: 'stmt',
        name: 'assign',
        grammar: `${e.EXPR} ${t.ASSIGN} ${e.EXPR}`,
    });

    return output;
};
