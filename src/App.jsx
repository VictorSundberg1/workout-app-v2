import { useState, useEffect } from 'react';
import InputComponent from './components/InputComponent';
import DisplayComponent from './components/DisplayComponent';
import './App.css';

function App() {
	// Hämtar övningar från localstorage när appen laddas in. finns inget returneras tom array
	const [exercises, setExercises] = useState(() => {
		try {
			const saved = localStorage.getItem('exercises');
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	});

	const totalReps = exercises.reduce((sum, ex) => sum + ex.reps, 0);

	const addExercise = (name, reps) => {
		const date = new Date().toLocaleString([], {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});

		// Spred operator (...) används för att skapa en ny array med allt det gamla + det nya för att uppdatera komponenten
		setExercises([...exercises, { name, reps: Number(reps), date }]);
	};

	const removeExercise = (index) => {
		setExercises(exercises.filter((_, i) => i !== index));
	};

	const handleIncrease = (index) => {
		setExercises(
			exercises.map((exercise, i) =>
				i === index ? { ...exercise, reps: exercise.reps + 1 } : exercise
			)
		);
	};

	const handleDecrease = (index) => {
		setExercises(
			exercises.map((exercise, i) =>
				i === index && exercise.reps > 0
					? { ...exercise, reps: exercise.reps - 1 }
					: exercise
			)
		);
	};

	// Sparar övning till localstorage som json sträng varje gång arrayen ändras
	useEffect(() => {
		localStorage.setItem('exercises', JSON.stringify(exercises));
	}, [exercises]);

	return (
		<>
			<h1>Tränings-logg</h1>
			<h3>Totala reps: {totalReps}</h3>
			<InputComponent addExercise={addExercise} />
			<DisplayComponent
				exercises={exercises}
				removeExercise={removeExercise}
				handleIncrease={handleIncrease}
				handleDecrease={handleDecrease}
			/>
		</>
	);
}
export default App;
