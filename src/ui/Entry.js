import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { getLog } from '../util/log';

import { buildCell, buildRow, buildTable } from '../util/html';

import './Entry.css';

// const log = getLog('Entry.');

function componentDidMount(props/*, dispatch*/, valueNeutralField, valueEnglishField, commentNeutralField, commentEnglishField) {
	if (valueNeutralField && (valueNeutralField.value !== (props.entry[''].value || ''))) {
		valueNeutralField.value = props.entry[''].value || '';
	}
	if (valueEnglishField && (valueEnglishField.value !== (props.entry['en-US'].value || ''))) {
		valueEnglishField.value = props.entry['en-US'].value || '';
	}
	if (commentNeutralField && (commentNeutralField.value !== (props.entry[''].comment || ''))) {
		commentNeutralField.value = props.entry[''].comment || '';
	}
	if (commentEnglishField && (commentEnglishField.value !== (props.entry['en-US'].comment || ''))) {
		commentEnglishField.value = props.entry['en-US'].comment || '';
	}
}

function componentDidUpdate(props, prevProps/*, dispatch*/, valueNeutralField, valueEnglishField, commentNeutralField, commentEnglishField) {
	componentDidMount(props, valueNeutralField, valueEnglishField, commentNeutralField, commentEnglishField);
}

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

	// log('Entry', { props });

	const didMountRef = useRef(false);

	const prevProps = usePrevious(props);

	const [valueNeutralField, setValueNeutralField] = useState(null);
	const [valueEnglishField, setValueEnglishField] = useState(null);
	const [commentNeutralField, setCommentNeutralField] = useState(null);
	const [commentEnglishField, setCommentEnglishField] = useState(null);

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, prevProps/*, dispatch*/, valueNeutralField, valueEnglishField, commentNeutralField, commentEnglishField);
		} else {
			didMountRef.current = true;
			componentDidMount(props, /*dispatch, */valueNeutralField, valueEnglishField, commentNeutralField, commentEnglishField);
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
			ref={ref => { if (ref) { setValueNeutralField(ref); } }}
		/><img
			className='value_english'
			height='16'
			width='16'
			src='https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg'
		/><input
			className='value_english'
			ref={ref => { if (ref) { setValueEnglishField(ref); } }}
		/><span
			className='comment text_align_center'
		>C</span><img
			className='comment_neutral'
			height='16'
			width='16'
			src='https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg'
		/><input
			className='comment_neutral'
			ref={ref => { if (ref) { setCommentNeutralField(ref); } }}
		/><img
			className='comment_english'
			height='16'
			width='16'
			src='https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg'
		/><input
			className='comment_english'
			ref={ref => { if (ref) { setCommentEnglishField(ref); } }}
		/></div>;
}

export default Entry;
