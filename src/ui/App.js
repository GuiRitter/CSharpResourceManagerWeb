import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLog } from '../util/log';

import { getList, getRoot } from '../flux/action/index';

import './App.css';

const log = getLog('App.');

function componentDidMount(props, dispatch) {
	document.body.classList.add('container');
	sessionStorage.setItem('debug counter', 0);
	dispatch(getRoot());
}

function componentDidUpdate(props, prevProps, dispatch, pathField, path, list) {
	console.log('did update', { props, prevProps });
	if (pathField && (pathField.value !== path)) {
		pathField.value = path;
	}
	if (path && list && list.length < 1) {
		dispatch(getList(path));
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

	const list = useSelector(state => ((state || {}).reducer || {}).list || '') || '';
	const path = useSelector(state => ((state || {}).reducer || {}).path || '') || '';

	const [pathField, setPathField] = useState(null);

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, prevProps, dispatch, pathField, path, list);
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
	>{list.map(file => <p className='file_item'>{file.isDirectory 
		? <input className='reload' /*onClick={() => diff()}*/ type='button' value='📁' />
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
