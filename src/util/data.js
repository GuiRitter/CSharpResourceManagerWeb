export const areArraysEqual = (array0, array1, comparator) => {
	const array0IsArray = Array.isArray(array0);
	const array1IsArray = Array.isArray(array1);
	if ((!array0IsArray) && (!array1IsArray)) {
		return true;
	}
	if ((!array0IsArray) || (!array1IsArray) || (array0.length !== array1.length)) {
		return false;
	}
	if (!comparator) {
		comparator = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0;
	}
	const array0Sorted = Array.from(array0).sort(comparator);
	const array1Sorted = Array.from(array1).sort(comparator);
	return array0Sorted.every((item0, index) => comparator(item0, array1Sorted[index]) === 0);
};

export const areEqual = (a, b) => a === b;

export const buildUUID = () => window.self.crypto.randomUUID();

export const getIndex = (item, index) => index;

export const intersperse = (array, element) => array.flatMap(item => [element, item]).slice(1);

export const isArrayNullOrEmpty = array => (!array) || (Array.isArray(array) && array.length === 0);

export const joinArrayIntoString = array => {

	if (!array) {
		return '';
	}

	let head = array.slice(0, -1);
	let tail = array.slice(-1);

	let output = `${tail}`;

	if (array.length > 1) {
		output = ` & ${output}`;
	}

	output = `${head.join(', ')}${output}`;

	return output;
};

export const moveItemBefore = (list, index) => {

	if ((!Array.isArray(list)) || (index < 1) || (index >= list.length)) {
		return list;
	}

	const listBefore = list.slice(0, index - 1);

	const listAfter = list.slice(index + 1);

	const element = list[index];

	const elementBefore = list[index - 1];

	return listBefore.concat(element).concat(elementBefore).concat(listAfter);
};

export const moveItemAfter = (list, index) => {

	if ((!Array.isArray(list)) || (index < 0) || (index > list.length - 2)) {
		return list;
	}

	const listBefore = list.slice(0, index);

	const listAfter = list.slice(index + 2);

	const element = list[index];

	const elementAfter = list[index + 1];

	return listBefore.concat(elementAfter).concat(element).concat(listAfter);
};
