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
			entryList: response.data.mergedEntryList,
			prefixList: response.data.prefixList,
			fileName
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

export const renameEntry = oldName => (dispatch, getState) => {
	log('renameEntry', { oldName });
	const newName = window.prompt(`Enter a new name for ${oldName}:`).trim();
	log('renameEntry', { newName });
	if (!newName) {
		return doesNothing;
	}
	const entry = ((getState().reducer || {}).entryList || []).find(getEntryByName(newName));
	if (entry) {
		alert(`Entry ${newName} already exists.`);
		return doesNothing;
	}
	dispatch({
		type: type.RENAME_ENTRY,
		oldName,
		newName
	});
};

export const saveFile = () => (dispatch, getState) => {
	log('saveFile');
	dispatch(axios.post(
		getUrlWithSearchParams(`${API_URL}/save`, { fileName: JSON.stringify(getState().reducer.fileName) }),
		{
			entryList: getState().reducer.entryList,
			pathList: getState().reducer.path,
			prefixList: getState().reducer.prefixList
		},
		null,
		response => dispatch(getFileList(getState().reducer.path))
	));
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
