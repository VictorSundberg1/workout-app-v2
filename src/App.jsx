import { useState } from 'react';
import InputContainer from './components/InputComponent';
import DisplayContainer from './components/DisplayComponent';
import './App.css';

function App() {
	const [exercises, setExercises] = useState([]);

	const addExercise = (name, reps) => {
		// Spred operator (...) används för att skapa en ny array med allt det gamla + det nya för att uppdatera komponenten
		setExercises([...exercises, { name, reps }]);
	};

	const removeExercise = (index) => {
		setExercises(exercises.filter((_, i) => i !== index));
	};

	return (
		<>
			<h1>Tränings-logg</h1>
			<InputContainer addExercise={addExercise} />
			<DisplayContainer exercises={exercises} removeExercise={removeExercise} />
		</>
	);
}
export default App;
