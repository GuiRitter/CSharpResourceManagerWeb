import { areArraysEqual } from '../../../util/data';

test('both falsy, are the same', () => {
	expect(areArraysEqual(null, undefined)).toStrictEqual(true);
});

test('first falsy, are different', () => {
	expect(areArraysEqual(null, [])).toStrictEqual(false);
});

test('second falsy, are different', () => {
	expect(areArraysEqual([], undefined)).toStrictEqual(false);
});

test('different lengths, are different', () => {
	expect(areArraysEqual(['a', 'b'], ['a', 'b', 'c'])).toStrictEqual(false);
});

test('are different, are different', () => {
	expect(areArraysEqual(['a', 'b'], ['a', 'c'])).toStrictEqual(false);
});

test('are same in different order, are same', () => {
	expect(areArraysEqual(['a', 'b'], ['b', 'a'])).toStrictEqual(true);
});
