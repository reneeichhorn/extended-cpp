module.exports = (plugin, t) => {
    const output = [];
    const o = output; // shortcut

    // expression storage to recognize an expression
    const expressions = [];
    const statements = [];

    // helper functions
    const create = (options) => {
        options.root = false;

        // store in relevant registries
        if (options.type == 'exp') {
            expressions.push(options.name);
        } else if (options.type == 'stmt') {
            statements.push(options.name);
        } else if (options.type == 'both') {
            expressions.push(options.name);
            statements.push(options.name);
        }

        // add default parsed function that simply stores it
        // child(ren) expression(s)
        if (typeof options.parsed === 'undefined') {
            options.parsed = (tokens, children) => {
                if (children.length == 2) {
                    return {
                        type: options.name,
                        left: children[0][0],
                        right: children[1][0],
                    };
                } else {
                    return {
                        type: options.name,
                        expr: childrn[0][0],
                    };
                }
            };
        }

        // create actual grammar rule in parser-toolkit
        plugin.createGrammar(options);
    });

    // holders
    output.EXPR = plugin.createHolder({
        name: 'expression_holder',
        filter(f) {
            return expressions.indexOf(f.type) !== -1;
        }
    }).get();

    const STMT = plugin.createHolder({
        name: 'statement_holder',
        filter(f) {
            return statements.indexOf(f.type) !== -1;
        }
    }).get();

    output.STMT = plugin.createGrammar({
        name: 'statement',
        grammar: `${STMT} ${t.SEMICOLON}`
    });

    output.STMTS = plugin.createHolder({
        name: 'pub_statement_holder',
        filter(f) {
            return f.type === 'statement';
        }
    }).get();

    // group expressions
    create({
        type: 'exp',
        name: 'grouped_exp',
        grammar: `${t.PO} ${o.EXPR} ${t.PC}`,
    });

    // boolean expressions
    create({
        type: 'exp',
        name: 'not',
        grammar: `${t.NOT} ${o.EXPR}`,
    });
    create({
        type: 'exp',
        name: 'equals',
        grammar: `${o.EXPR} ${t.EQUALS} ${o.EXPR}`,
    });
    create({
        type: 'exp',
        name: 'nequals',
        grammar: `${o.EXPR} ${t.NEQUALS} ${o.EXPR}`,
    });
    create({
        type: 'exp',
        name: 'gt',
        grammar: `${o.EXPR} ${t.GT} ${o.EXPR}`,
    });
    create({
        type: 'exp',
        name: 'gte',
        grammar: `${o.EXPR} ${t.GTE} ${o.EXPR}`,
    });
    create({
        type: 'exp',
        name: 'lt',
        grammar: `${o.EXPR} ${t.LT} ${o.EXPR}`,
    });
    create({
        type: 'exp',
        name: 'lte',
        grammar: `${o.EXPR} ${t.LTE} ${o.EXPR}`,
    });

    // call operator
    const paramList = plugin.createGrammar({
        root: false,
        name: 'param_list',
        grammar: `${o.EXPR} #_${t.COMMA} -SELF-_#`,
    }).get();

    create({
        type: 'both',
        name: 'call',
        grammar: `${o.EXPR} ${t.PO} #_${paramList}_# ${t.PO}`,
    });

    return output;
};
