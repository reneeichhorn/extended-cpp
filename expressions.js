module.exports = (plugin, t) => {
    const output = [];
    const o = output; // shortcut

    // expression storage to recognize an expression
    const expressions = [];
    const statements = [];

    // helper functions
    const create = (options) => {
        if (options.type == 'exp') {
            expressions.push(options.name);
        } else if (options.type == 'stmt') {
            statements.push(options.name);
        } else if (options.type == 'both') {
            expressions.push(options.name);
            statements.push(options.name);
        }

        plugin.createGrammar(options);
    });

    // holders
    output.EXPR = plugin.createHolder({
        name: 'expression_holder',
        filter(f) {
            return expressions.indexOf(f.type) !== -1;
        }
    }).get();

    output.STMTS = plugin.createHolder({
        name: 'statement_holder',
        filter(f) {
            return statements.indexOf(f.type) !== -1;
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
    plugin.create

    create({
        type: 'both',
        name: 'call',
        grammar: `${o.EXPR} ${t.PO} #_ _# ${t.PO}`,
    });

};
