'use strict';

module.exports = (plugin, tokens, expression, types, root) => {
    const t = tokens;
    const e = expression;

    plugin.createGrammar({
        root: false,
        name: 'struct_item',
        grammar: `${types.TYPEREF}:itemType ${t.IDENT}:itemName ${t.SEMICOLON}`,
        parsed(tokens, children) {
            return {
                name: tokens.itemName.value,
                type: children.itemType.parse()[0],
                transpile() {
                    return `${this.type.transpile()} ${this.name};`;
                },
            };
        },
    });

    const ITEMS = plugin.createHolder({
        name: 'struct_item_holder',
        filter: t => t.name === 'struct_item'
    }).get();

    plugin.createGrammar({
        root: false,
        name: 'struct_decl',

        grammar: `${t.STRUCT} ${t.IDENT}:structName ${t.BO}
                      ${ITEMS}:structItems
                  ${t.BC} ${t.SEMICOLON}`,

        parsed(tokens, children) {
            return {
                name: tokens.structName.value,
                type: 'struct_decl',
                items: children.structItems.parse(),
                transpile() {
                    return `
                        struct ${this.name} {
                            ${this.items.map(i => i.transpile()).join('\n\t\t')}
                        };
                    `;
                },
            }
        },
    });
    root.registerForProgramScope('struct_decl');

    const CHAIN = plugin.createGrammar({
        root: false,
        name: 'chain_expr',

        grammar: `${t.IDENT} #_ ${t.DOT} -SELF- _#`,

        parsed(tokens, children) {
            let chain = [];
            if (children.length > 0) {
                chain = chain.concat(children[0].parse());
            }
            chain.push(tokens[0].value);
            return chain;
        },
    }).get();

    expression.createGrammar({
        type: 'exp',
        name: 'struct_item_expr',
        grammar: `${e.EXPR}:itemExpr ${t.DOT} ${CHAIN}:itemChain`,
        parsed(tokens, children) {
            return {
                type: 'struct_item_expr',
                expr: children.itemExpr.parse()[0],
                chain: children.itemChain.parse()[0],
                transpile() {
                    return `${this.expr.transpile()}.${this.chain.join('.')}`;
                },
            };
        }
    });
};
