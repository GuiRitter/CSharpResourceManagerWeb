import { intersperse } from '../../../util/data';

test('empty input, empty output', () => {
	expect(intersperse([], '/')).toStrictEqual([]);
});

test(`['a'] + '/' => ['a']`, () => {
	expect(intersperse(['a'], '/')).toStrictEqual(['a']);
});

test(`['a', 'b'] + '/' => ['a', '/', 'b']`, () => {
	expect(intersperse(['a', 'b'], '/')).toStrictEqual(['a', '/', 'b']);
});


test(`['a', 'b', 'c'] + '/' => ['a', '/', 'b', '/', 'c']`, () => {
	expect(intersperse(['a', 'b', 'c'], '/')).toStrictEqual(['a', '/', 'b', '/', 'c']);
});
