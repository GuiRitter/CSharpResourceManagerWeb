import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLog } from '../util/log';

import { getFileList, getRoot, setPath } from '../flux/action/index';

import Path from './Path';

import './App.css';

const log = getLog('App.');

function componentDidMount(props, dispatch) {
	document.body.classList.add('container');
	sessionStorage.setItem('debug counter', 0);
	dispatch(getRoot());
}

function componentDidUpdate(props, prevProps, dispatch, pathList, fileList) {
	console.log('did update', { props, prevProps, pathList, fileList });
	if (pathList && fileList && (pathList.length > 0) && (fileList.length < 1)) {
		dispatch(getFileList(pathList));
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

	const fileList = useSelector(state => ((state || {}).reducer || {}).fileList || []) || [];
	const pathList = useSelector(state => ((state || {}).reducer || {}).path || []) || [];


	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, prevProps, dispatch, pathList, fileList);
		} else {
			didMountRef.current = true;
			componentDidMount(props, dispatch);
		}
	});

	return <><h1>C♯ Resource Manager</h1><Path/><div
		className='left' id='left'
	>{fileList.map(file => <p className='file_item' key={file.name}>{file.isDirectory 
		? <input className='reload' onClick={() => dispatch(setPath(file.name))} type='button' value='📁' />
		: '📄'
	} {file.name}</p>)}</div><textarea
		className='right' id='right'
	/><input
		className='reload' onClick={() => dispatch(getFileList(pathList))} type='button' value='Reload'
	/><input
		className='save' /*onClick={() => merge()}*/ type='button' value='Save'
	/><p className='by'>by Guilherme Alan Ritter</p></>;
}

export default App;
