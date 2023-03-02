import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { buildCell, buildRow, buildTable } from '../util/html';

// import './Entry.css';

// function componentDidMount(props, dispatch) {
// }

// function componentDidUpdate(props, prevProps, dispatch) {
// }

const pt_BR_flag = <img height="16" width="16" src="https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg" />;
const en_flag = <img height="16" width="16" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg" />;

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

	return buildTable(
		{ key: `entry_${props.entry.name}` },

		buildRow(
			'name',
			buildCell('name', <input onClick={() => alert('TO DO')} type='button' value={props.entry.name} />, { colspan: 2 }),
			buildCell('delete', <input onClick={() => alert('TO DO')} type='button' value='×' />)
		),

		buildRow('value', buildCell('value', 'Value', { className: 'text_align_center', colspan: 3 })),

		buildRow('value_neutral', buildCell('flag', pt_BR_flag), buildCell('input', <input />, { colspan: 2 })),
		buildRow('value_english', buildCell('flag', en_flag), buildCell('input', <input />, { colspan: 2 })),

		buildRow('comment', buildCell('comment', 'comment', { className: 'text_align_center', colspan: 3 })),

		buildRow('comment_neutral', buildCell('flag', pt_BR_flag), buildCell('input', <input />, { colspan: 2 })),
		buildRow('comment_english', buildCell('flag', en_flag), buildCell('input', <input />, { colspan: 2 }))
	);
}

export default Entry;
