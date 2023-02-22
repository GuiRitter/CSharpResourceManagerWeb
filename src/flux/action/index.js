import { API_URL } from '../../constant/system';

import * as type from '../type';

import * as axios from './axios';

import { getUrlWithSearchParams } from '../../util/http';

import { getLog } from '../../util/log';

const log = getLog('flux.action.index.');

// const doesNothing = ({
// 	isLoading: false,
// 	type: type.NO_OP
// });

export const getList = pathList => dispatch => {
	log('getList', { pathList });
	dispatch(axios.get(
		getUrlWithSearchParams(`${API_URL}/list`, { pathList: JSON.stringify(pathList) }),
		null,
		response => dispatch({
			type: type.SET_LIST,
			list: response.data
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

export const setPath = fileName => dispatch => {
	log('setPath', { fileName });
	dispatch({
		type: type.SET_PATH,
		fileName
	});
};
