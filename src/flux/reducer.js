import * as type from './type';

import { PARENT_FOLDER } from '../constant/system';

import { getLog } from '../util/log';

const log = getLog('flux.reducer.');

const initialState =
{
	list: [],
	path: []
};

const byNotParent = file => file.name !== PARENT_FOLDER;

const reducer = (currentState = initialState, action) => {
	log('reducer', { currentState, action });

	switch (action.type) {

		case type.SET_LIST:

			let list = action.list;

			if (currentState.path && (currentState.path.length > 1)) {
				list = [{
					isDirectory: true,
					name: PARENT_FOLDER,
				}].concat(list);
			}

			return {
				...currentState,
				list,
			};

		case type.SET_PATH:

			if (action.fileName === PARENT_FOLDER) {
				return {
					...currentState,
					list: [],
					path: (currentState.path.length > 1) ? currentState.path.slice(0, -1) : currentState.path
				};
			}

			return {
				...currentState,
				list: [],
				path: currentState.path.concat(action.fileName),
			};

		case type.SET_ROOT:
			return {
				...currentState,
				list: [],
				path: [action.root]
			};

		default: return currentState;
	}
};

export default reducer;
