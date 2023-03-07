import React, { useEffect, useRef, useState } from 'react';

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

function componentDidUpdate(props, prevProps, inputRef, selectionStart, selectionEnd, selectionDirection) {
	if (inputRef) {
		setTimeout(() => inputRef.setSelectionRange(selectionStart, selectionEnd, selectionDirection), 0);
	}
}

function InputText(props) {

	const didMountRef = useRef(false);

	const prevProps = usePrevious(props);

	const [selectionStart, setSelectionStart] = useState('');
	const [selectionEnd, setSelectionEnd] = useState('');
	const [selectionDirection, setSelectionDirection] = useState('');
	const [inputRef, setInputRef] = useState(null);

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, prevProps, inputRef, selectionStart, selectionEnd, selectionDirection);
		} else {
			didMountRef.current = true;
			// componentDidMount(props);
		}
	});

	const options = {
		className: props.className,
		id: props.id,
		onInput: event => {
			if (props.fitHeight) {
				event.target.style.height = '1px';
				event.target.style.height = event.target.scrollHeight + 'px'; 
			}
			setSelectionStart(event.target.selectionStart);
			setSelectionEnd(event.target.selectionEnd);
			setSelectionDirection(event.target.selectionDirection);
			if (props.onInput) {
				props.onInput(event);
			}
		},
		ref: ref => { if (ref) { setInputRef(ref); if (props.setRef) { props.setRef(ref); } } },
		tabIndex: props.tabIndex
	};

	if (props.disabled) {
		options.disabled = props.disabled;
	}

	return props.multiLine ? <textarea
		{...options}
	/> : <input
		{...options}
	/>;
}

export default InputText;
