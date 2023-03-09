import * as type from './type';

import { PARENT_FOLDER } from '../constant/system';

import { getLog } from '../util/log';
import { build as buildEntry, byName, byNotThisName, getEntryByName } from '../util/resource';

const log = getLog('flux.reducer.');

const initialState =
{
	entryList: [],
	fileList: [],
	fileName: null,
	path: [],
	prefixList: []
};

const reducer = (currentState = initialState, action) => {
	log('reducer', { currentState, action });

	switch (action.type) {

		case type.ADD_ENTRY:

			if (currentState.entryList.find(getEntryByName(action.name))) {
				return currentState;
			}

			return {
				...currentState,
				entryList: currentState.entryList.concat(buildEntry(action.name)).sort(byName)
			};

		case type.RENAME_ENTRY:

			let entry = currentState.entryList.find(getEntryByName(action.newName));

			if (entry) {
				return currentState;
			}

			entry = currentState.entryList.find(getEntryByName(action.oldName));

			if (!entry) {
				return currentState;
			}

			entry = { ...entry, name: action.newName };

			return {
				...currentState,
				entryList: currentState.entryList.filter(byNotThisName(action.oldName)).concat(entry).sort(byName)
			};

		case type.REMOVE_ENTRY:

			return {
				...currentState,
				entryList: currentState.entryList.filter(byNotThisName(action.name))
			};

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
				entryList: action.entryList,
				prefixList: action.prefixList,
				fileName: action.fileName
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
				prefixList: []
			};

		case type.SET_PATH:

			if (action.fileName === PARENT_FOLDER) {
				return {
					...currentState,
					entryList: [],
					fileList: [],
					fileName: null,
					path: (currentState.path.length > 1) ? currentState.path.slice(0, -1) : currentState.path,
					prefixList: []
				};
			}

			return {
				...currentState,
				entryList: [],
				fileList: [],
				fileName: null,
				path: currentState.path.concat(action.fileName),
				prefixList: []
			};

		case type.SET_ROOT:
			return {
				...currentState,
				entryList: [],
				fileList: [],
				fileName: null,
				path: [action.root],
				prefixList: []
			};

		default: return currentState;
	}
};

export default reducer;
