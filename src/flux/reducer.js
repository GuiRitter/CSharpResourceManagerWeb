import * as type from './type';

import { getLog } from '../util/log';

const log = getLog('flux.reducer.');

const initialState =
{
	list: [],
	path: null,
	root: null,
};

const reducer = (currentState = initialState, action) => {
	log('reducer', { currentState, action });

	switch (action.type) {

		case type.SET_LIST:

			let list = action.list;

			if (currentState.path && currentState.root && (currentState.path.localeCompare(currentState.root)) !== 0) {
				list = [{
					isDirectory: true,
					name: "..",
					path: null
				}].concat(list);
			}

			return {
				...currentState,
				list,
			};

		case type.SET_PATH:
			return {
				...currentState,
				path: action.path,
			};

		default: return currentState;
	}
};

export default reducer;
