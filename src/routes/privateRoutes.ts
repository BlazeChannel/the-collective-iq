import { ROLES } from "./constants";
import Dashboard from "../pages/Dashboard";
import UserDashboard from "../pages/UserDashboard";

export const privateRoutes =[
    {
        key: 'dashboard',
        path: '/dashboard',
        component: Dashboard,
        allowedRoles: [ROLES.SUPER_ADMIN,ROLES.TEAM_LEADER,ROLES.TEAM_CAPTAIN ],
    },
    {
        key: 'userDashboard',
        path: '/user',
        component: UserDashboard,
        allowedRoles: [ROLES.USER],
    }
]