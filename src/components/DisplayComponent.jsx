function DisplayComponent({ exercises, removeExercise }) {
	return (
		<ul className="display-list">
			{exercises.map((ex, i) => (
				<li key={i}>
					{ex.name} - {ex.reps} Reps
					<button onClick={() => removeExercise(i)}>Ta bort</button>
				</li>
			))}
		</ul>
	);
}
export default DisplayComponent;
