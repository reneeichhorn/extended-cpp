'use strict';

module.exports = (plugin) => {
    const output = {};
    const registry = [];
    const o = output;

    output.registerForProgramScope = (name) => {
        registry.push(name);
    };

    output.ROOTH = plugin.createHolder({
        name: 'cpp_root_holder',
        filter(t) {
            let b = false;
            registry.forEach(r => {
                if (t.name.indexOf(r) === 0) {
                    b = true;
                }
            });
            return b;
        },
    }).get();

    return output;
};
