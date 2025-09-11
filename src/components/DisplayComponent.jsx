function DisplayComponent({
	exercises,
	removeExercise,
	handleDecrease,
	handleIncrease,
}) {
	return (
		<ul className="display-list">
			{exercises.map((ex, i) => (
				<li key={i}>
					<h6 className="date-string">{ex.date}</h6>
					<span className="cardd-info">
						{ex.name} - {ex.reps} Reps
					</span>
					<span className="card-buttons">
						<button onClick={() => handleIncrease(i)}>+</button>
						<button onClick={() => handleDecrease(i)}>-</button>
						<button onClick={() => removeExercise(i)}>Ta bort</button>
					</span>
				</li>
			))}
		</ul>
	);
}
export default DisplayComponent;
