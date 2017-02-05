
module.exports = (parserToolkit) => {
    const plugin = parserToolkit.createPlugin({
        name: 'cpp',
    });

    const tokens = require('./tokens')(plugin);
    require('./expressions')(plugin, t);
};

