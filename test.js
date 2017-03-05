const ParserToolkit = require('../../../../parser_toolkit/src/lib');
const createCppPlugin = require('./index');

const parserToolkit = new ParserToolkit();

console.log('init cpp plugin..');
const cppRoot = createCppPlugin(parserToolkit).ROOTH;

console.log('parsing test..');
const test = `
    int main() {
      std::string name;
      std::cout << "What is your name? ";
      getline (std::cin, name);
      std::cout << "Hello, " << name << "!\\n";
    }
`;

const rootPlugin = parserToolkit.createPlugin({
    name: 'root',
});

rootPlugin.createGrammar({
    name: 'root',
    grammar: `${cppRoot}`,
    parsed(tokens, children) {
        return children[0];
    },
});

console.log('tree', parserToolkit.parse(test));
