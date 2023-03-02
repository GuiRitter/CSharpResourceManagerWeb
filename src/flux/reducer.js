import * as type from './type';

import { PARENT_FOLDER } from '../constant/system';

import { getLog } from '../util/log';

const log = getLog('flux.reducer.');

const initialState =
{
	fileList: [],
	path: []
};

const byNotParent = file => file.name !== PARENT_FOLDER;

const reducer = (currentState = initialState, action) => {
	log('reducer', { currentState, action });

	switch (action.type) {

		case type.SET_FILE_LIST:

			let fileList = action.fileList;

			if (currentState.path && (currentState.path.length > 1)) {
				fileList = [{
					isDirectory: true,
					name: PARENT_FOLDER,
				}].concat(fileList);
			}

			return {
				...currentState,
				fileList,
			};

		case type.SET_PATH:

			if (action.fileName === PARENT_FOLDER) {
				return {
					...currentState,
					fileList: [],
					path: (currentState.path.length > 1) ? currentState.path.slice(0, -1) : currentState.path
				};
			}

			return {
				...currentState,
				fileList: [],
				path: currentState.path.concat(action.fileName),
			};

		case type.SET_ROOT:
			return {
				...currentState,
				fileList: [],
				path: [action.root]
			};

		default: return currentState;
	}
};

export default reducer;
