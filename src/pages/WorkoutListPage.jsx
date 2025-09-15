import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function WorkoutListPage() {
	const [workouts, setWorkouts] = useState(() => {
		const saved = localStorage.getItem('workouts');
		return saved ? JSON.parse(saved) : [];
	});

	const [name, setName] = useState('');
	const navigate = useNavigate();

	const addWorkout = () => {
		if (!name.trim()) return;
		const newWorkout = {
			id: Date.now().toString(),
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

		const updated = [...workouts, newWorkout];
		setWorkouts(updated);
		localStorage.setItem('workouts', JSON.stringify(updated));
		setName('');
		navigate(`/workout/${newWorkout.id}`);
	};

	const removeWorkout = (id) => {
		const updated = workouts.filter((workout) => workout.id !== id);
		setWorkouts(updated);
		localStorage.setItem('workouts', JSON.stringify(updated));
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

			<ul className="display-list workout-list">
				{workouts.map((workout) => (
					<li className="workout-list-item" key={workout.id}>
						<h6 className="date-string">{workout.date}</h6>
						<Link to={`/workout/${workout.id}`} className="workout-link">
							<span className="workout-name">{workout.name}</span>
						</Link>
						<button
							className="workout-remove-btn"
							onClick={() => removeWorkout(workout.id)}
						>
							Ta bort
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default WorkoutListPage;
