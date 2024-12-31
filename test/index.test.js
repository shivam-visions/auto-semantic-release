const greet = require('../src/index');

describe('greet function', () => {
    it('should return a greeting with the given name', () => {
        expect(greet('Developer')).toBe('Hello, Developer!');
    });
});
