function DisplayComponent({ exercises }) {
	return (
		<ul>
			{exercises.map((ex, i) => (
				<li key={i}>
					{ex.name} - {ex.reps} Reps
				</li>
			))}
		</ul>
	);
}
export default DisplayComponent;
