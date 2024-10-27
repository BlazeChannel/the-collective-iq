import { lazy } from 'react'; // Imports React's `lazy` function for code splitting
import Login from '../pages/Login';
import Register from '../pages/Register';
export const publicRoutes = [
  {
    key: 'login', 
    path: '/login', 
    component: <Login />
  },
  {
    key: 'register',
    path: '/register',
    component: <Register /> 
  },
];
