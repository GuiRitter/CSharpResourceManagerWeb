import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLog } from '../util/log';

import { getList, getRoot, setPath } from '../flux/action/index';

import './App.css';

const log = getLog('App.');

function componentDidMount(props, dispatch) {
	document.body.classList.add('container');
	sessionStorage.setItem('debug counter', 0);
	dispatch(getRoot());
}

function componentDidUpdate(props, prevProps, dispatch, pathField, pathList, list) {
	console.log('did update', { props, prevProps, pathList, list });
	const path = pathList.join('/');
	if (pathField && (pathField.value !== path)) {
		pathField.value = path;
	}
	if (pathList && list && (pathList.length > 0) && (list.length < 1)) {
		dispatch(getList(pathList));
	}
}

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

function App(props) {

	const didMountRef = useRef(false);

	const prevProps = usePrevious(props);

	const dispatch = useDispatch();

	const list = useSelector(state => ((state || {}).reducer || {}).list || []) || [];
	const pathList = useSelector(state => ((state || {}).reducer || {}).path || []) || [];

	const [pathField, setPathField] = useState(null);

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, prevProps, dispatch, pathField, pathList, list);
		} else {
			didMountRef.current = true;
			componentDidMount(props, dispatch);
		}
	});

	return <><h1>C♯ Resource Manager</h1><input
		className='path'
		disabled
		ref={ref => { if (ref) { setPathField(ref); } }}
	/><div
		className='left' id='left'
	>{list.map(file => <p className='file_item' key={file.name}>{file.isDirectory 
		? <input className='reload' onClick={() => dispatch(setPath(file.name))} type='button' value='📁' />
		: '📄'
	} {file.name}</p>)}</div><textarea
		className='right' id='right'
	/><input
		className='reload' /*onClick={() => diff()}*/ type='button' value='Reload'
	/><input
		className='save' /*onClick={() => merge()}*/ type='button' value='Save'
	/><p className='by'>by Guilherme Alan Ritter</p></>;
}

export default App;
