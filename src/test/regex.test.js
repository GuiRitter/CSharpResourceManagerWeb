const fileExtensionRegex = /(.+).resx$/im;
const englishRegex = /(.+).en-US.resx$/im;

const otherFileName = fileName => englishRegex.test(fileName) ? `${englishRegex.exec(fileName)[1]}.resx` : `${fileExtensionRegex.exec(fileName)[1]}.en-US.resx`;

const neutralFileName = fileName => englishRegex.test(fileName) ? `${englishRegex.exec(fileName)[1]}.resx` : fileName;
const englishFileName = fileName => englishRegex.test(fileName) ? fileName : `${fileExtensionRegex.exec(fileName)[1]}.en-US.resx`;

test('otherFileName 0', () => {
	expect(otherFileName('Shared.resx')).toStrictEqual('Shared.en-US.resx');
});

test('otherFileName 1', () => {
	expect(otherFileName('Shared.en-US.resx')).toStrictEqual('Shared.resx');
});

test('neutralFileName 0', () => {
	expect(neutralFileName('Shared.resx')).toStrictEqual('Shared.resx');
});

test('neutralFileName 1', () => {
	expect(neutralFileName('Shared.en-US.resx')).toStrictEqual('Shared.resx');
});

test('englishFileName 0', () => {
	expect(englishFileName('Shared.resx')).toStrictEqual('Shared.en-US.resx');
});

test('englishFileName 1', () => {
	expect(englishFileName('Shared.en-US.resx')).toStrictEqual('Shared.en-US.resx');
});
