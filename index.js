
module.exports = (parserToolkit) => {
    const plugin = parserToolkit.createPlugin({
        name: 'cpp',
    });

    const tokens = require('./tokens')(plugin);
    const expression = require('./expressions')(plugin, tokens);
    const types = require('./types')(tokens, expression);
    const root = require('./program')(plugin);
    const functions = require('./function')(plugin, tokens, expression, types, root);

    return root;
};

