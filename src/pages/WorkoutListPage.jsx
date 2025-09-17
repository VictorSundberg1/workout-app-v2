import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function WorkoutListPage() {
	const [workouts, setWorkouts] = useState([]); // State lista med alla workouts
	const [name, setName] = useState('');
	const navigate = useNavigate();

	// Hämtar alla workouts ur localstorage när komponent laddas
	useEffect(() => {
		const saved = localStorage.getItem('workouts');
		setWorkouts(saved ? JSON.parse(saved) : []);
	}, []);

	const addWorkout = () => {
		if (!name.trim()) return; // Check om namn är tomt
		const newWorkout = {
			id: Date.now().toString(), // Unik id från tid i millisekunder (?)
			name,
			exercises: [],
			date: new Date().toLocaleString([], {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			}),
		};

		const updated = [...workouts, newWorkout]; // Lägger till workout i lista
		setWorkouts(updated); // Uppdatera state med listan
		localStorage.setItem('workouts', JSON.stringify(updated)); // Sparar localstorage
		setName('');
		navigate(`/workout/${newWorkout.id}`); // Navigera till nya passet med det unika id:et som url
	};

	const removeWorkout = (id) => {
		const updated = workouts.filter((workout) => workout.id !== id); // Ta bort ur lista genom id:et
		setWorkouts(updated); // Uppdatera state med nya listan
		localStorage.setItem('workouts', JSON.stringify(updated)); // Sparar localstorage med nya listan
	};

	return (
		<div>
			<h1>Dina träningspass</h1>
			<form className="exercise-form">
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Namn på träningspass"
				/>

				<button className="workout-create-btn" onClick={addWorkout}>
					Skapa träningspass
				</button>
			</form>

			<ul className="workout-list">
				{workouts.map((workout) => {
					const totalReps = workout.exercises.reduce(
						(sum, ex) => sum + (ex.reps || 0),
						0
					);
					return (
						<li className="workout-list-li" key={workout.id}>
							{/* Länk till workout med det unika id:et */}
							<Link to={`/workout/${workout.id}`} className="workout-link">
								<h6 className="date-string">{workout.date}</h6>
								<span className="workout-name">{workout.name}</span>
								<span className="workout-total-reps">
									{totalReps} reps totalt
								</span>
							</Link>
							<button
								className="workout-remove-btn"
								onClick={() => removeWorkout(workout.id)}
							>
								Ta bort
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default WorkoutListPage;
