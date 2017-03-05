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
                        left: children[0].parse()[0],
                        right: children[1].parse()[0],
                    };
                } else {
                    return {
                        type: options.name,
                        expr: childrn[0].parse()[0],
                    };
                }
            };
        }

        // create actual grammar rule in parser-toolkit
        return plugin.createGrammar(options).get();
    };
    output.createGrammar = create;

    // holders
    output.EXPR = plugin.createHolder({
        name: 'expression_holder',
        filter(f) {
            let state = false;

            expressions.forEach(stmt => {
                if (f.name.indexOf(stmt) !== -1) {
                    state = true;
                }
            });

            return state;
        },
        maxElements: 1,
    }).get();

    const STMT = plugin.createHolder({
        name: 'statement_holder',
        filter(f) {
            let state = false;

            statements.forEach(stmt => {
                if (f.name.indexOf(stmt) !== -1) {
                    state = true;
                }
            });

            return state;
        },
        maxElements: 1,
    }).get();

    output.STMT = plugin.createGrammar({
        root: false,
        name: 'statement',
        grammar: `${STMT} ${t.SEMICOLON}`,
        parsed(tokens, children) {
            return children[0].parse()[0];
        },
    });

    output.STMTS = plugin.createHolder({
        name: 'pub_statement_holder',
        filter(f) {
            return f.name === 'statement';
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

    // stream exoression/statement
    create({
        type: 'both',
        name: 'stream_left',
        grammar: `${o.EXPR} ${t.LEFTSTREAM} ${o.EXPR}`,
    });
    create({
        type: 'both',
        name: 'stream_right',
        grammar: `${o.EXPR} ${t.RIGHTSTREAM} ${o.EXPR}`,
    });

    return output;
};
