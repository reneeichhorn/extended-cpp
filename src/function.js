'use strict';

module.exports = (plugin, tokens, expression, types, root) => {
    const t = tokens;
    const e = expression;

    // call operator
    const paramList = plugin.createGrammar({
        root: false,
        name: 'param_list',
        grammar: `${e.EXPR}:expr #_${t.COMMA} -SELF-_#`,
        parsed(tokens, children) {
            let params = [];
            params.push({
                expr: children.expr.parse()[0],
            });

            if (children.length > 1) {
                params = params.concat(children[1].parse()[0].params);
            }

            return {
                params: params,
            };
        },
    }).get();

    expression.createGrammar({
        type: 'both',
        name: 'call',
        grammar: `${e.EXPR}:expr ${t.PO} #_${paramList}:params_# ${t.PC}`,
        parsed(tokens, children) {
            return {
                name: 'call',
                callee: children.expr.parse()[0],
                params: typeof children.params !== 'undefined' ? children.params.parse()[0].params : [],
                transpile() {
                  return `${this.callee.transpile()}(
                                ${this.params.map(p => p.expr.transpile()).join(',')}
                          )`;
                },
            };
        },

    });

    // function declaration
    const paramDeclList = plugin.createGrammar({
        root: false,
        name: 'param_decl_list',
        grammar: `${types.TYPEREF} ${t.IDENT}:name #_${t.COMMA} -SELF-_#`,
        parsed(tokens, children) {
            const params = [];
            params.push({
                name: tokens.name.value,
                type: children[0],
            });

            if (children.length > 1) {
                params.join(children[1].parse().params);
            }

            return {
                params: params,
            };
        },
    }).get();

    plugin.createGrammar({
        root: false,
        name: 'function_decl',
        
        grammar: `${types.TYPEREF}:returns ${t.IDENT}:fnname ${t.PO} #_${paramDeclList}:params_# ${t.PC}
                  ${t.BO}
                    #_${e.STMTS}:inner_#
                  ${t.BC}`,

        parsed(tokens, children) {
            return {
                name: tokens.fnname.value,
                type: 'function_decl',
                returnType: children.returns.parse()[0],
                parameters: children.params ? children.params.parse().params : [],
                inner: children.inner ? children.inner.parse() : {},
                transpile() {
                    return `
                        ${this.returnType.transpile()} ${this.name}(
                            ${this.parameters.map(p => `${p.type.transpile()} ${p.name}`).join(',')}
                         ) {
                            ${this.inner.map(c => c.transpile()).join(';\n\t\t')};
                        }
                    `;
                },
            }
        },
    });
    root.registerForProgramScope('function_decl');
};
