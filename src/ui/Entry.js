import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { buildCell, buildRow, buildTable } from '../util/html';

import './Entry.css';

// function componentDidMount(props, dispatch) {
// }

// function componentDidUpdate(props, prevProps, dispatch) {
// }

const pt_BR_flag = <img height='16' width='16' src='https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg' />;
const en_flag = <img height='16' width='16' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg' />;

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

function Entry(props) {

	const didMountRef = useRef(false);

	const prevProps = usePrevious(props);

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps, dispatch);
		} else {
			didMountRef.current = true;
			// componentDidMount(props, dispatch);
		}
	});

	return <div
		className='entry'
	><input
			className='name'
			onClick={() => alert('TO DO')} type='button' value={props.entry.name}
		/><input
			className='delete'
			onClick={() => alert('TO DO')} type='button' value='×'
		/><span
			className='value text_align_center'
		>V</span>
		<img
			className='value_neutral'
			height='16'
			width='16'
			src='https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg'
		/><input
			className='value_neutral'
		/><img
			className='value_english'
			height='16'
			width='16'
			src='https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg'
		/><input
			className='value_english'
		/><span
			className='comment   text_align_center'
		>C</span><img
			className='comment_neutral'
			height='16'
			width='16'
			src='https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg'
		/><input
			className='comment_neutral'
		/><img
			className='comment_english'
			height='16'
			width='16'
			src='https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg'
		/><input
			className='comment_english'
		/></div>;

}

export default Entry;
