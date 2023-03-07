import * as type from './type';

import { PARENT_FOLDER } from '../constant/system';

import { getLog } from '../util/log';

const log = getLog('flux.reducer.');

const initialState =
{
	entryList: [],
	fileList: [],
	path: []
};

const reducer = (currentState = initialState, action) => {
	log('reducer', { currentState, action });

	switch (action.type) {

		case type.SET_ACTION_DATA:

			return {
				...currentState,
				entryList: currentState.entryList.map(entry => {
					if (entry.name === action.name) {
						entry = JSON.parse(JSON.stringify(entry));
						entry[action.language][action.dataName] = action.dataValue;
					}
					return entry;
				})
			};

		case type.SET_ENTRY_LIST:
			return {
				...currentState,
				entryList: action.entryList
			};

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
				entryList: [],
				fileList,
			};

		case type.SET_PATH:

			if (action.fileName === PARENT_FOLDER) {
				return {
					...currentState,
					entryList: [],
					fileList: [],
					path: (currentState.path.length > 1) ? currentState.path.slice(0, -1) : currentState.path
				};
			}

			return {
				...currentState,
				entryList: [],
				fileList: [],
				path: currentState.path.concat(action.fileName),
			};

		case type.SET_ROOT:
			return {
				...currentState,
				entryList: [],
				fileList: [],
				path: [action.root]
			};

		default: return currentState;
	}
};

export default reducer;
