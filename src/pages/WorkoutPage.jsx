import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputComponent from '../components/InputComponent';
import DisplayComponent from '../components/DisplayComponent';

function WorkoutPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [workout, setWorkout] = useState(null);

	useEffect(() => {
		const saved = localStorage.getItem('workouts');
		if (saved) {
			const workouts = JSON.parse(saved);
			const found = workouts.find((workout) => workout.id === id);
			if (found) setWorkout(found);
			else navigate('/');
		}
	}, [id, navigate]);

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

	if (!workout) return <div>Laddar...</div>;

	return (
		<div>
			<h2>{workout.name}</h2>
			<InputComponent
				addExercise={(name, reps, date) =>
					updateWorkout([
						...workout.exercises,
						{ name, reps: Number(reps), date },
					])
				}
			/>
			<DisplayComponent
				exercises={workout.exercises}
				removeExercise={(index) => {
					const newExercises = workout.exercises.filter((_, i) => i !== index);
					updateWorkout(newExercises);
				}}
				handleIncrease={(index) => {
					const newExercises = workout.exercises.map((exercise, i) =>
						i === index ? { ...exercise, reps: exercise.reps + 1 } : exercise
					);
					updateWorkout(newExercises);
				}}
				handleDecrease={(index) => {
					const newExercises = workout.exercises.map((exercise, i) =>
						i === index && exercise.reps > 1
							? { ...exercise, reps: exercise.reps - 1 }
							: exercise
					);
					updateWorkout(newExercises);
				}}
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
