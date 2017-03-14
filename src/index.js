
module.exports = (parserToolkit) => {
    // create cpp plugin
    const plugin = parserToolkit.createPlugin({
        name: 'cpp',
    });

    const tokens = require('./tokens')(plugin);
    const expression = require('./expressions')(plugin, tokens);
    const types = require('./types')(tokens, expression);
    const values = require('./values')(tokens, expression);
    const root = require('./program')(plugin);
    const functions = require('./function')(plugin, tokens, expression, types, root);
    const struct = require('./struct')(plugin, tokens, expression, types, root);

    // create cpp root
    const rootPlugin = parserToolkit.createPlugin({
        name: 'root',
    });

    rootPlugin.createGrammar({
        name: 'root',
        grammar: `${root.ROOTH}`,
        parsed(tokens, children) {
            return children[0];
        },
    });
};

