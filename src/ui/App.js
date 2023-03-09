import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLog } from '../util/log';

import { addEntry, getFileList, getRoot, readFile, saveFile, setPath } from '../flux/action/index';

import Entry from './Entry';
import Path from './Path';

import './App.css';

const log = getLog('App.');

function componentDidMount(props, dispatch) {
	document.body.classList.add('container');
	sessionStorage.setItem('debug counter', 0);
	dispatch(getRoot());
}

function componentDidUpdate(props, prevProps, dispatch, pathList, fileList) {
	log('componentDidUpdate', { props, prevProps, pathList, fileList });
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

	const entryList = useSelector(state => ((state || {}).reducer || {}).entryList || []) || [];
	const fileList = useSelector(state => ((state || {}).reducer || {}).fileList || []) || [];
	const pathList = useSelector(state => ((state || {}).reducer || {}).path || []) || [];

	log('App', { props, prevProps, entryList, fileList, pathList });

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, prevProps, dispatch, pathList, fileList);
		} else {
			didMountRef.current = true;
			componentDidMount(props, dispatch);
		}
	});

	return <><h1>C♯ Resource Manager</h1><Path /><div
		className='left' id='left'
	>{fileList.map(file => <p className='file_item' key={file.name}>{file.isDirectory
		? <input className='icon' onClick={() => dispatch(setPath(file.name))} type='button' value='📁' />
		: <input className='icon' onClick={() => dispatch(readFile(file.name))} type='button' value='📄' />
	} {file.name}</p>)}</div><div
		className='right' id='right'
	>{(
		entryList.length
			? [<div className='entry' key='' ><input className='add' onClick={() => dispatch(addEntry())} type='button' value='Add new entry' /></div>]
			: []
	).concat(
		entryList.map(entry => <Entry key={entry.name} entry={entry} />)
	)}</div><input
			className='reload' onClick={() => dispatch(getFileList(pathList))} type='button' value='Reload'
		/><input
			className='save' onClick={() => dispatch(saveFile())} type='button' value='Save'
		/><p className='by'>by Guilherme Alan Ritter</p></>;
}

export default App;
