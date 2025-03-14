import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sessions from './pages/Sessions';
import MyReservations from './pages/MyReservations';
import CreateSession from './pages/CreateSession';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/sessions',
    element: <Sessions />,
  },
  {
    path: '/my-reservations',
    element: <ProtectedRoute role="member"><MyReservations /></ProtectedRoute>,
  },
  {
    path: '/create-session',
    element: <ProtectedRoute role="trainer"><CreateSession /></ProtectedRoute>,
  },
]);

export default router;