import { moveItemAfter } from '../../../util/data';

test('null -> not throw', () => {
	expect(() => moveItemAfter(null)).not.toThrow();
});

test('undefined -> not throw', () => {
	expect(() => moveItemAfter(undefined)).not.toThrow();
});

test('emptry string -> not throw', () => {
	expect(() => moveItemAfter('')).not.toThrow();
});

test('number -> not throw', () => {
	expect(() => moveItemAfter(1)).not.toThrow();
});

test('index less than zero -> returns input', () => {
	expect(moveItemAfter(['a', 'b'], -1)).toStrictEqual(['a', 'b']);
});

test('index greater than last element -> returns input', () => {
	expect(moveItemAfter(['a', 'b'], 2)).toStrictEqual(['a', 'b']);
});

test('index is last element -> returns input', () => {
	expect(moveItemAfter(['a', 'b'], 1)).toStrictEqual(['a', 'b']);
});

test('a -> a', () => {
	expect(moveItemAfter(['a'], 0)).toStrictEqual(['a']);
});

test('ab, 0 -> ab', () => {
	expect(moveItemAfter(['a', 'b'], 0)).toStrictEqual(['b', 'a']);
});

test('ab, 1 -> ab', () => {
	expect(moveItemAfter(['a', 'b'], 1)).toStrictEqual(['a', 'b']);
});

test('abc, 0 -> bac', () => {
	expect(moveItemAfter(['a', 'b', 'c'], 0)).toStrictEqual(['b', 'a', 'c']);
});

test('abc, 1 -> acb', () => {
	expect(moveItemAfter(['a', 'b', 'c'], 1)).toStrictEqual(['a', 'c', 'b']);
});

test('abc, 2 -> abc', () => {
	expect(moveItemAfter(['a', 'b', 'c'], 2)).toStrictEqual(['a', 'b', 'c']);
});

test('abcd, 0 -> bacd', () => {
	expect(moveItemAfter(['a', 'b', 'c', 'd'], 0)).toStrictEqual(['b', 'a', 'c', 'd']);
});

test('abcd, 1 -> acbd', () => {
	expect(moveItemAfter(['a', 'b', 'c', 'd'], 1)).toStrictEqual(['a', 'c', 'b', 'd']);
});

test('abcd, 2 -> abdc', () => {
	expect(moveItemAfter(['a', 'b', 'c', 'd'], 2)).toStrictEqual(['a', 'b', 'd', 'c']);
});

test('abcd, 3 -> abcd', () => {
	expect(moveItemAfter(['a', 'b', 'c', 'd'], 3)).toStrictEqual(['a', 'b', 'c', 'd']);
});
