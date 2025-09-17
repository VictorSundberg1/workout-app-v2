import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputComponent from '../components/InputComponent';
import DisplayComponent from '../components/DisplayComponent';

function WorkoutPage() {
	const { id } = useParams(); //Plockar ur id på workouten ur url:en
	const navigate = useNavigate();
	const [workout, setWorkout] = useState(null);

	// Hämtar wokout från localstorage när komponenten laddas
	useEffect(() => {
		const saved = localStorage.getItem('workouts');
		if (saved) {
			const workouts = JSON.parse(saved);
			const found = workouts.find((workout) => workout.id === id);
			if (found) setWorkout(found);
			else navigate('/'); // Navigerar tillbaka om ingen workout hittas
		}
	}, [id, navigate]);

	// Uppdaterar både state och localstorage vid änding
	const updateWorkout = (newExercises) => {
		setWorkout((workout) => ({ ...workout, exercises: newExercises }));
		const saved = localStorage.getItem('workouts');
		if (saved) {
			const workouts = JSON.parse(saved).map((workout) =>
				workout.id === id ? { ...workout, exercises: newExercises } : workout
			);
			localStorage.setItem('workouts', JSON.stringify(workouts));
		}
	};

	const addExercise = (name, reps, date) => {
		updateWorkout([...workout.exercises, { name, reps: Number(reps), date }]);
	};

	const removeExercise = (index) => {
		const newExercises = workout.exercises.filter((_, i) => i !== index);
		updateWorkout(newExercises);
	};

	const handleIncrease = (index) => {
		const newExercises = workout.exercises.map((exercise, i) =>
			i === index ? { ...exercise, reps: exercise.reps + 1 } : exercise
		);
		updateWorkout(newExercises);
	};

	const handleDecrease = (index) => {
		const newExercises = workout.exercises.map((exercise, i) =>
			i === index && exercise.reps > 1 // Check så det inte går under 1
				? { ...exercise, reps: exercise.reps - 1 }
				: exercise
		);
		updateWorkout(newExercises);
	};

	if (!workout) return <div>Laddar...</div>;

	return (
		<div>
			<h2>{workout.name}</h2>
			<InputComponent addExercise={addExercise} />
			<DisplayComponent
				exercises={workout.exercises}
				removeExercise={removeExercise}
				handleIncrease={handleIncrease}
				handleDecrease={handleDecrease}
			/>
			<p>
				Totalt antal reps:{' '}
				{workout.exercises.reduce((sum, exercises) => sum + exercises.reps, 0)}
			</p>
			<button onClick={() => navigate('/')}>Tillbaka</button>
		</div>
	);
}

export default WorkoutPage;
