import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<div>
			<h1>Page Does Not Exists 🥹</h1>
			<Link to={'/'}>
				<button>Go back home</button>
			</Link>
		</div>
	);
};

export default NotFoundPage;
