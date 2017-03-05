'use strict';

module.exports = (plugin, tokens, expression, types, root) => {
    const t = tokens;
    const e = expression;

    // call operator
    const paramList = plugin.createGrammar({
        root: false,
        name: 'param_list',
        grammar: `${e.EXPR} #_${t.COMMA} -SELF-_#`,
    }).get();

    expression.createGrammar({
        type: 'both',
        name: 'call',
        grammar: `${e.EXPR} ${t.PO} #_${paramList}_# ${t.PO}`,
    });

    // function declaration
    const paramDeclList = plugin.createGrammar({
        root: false,
        name: 'param_decl_list',
        grammar: `${types.TYPEREF} ${t.IDENT}:name`,
        parsed(tokens, children) {
            const params = [];
            params.push({
                name: tokens.name.value,
                type: children[0],
            });

            if (children.length > 1) {
                params.join(children[1].compile().params);
            }

            return {
                params: params,
            };
        },
    }).get();

    plugin.createGrammar({
        root: false,
        name: 'function_decl',
        
        grammar: `${types.TYPEREF} ${t.IDENT}:name ${t.PO} #_${paramDeclList}_# ${t.PC}
                  ${t.BO}
                    #_${e.STMTS}_#
                  ${t.BC}`,

        parsed(tokens, children) {
            // has params / has codeblocks
            const hasParameters = 
                (children.length == 3) ||
                (children.length == 2 && children[1].type === 'param_decl_list');

            const hasCodeblock = 
                (children.length == 3) ||
                (children.length == 2 && children[1].type === 'statement_holder');

            // find out position for codeblock
            // TODO: implement named children!
            let codeBlockPos = 0;
            if (hasParameters) {
                codeBlockPos = 2;
            } else {
                codeBlockPos = 1;
            }

            // return function declaration
            return {
                name: tokens.name.value,
                type: 'function_decl',
                returnType: children[0].compile,
                parameters: hasParameters ? children[1].parse().params : [],
                inner: hasCodeblock ? children[codeBlockPos].parse().params : {},
            }
        }
    });
    root.registerForProgramScope('function_decl');
};
