import { useState } from 'react';
import InputContainer from './components/InputComponent';
import DisplayContainer from './components/DisplayComponent';
import './App.css';

function App() {
	const [exercises, setExercises] = useState([]);
	const totalReps = exercises.reduce((sum, ex) => sum + ex.reps, 0);

	const addExercise = (name, reps) => {
		// Spred operator (...) används för att skapa en ny array med allt det gamla + det nya för att uppdatera komponenten
		setExercises([...exercises, { name, reps: Number(reps) }]);
	};

	const removeExercise = (index) => {
		setExercises(exercises.filter((_, i) => i !== index));
	};

	const handleIncrease = (index) => {
		setExercises(
			exercises.map((ex, i) =>
				i === index ? { ...ex, reps: ex.reps + 1 } : ex
			)
		);
	};

	const handleDecrease = (index) => {
		setExercises(
			exercises.map((ex, i) =>
				i === index && ex.reps > 0 ? { ...ex, reps: ex.reps - 1 } : ex
			)
		);
	};

	return (
		<>
			<h1>Tränings-logg</h1>
			<h3>Totala reps: {totalReps}</h3>
			<InputContainer addExercise={addExercise} />
			<DisplayContainer
				exercises={exercises}
				removeExercise={removeExercise}
				handleIncrease={handleIncrease}
				handleDecrease={handleDecrease}
			/>
		</>
	);
}
export default App;
