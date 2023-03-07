import { API_URL } from '../../constant/system';

import * as type from '../type';

import * as axios from './axios';

import { getUrlWithSearchParams } from '../../util/http';

import { getLog } from '../../util/log';
import { getEntryByName } from '../../util/resource';

const log = getLog('flux.action.index.');

const doesNothing = ({
	isLoading: false,
	type: type.NO_OP
});

export const addEntry = () => dispatch => {
	log('addEntry');
	let name = (window.prompt('New entry name:') || '').trim();
	if (!name) {
		return;
	}
	dispatch({
		type: type.ADD_ENTRY,
		name
	});
};

export const getFileList = pathList => dispatch => {
	log('getFileList', { pathList });
	dispatch(axios.get(
		getUrlWithSearchParams(`${API_URL}/list`, { pathList: JSON.stringify(pathList) }),
		null,
		response => dispatch({
			type: type.SET_FILE_LIST,
			fileList: response.data
		})
	));
};

export const getRoot = () => dispatch => {
	log('getRoot');
	dispatch(axios.get(
		`${API_URL}/root`,
		null,
		response => dispatch({
			type: type.SET_ROOT,
			root: response.data
		})
	));
};

export const readFile = fileName => (dispatch, getState) => {
	const pathList = (((getState || (() => { }))() || {}).reducer || {}).path || [];
	log('readFile', { fileName, pathList });
	dispatch(axios.get(
		getUrlWithSearchParams(`${API_URL}/read`, { fileName: JSON.stringify(fileName), pathList: JSON.stringify(pathList) }),
		null,
		response => dispatch({
			type: type.SET_ENTRY_LIST,
			entryList: response.data
		})
	));
};

export const removeEntry = name => dispatch => {
	log('removeEntry', { name });
	if (!window.confirm(`Remove entry ${name}?`)) {
		return doesNothing;
	}
	dispatch({
		type: type.REMOVE_ENTRY,
		name
	});
};

export const setEntryData = (entryName, language, dataName, dataValue) => (dispatch, getState) => {
	const entry = ((getState().reducer || {}).entryList || []).find(getEntryByName(entryName)) || {};
	if (dataValue === entry[language][dataName]) {
		return doesNothing;
	}
	dispatch({
		type: type.SET_ACTION_DATA,
		name: entryName,
		language,
		dataName,
		dataValue
	});
};

export const setPath = fileName => dispatch => {
	log('setPath', { fileName });
	dispatch({
		type: type.SET_PATH,
		fileName
	});
};
