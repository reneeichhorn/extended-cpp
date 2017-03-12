const Workflows = require('./engine');
const workflows = new Workflows();

const generationWorkflow = workflows.createWorkflow('CodeGeneration')
    .start(['type', 'object'], function (type, object) {
        this.type = type;
        this.object = object;
    })
    .looped('AddChildren', ['child'], function (child) {
        this.recurse(child.type, child);
        this.resolve();
    })
    .single('Transpile');

module.exports = {
    CodeGeneration: generationWorkflow,
    transpile(root) {
        root.forEach(r => {
            generationWorkflow.execute(r.name, r);
        });
    },
};

