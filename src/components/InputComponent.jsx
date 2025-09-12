import { useState } from 'react';

function InputContainer(props) {
	const [exercise, setExercise] = useState('');
	const [reps, setReps] = useState('');
	const date = new Date().toLocaleString([], {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});

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
					props.addExercise(exercise, reps, date);
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
