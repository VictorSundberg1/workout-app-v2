import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './app.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage.jsx';
import WorkoutListPage from './pages/WorkoutListPage.jsx';
import WorkoutPage from './pages/WorkoutPage.jsx';

const router = createHashRouter([
	{
		path: '/',
		element: <WorkoutListPage />,
	},
	{
		path: '/workout/:id',
		element: <WorkoutPage />,
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
