import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; //importerar supabaseclienten

function WorkoutListPage() {
	const [workouts, setWorkouts] = useState([]); // State lista med alla workouts
	const [name, setName] = useState('');
	const navigate = useNavigate();

	// Hämtar workouts från supabase när sidan laddas
	useEffect(() => {
		(async () => {
			const { data, error } = await supabase
				.from('workouts') // Väljer tabellen workouts
				.select('*') // Plockar ut alla kolumner
				.order('date', { ascending: false }); // sorterar på "date-kolumnen" nyast först
			if (error) {
				console.error(error);
				return;
			}
			setWorkouts(data || []); // Sätter resultatet i state
		})();
	}, []);

	//Skapar upp en ny workout till supabase
	const addWorkout = async (e) => {
		e?.preventDefault();
		if (!name.trim()) return; // Check om namn är tomt isåfall avbryt
		try {
			const { data, error } = await supabase
				.from('workouts') // Tabellnamn
				// Vilka kolumner som ska läggas till i tabellen
				.insert({
					name, // Namn från input
					exercises: [], // Tom lista där exercises läggs in senare
				})
				.select() // Returnerar nya raden som lagts till (insert) direkt
				.single(); // Returnerar som objekt istället för array
			if (error) throw error;

			setWorkouts((prev) => [data, ...prev]); // Lägger till nya workouten överst i state listan
			setName('');
			navigate(`/workout/${data.id}`); // Navigerar till den nyskapade workouten
		} catch (e) {
			console.error(e);
			alert('Misslyckades att lägga till träningspass');
		}
	};

	//Tar bort en workout från supabase
	const removeWorkout = async (id) => {
		try {
			const { error } = await supabase
				.from('workouts') // Tabellnamnet
				.delete() // sql delete för supabase
				.eq('id', id); // Pekar på vilken kolumn ska bort genom id

			if (error) throw error;

			setWorkouts((prev) => prev.filter((w) => w.id !== id)); // Uppdaterar state med bortagen workout med id
		} catch (e) {
			console.error(e);
			alert('Misslyckades med att ta bort träningspass');
		}
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
					const totalReps = (workout.exercises || []).reduce(
						(sum, ex) => sum + (ex.reps || 0),
						0
					);
					const dateString = new Date(workout.date).toLocaleString('sv-SE', {
						year: 'numeric',
						month: 'numeric',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
					});
					return (
						<li className="workout-list-li" key={workout.id}>
							{/* Länk till workout med det unika id:et */}
							<Link to={`/workout/${workout.id}`} className="workout-link">
								<h6 className="date-string">{dateString}</h6>
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
