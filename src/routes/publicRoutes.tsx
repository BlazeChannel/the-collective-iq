import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

export const publicRoutes = [
  {
    key: 'login', 
    path: '/', 
    component: <Login />
  },
  {
    key: 'register',
    path: '/register',
    component: <Register />
  },
  {
    key: 'logout',
    path: '/logout',
    component: <Login />
  },
];
