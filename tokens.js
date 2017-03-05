module.exports = (plugin) => {
    const exp = {};

    // Names
    exp.IDENT = plugin.createToken({
        name: 'identifier',
        expression: /^[a-zA-Z_]+[a-zA-Z_0-9]*$/,
    }).get();

    // Numbers
    exp.INT = plugin.createToken({
        name: 'int',
        expression: /^(0|([1-9]+[0-9]*))$/,
        transform() {
            return parseInt(this.value);
        },
    }).get();
    exp.FLOAT = plugin.createToken({
        name: 'float',
        expression: /^[0-9]+\.[0-9]+f$/,
        transform() {
            return parseFloat(this.value.substring(0, this.value.length - 2));
        },
    }).get();

    // Strings and Chars
    exp.CHR = plugin.createToken({
        name: 'char',
        expression: /^\'.\'$/,
        transform() {
            return this.value.substring(1, 2);
        },
    }).get();
    exp.STR = plugin.createToken({
        name: 'string',
        expression: /^\".*\"$/,
        transform() {
            return this.value.substring(1, this.value.length - 2);
        },
    }).get();

    // Special keywords
    exp.CLASS = plugin.createToken({
        name: 'class',
        expression: 'class',
    }).get();
    exp.STRUCT = plugin.createToken({
        name: 'struct',
        expression: 'struct',
    }).get();
    exp.DEFINE = plugin.createToken({
        name: 'define',
        expression: 'DEFINE',
    }).get();
    exp.IFNDEF = plugin.createToken({
        name: 'ifndef',
        expression: 'IFNDEF',
    }).get();
    exp.IFDEF = plugin.createToken({
        name: 'ifdef',
        expression: 'IFDEF',
    }).get();
    exp.ENDIF = plugin.createToken({
        name: 'endif',
        expression: 'ENDIF',
    }).get();

    // Flow tokens
    exp.BO = plugin.createToken({
        name: 'block_open',
        expression: '{',
    }).get();
    exp.BC = plugin.createToken({
        name: 'block_close',
        expression: '}',
    }).get();
    exp.PO = plugin.createToken({
        name: 'para_open',
        expression: '(',
    }).get();
    exp.PC = plugin.createToken({
        name: 'para_close',
        expression: ')',
    }).get();
    exp.INHERITS = plugin.createToken({
        name: 'inherits',
        expression: ':',
    }).get();
    exp.COMMA = plugin.createToken({
        name: 'comma',
        expression: ',',
    }).get();
    exp.NSS = plugin.createToken({
        name: 'namespace_seperator',
        expression: '::',
    }).get();
    exp.SEMICOLON = plugin.createToken({
        name: 'semicolon',
        expression: ';',
    });


    // Expressions
    exp.STAR = plugin.createToken({
        name: 'star',
        expression: '*',
    }).get();
    exp.ASSIGN = plugin.createToken({
        name: 'assign',
        expression: '=',
    }).get();
    exp.REF = plugin.createToken({
        name: 'ref',
        expression: '&',
    }).get();
    exp.DOT = plugin.createToken({
        name: 'dot',
        expression: '.',
    }).get();
    exp.ARROW = plugin.createToken({
        name: 'arrow',
        expression: '->',
    }).get();

    // Bitwise operators
    exp.LEFTSHIFT = plugin.createToken({
        name: 'left_shift',
        expression: '<',
    }).get();
    exp.RIGHTSHIFT = plugin.createToken({
        name: 'right_shift',
        expression: '>',
    }).get();
    

    // Stream operators
    exp.LEFTSTREAM = plugin.createToken({
        name: 'left_stream',
        expression: '<<',
    }).get();
    exp.RIGHTSTREAM = plugin.createToken({
        name: 'right_stream',
        expression: '>>',
    }).get();

    // Boolean operators
    exp.NOT = plugin.createToken({
        name: 'not',
        expression: '!',
    }).get();
    exp.EQUALS = plugin.createToken({
        name: 'equals',
        expression: '==',
    }).get();
    exp.NEQUALS = plugin.createToken({
        name: 'nequals',
        expression: '!=',
    }).get();
    exp.GT = plugin.createToken({
        name: 'GT',
        expression: '>',
    }).get();
    exp.GTE = plugin.createToken({
        name: 'GTE',
        expression: '>=',
    }).get();
    exp.LT = plugin.createToken({
        name: 'LT',
        expression: '<',
    }).get();
    exp.LTE = plugin.createToken({
        name: 'LTE',
        expression: '<=',
    }).get();

    // Arithmetic operators
    exp.PLUS = plugin.createToken({
        name: 'PLUS',
        expression: '+',
    }).get();
    exp.MINUS = plugin.createToken({
        name: 'MINUS',
        expression: '-',
    }).get();
    exp.DIV = plugin.createToken({
        name: 'DIV',
        expression: '/',
    }).get();
    exp.MUL = plugin.createToken({
        name: 'MUL',
        expression: '*', // redeclaration of star, parserToolkit will merge it together
    }).get();            // redeclared for better readability, but be aware!

    return exp;
};

