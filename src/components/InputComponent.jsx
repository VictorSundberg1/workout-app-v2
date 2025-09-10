import { useState } from 'react';

function InputContainer(props) {
	const [exercise, setExercise] = useState('');
	const [reps, setReps] = useState('');

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					props.addExercise(exercise, reps);
					setExercise('');
					setReps('');
				}}
			>
				<input
					type="text"
					value={exercise}
					placeholder="Namn på övning"
					onChange={(e) => setExercise(e.target.value)}
				/>

				<input
					type="number"
					value={reps}
					placeholder="0"
					onChange={(e) => setReps(e.target.value)}
				/>

				<button type="submit">Lägg till</button>
			</form>
		</>
	);
}
export default InputContainer;
