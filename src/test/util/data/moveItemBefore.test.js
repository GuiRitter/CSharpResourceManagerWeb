import { moveItemBefore } from '../../../util/data';

test('null -> not throw', () => {
	expect(() => moveItemBefore(null)).not.toThrow();
});

test('undefined -> not throw', () => {
	expect(() => moveItemBefore(undefined)).not.toThrow();
});

test('emptry string -> not throw', () => {
	expect(() => moveItemBefore('')).not.toThrow();
});

test('number -> not throw', () => {
	expect(() => moveItemBefore(1)).not.toThrow();
});

test('index less than zero -> returns input', () => {
	expect(moveItemBefore(['a', 'b'], -1)).toStrictEqual(['a', 'b']);
});

test('index greater than last element -> returns input', () => {
	expect(moveItemBefore(['a', 'b'], 2)).toStrictEqual(['a', 'b']);
});

test('index is first element -> returns input', () => {
	expect(moveItemBefore(['a', 'b'], 0)).toStrictEqual(['a', 'b']);
});

test('a -> a', () => {
	expect(moveItemBefore(['a'], 0)).toStrictEqual(['a']);
});

test('ab, 0 -> ab', () => {
	expect(moveItemBefore(['a', 'b'], 0)).toStrictEqual(['a', 'b']);
});

test('ab, 1 -> ba', () => {
	expect(moveItemBefore(['a', 'b'], 1)).toStrictEqual(['b', 'a']);
});

test('abc, 0 -> abc', () => {
	expect(moveItemBefore(['a', 'b', 'c'], 0)).toStrictEqual(['a', 'b', 'c']);
});

test('abc, 1 -> bac', () => {
	expect(moveItemBefore(['a', 'b', 'c'], 1)).toStrictEqual(['b', 'a', 'c']);
});

test('abc, 2 -> acb', () => {
	expect(moveItemBefore(['a', 'b', 'c'], 2)).toStrictEqual(['a', 'c', 'b']);
});

test('abcd, 0 -> abcd', () => {
	expect(moveItemBefore(['a', 'b', 'c', 'd'], 0)).toStrictEqual(['a', 'b', 'c', 'd']);
});

test('abcd, 1 -> bacd', () => {
	expect(moveItemBefore(['a', 'b', 'c', 'd'], 1)).toStrictEqual(['b', 'a', 'c', 'd']);
});

test('abcd, 2 -> acbd', () => {
	expect(moveItemBefore(['a', 'b', 'c', 'd'], 2)).toStrictEqual(['a', 'c', 'b', 'd']);
});

test('abcd, 3 -> abdc', () => {
	expect(moveItemBefore(['a', 'b', 'c', 'd'], 3)).toStrictEqual(['a', 'b', 'd', 'c']);
});
