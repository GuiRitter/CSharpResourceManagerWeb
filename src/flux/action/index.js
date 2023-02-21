import { API_URL } from '../../constant/system';

import * as type from '../type';

import * as axios from './axios';

import { getUrlWithSearchParams } from '../../util/http';

const doesNothing = ({
	isLoading: false,
	type: type.NO_OP
});

export const getList = path => dispatch => {
	dispatch(axios.get(
		getUrlWithSearchParams(`${API_URL}/list`, { parent: path }),
		null,
		response => dispatch({
			type: type.SET_LIST,
			list: response.data
		})
	));
};

export const getRoot = () => dispatch => {
	dispatch(axios.get(
		`${API_URL}/root`,
		null,
		response => dispatch({
			type: type.SET_PATH,
			path: response.data,
			root: response.data
		})
	));
};
