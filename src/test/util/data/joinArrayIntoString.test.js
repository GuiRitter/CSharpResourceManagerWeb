import { joinArrayIntoString } from '../../../util/data';

test('empty list', () => {
	expect(joinArrayIntoString([])).toStrictEqual('');
});

test('one item', () => {
	expect(joinArrayIntoString(['a'])).toStrictEqual('a');
});

test('two items', () => {
	expect(joinArrayIntoString(['a', 'b'])).toStrictEqual('a & b');
});

test('three items', () => {
	expect(joinArrayIntoString(['a', 'b', 'c'])).toStrictEqual('a, b & c');
});

test('more items', () => {
	expect(joinArrayIntoString(['a', 'b', 'c', 'd'])).toStrictEqual('a, b, c & d');
});
