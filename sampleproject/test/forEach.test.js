const assert = require('assert');
const { forEach } = require('../index');

let numbers;
beforeEach(() => {
    numbers = [1,2,3];
});

it('deveria somar um array', () => {
    let total = 0;

    forEach(numbers, (value) => {
        total = total + value;
    });

    assert.strictEqual(total, 6);
    numbers.push(3);
    numbers.push(3);
    numbers.push(3);
});

it('beforeEach roda todas as vezes', () => {
    assert.strictEqual(numbers.length, 3);
});