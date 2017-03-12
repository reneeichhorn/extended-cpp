class Workflows {
    constructor() {
        this.workflows = {};
    }

    createWorkflow(workflowName) {
        const self = this;

        this.workflows[workflowName] = {
            name: workflowName,
            start: {},
            flow: [],
            extensions: [],
        };

        const wf = {
            start(params, cb) {
                self.workflows[workflowName].start = {
                    params,
                    cb,
                };
                return wf;
            },
            single(name, params, cb) {
                self.workflows[workflowName].flow.push({
                    name,
                    params,
                    cb,
                    type: 'single',
                });
                return wf;
            },

            looped(name, params, cb) {
                self.workflows[workflowName].flow.push({
                    name,
                    params,
                    cb,
                    type: 'looped',
                });
                return wf;
            },

            extend(ext) {
                self.workflows[workflowName].extensions.push(ext);
                return wf;
            },

            execute() {
                const scopedThis = {
                    resolved: false,
                    resolve() {
                        this.resolved = true;
                    }
                };

                self.workflows[workflowName].start.cb.apply(scopedThis, arguments);
                self.workflows[workflowName].extensions.filter(f => f.filter(arguments)).forEach(ext => {
                    if (typeof ext.start !== 'undefined' ) {
                        ext.start.apply(scopedThis, arguments);
                    }
                });

                if (!scopedThis.resolved) {
                    console.error('Step 1: Starting up process failed.. Start was not resolved.');
                    console.error(arguments);
                }
            },
        };

        return wf;
    }
}

module.exports = Workflows;

