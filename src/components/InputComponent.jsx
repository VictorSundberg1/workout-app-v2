import { useState } from 'react';

function InputContainer(props) {
	const [exercise, setExercise] = useState('');
	const [reps, setReps] = useState('');

	return (
		<>
			<form
				className="exercise-form"
				onSubmit={(e) => {
					e.preventDefault();
					if (!exercise.trim() || !reps || reps <= 0) {
						alert('Fyll i namn och antal repetitioner över 0!');
						return;
					}
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
					placeholder="Reps"
					onChange={(e) => setReps(e.target.value)}
				/>

				<button type="submit">Lägg till</button>
			</form>
		</>
	);
}
export default InputContainer;
