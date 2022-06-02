import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loadFileAction, resetAction} from '../reducer/actions';

const fileOptions = {
	types: [
		{description: 'json document', accept: {'application/json': ['.json']}},
	],
};

function FileMenu() {
	const store = useSelector((s) => s);
	const dispatch = useDispatch();

	async function saveAsHandler(e) {
		e.preventDefault();

		try {
			const filehandle = await window.showSaveFilePicker(fileOptions);
			const writable = await filehandle.createWritable();

			await writable.write(JSON.stringify(store));
			await writable.close();
			console.log('file written');
		} catch (err) {
			console.error(err);
		}
	}

	async function loadHandler(e) {
		e.preventDefault();

		try {
			const [filehandle] = await window.showOpenFilePicker(fileOptions);
			const file = await filehandle.getFile();
			const data = await file.text();

			console.log(JSON.parse(data));

			/* replace state in storage */
			dispatch(loadFileAction(JSON.parse(data)));
			console.log('file loaded');
		} catch (err) {
			console.error(err);
		}
	}

	function resetHandler(e) {
		dispatch(resetAction());
	}

	return (
		<fieldset>
			<legend>file</legend>
			<button onClick={resetHandler}>Reset</button>
			<button onClick={loadHandler}>Load..</button>
			<button onClick={saveAsHandler}>Save As..</button>
		</fieldset>
	);
}

export default FileMenu;
