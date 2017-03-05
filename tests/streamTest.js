import ExtendedCpp from '../src/index';
import ParserToolkit from 'parser-toolkit';

import chai from 'chai';
const assert = chai.assert;

suite('Stream Test Suite', () => {
    const toolkit = new ParserToolkit();
    //toolkit.on('logDebug', msg => console.log(msg));
    ExtendedCpp(toolkit);

    test('should parse left streams', () => {
        const test = `
            int main() {
              std::string name;
              std::cout << "What is your name? ";
              getline (std::cin, name);
              std::cout << "Hello, " << name << "!\\n";
            }
        `;
        const result = toolkit.parse(test);
        console.log(JSON.stringify(result[0].parse(), null, '\t'));
        //console.log(result[0].parse());
    });
});
