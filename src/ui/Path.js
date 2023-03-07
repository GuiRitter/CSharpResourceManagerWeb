import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { intersperse } from '../util/data';

import './Path.css';

// function componentDidMount(props, dispatch) {
// }

// function componentDidUpdate(props, prevProps, dispatch) {
// }

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

function Path(props) {

	const didMountRef = useRef(false);

	const prevProps = usePrevious(props);

	const pathList = useSelector(state => ((state || {}).reducer || {}).path || []) || [];

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps, dispatch);
		} else {
			didMountRef.current = true;
			// componentDidMount(props, dispatch);
		}
	});

	return <div className='path_scroll'><div className='path_view_port'>{intersperse(pathList.map((pathItem, index) => <span key={index}>{pathItem}</span>), <span className='path_separator'>/</span>).map((item, index, list) => ({ ...item, key: item.key || index + (list.length * 2) }))}</div></div>;
}

export default Path;
