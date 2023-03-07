import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LANGUAGE } from '../constant/resource';

import { removeEntry, renameEntry, setEntryData } from '../flux/action/index';

// import { getLog } from '../util/log';

import InputText from './InputText';

import './Entry.css';

// const log = getLog('Entry.');

function componentDidMount(props/*, dispatch*/, valueNeutralField, valueEnglishField, commentNeutralField, commentEnglishField) {
	if (valueNeutralField && (valueNeutralField.value !== (props.entry[LANGUAGE.NEUTRAL].value || ''))) {
		valueNeutralField.value = props.entry[LANGUAGE.NEUTRAL].value || '';
	}
	if (valueEnglishField && (valueEnglishField.value !== (props.entry[LANGUAGE.ENGLISH].value || ''))) {
		valueEnglishField.value = props.entry[LANGUAGE.ENGLISH].value || '';
	}
	if (commentNeutralField && (commentNeutralField.value !== (props.entry[LANGUAGE.NEUTRAL].comment || ''))) {
		commentNeutralField.value = props.entry[LANGUAGE.NEUTRAL].comment || '';
	}
	if (commentEnglishField && (commentEnglishField.value !== (props.entry[LANGUAGE.ENGLISH].comment || ''))) {
		commentEnglishField.value = props.entry[LANGUAGE.ENGLISH].comment || '';
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

	const dispatch = useDispatch();

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
			onClick={() => dispatch(renameEntry(props.entry.name))} type='button' value={props.entry.name}
		/><input
			className='delete'
			onClick={() => dispatch(removeEntry(props.entry.name))} type='button' value='×'
		/><span
			className='value text_align_center'
		>V</span>
		<img
			className='value_neutral'
			height='16'
			width='16'
			src='https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg'
		/><InputText
			className='value_neutral'
			onInput={() => dispatch(setEntryData(props.entry.name, LANGUAGE.NEUTRAL, 'value', valueNeutralField.value))}
			setRef={ref => { if (ref) { setValueNeutralField(ref); } }}
		/><img
			className='value_english'
			height='16'
			width='16'
			src='https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg'
		/><InputText
			className='value_english'
			onInput={() => dispatch(setEntryData(props.entry.name, LANGUAGE.ENGLISH, 'value', valueEnglishField.value))}
			setRef={ref => { if (ref) { setValueEnglishField(ref); } }}
		/><span
			className='comment text_align_center'
		>C</span><img
			className='comment_neutral'
			height='16'
			width='16'
			src='https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg'
		/><InputText
			className='comment_neutral'
			onInput={() => dispatch(setEntryData(props.entry.name, LANGUAGE.NEUTRAL, 'comment', commentNeutralField.value))}
			setRef={ref => { if (ref) { setCommentNeutralField(ref); } }}
		/><img
			className='comment_english'
			height='16'
			width='16'
			src='https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg'
		/><InputText
			className='comment_english'
			onInput={() => dispatch(setEntryData(props.entry.name, LANGUAGE.ENGLISH, 'comment', commentEnglishField.value))}
			setRef={ref => { if (ref) { setCommentEnglishField(ref); } }}
		/></div>;
}

export default Entry;
