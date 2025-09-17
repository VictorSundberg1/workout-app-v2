import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputComponent from '../components/InputComponent';
import DisplayComponent from '../components/DisplayComponent';
import { supabase } from '../lib/supabaseClient';

function WorkoutPage() {
	const { id } = useParams(); //Plockar ur id på workouten ur url:en
	const navigate = useNavigate();
	const [workout, setWorkout] = useState(null);

	//Hämtar workout från supabase när sidan laddas
	useEffect(() => {
		(async () => {
			const { data, error } = await supabase
				.from('workouts') // Tabellnamn
				.select('*') // hämtar alla kolumner
				.eq('id', id) // Filtrera fram rätt workout ur workouts listan med id
				.single(); // Returnerar den workouten som objekt
			if (error) {
				console.error(error);
				navigate('/'); // Navigerar tillbaka hem om ingen workout hittas
				return;
			}
			setWorkout(data); // Sätt datan från supabase till workout state
		})();
	}, [id, navigate]);

	// Sparar ändrad exercise listan till supabase
	const saveExercisesSupabase = async (newExercises) => {
		const { data, error } = await supabase
			.from('workouts')
			.update({ exercises: newExercises }) // Uppdaterar kolumnen "exercises"
			.eq('id', id) // Filtrerar fram rätt workout med id
			.select() // Returnerar uppdaterade raden
			.single(); // returnerar som objekt istället för array med flera objekt
		if (error) throw error;
		return data;
	};

	// Uppdaterar workout i state och i supabase
	const updateWorkout = async (newExercises) => {
		try {
			const updated = await saveExercisesSupabase(newExercises); // sparar till supabase
			setWorkout(updated); // uppdaterar state med nya övningar
		} catch (e) {
			console.error(e);
			alert('Misslyckades med att spara ändringar.');
		}
	};

	// Lägg till ny övning
	const addExercise = (name, reps, date) => {
		updateWorkout([...workout.exercises, { name, reps: Number(reps), date }]);
	};

	// Ta bort övning
	const removeExercise = (index) => {
		const newExercises = workout.exercises.filter((_, i) => i !== index);
		updateWorkout(newExercises);
	};

	// Öka antal reps på vald övning
	const handleIncrease = (index) => {
		const newExercises = workout.exercises.map((exercise, i) =>
			i === index ? { ...exercise, reps: exercise.reps + 1 } : exercise
		);
		updateWorkout(newExercises);
	};

	// Minskar antal reps på vald övning
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
