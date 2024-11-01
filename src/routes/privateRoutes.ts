import { ROLES } from "./constants";
import Dashboard from "../pages/Profile/Dashboard";
import UserDashboard from "../pages/User/UserDashboard";
import SuperAdminDashboard from "../pages/SuperAdmin/SuperAdminDashboard";
import Profile from "../pages/Profile/Profile";
import ProfileDetails from "../pages/Profile/ProfileDetails";
import UsersProfile from "../pages/SuperAdmin/UsersProfile";

export const privateRoutes =[
    {
        key: 'dashboard',
        path: '/dashboard',
        component: Dashboard,
        allowedRoles: [ROLES.TEAM_LEADER,ROLES.TEAM_CAPTAIN ],
    },
    {
        key: 'userDashboard',
        path: '/user',
        component: UserDashboard,
        allowedRoles: [ROLES.USER],
    },
    {
        key: 'superAdminDashboard',
        path: '/superadmin',
        component: SuperAdminDashboard,
        allowedRoles: [ROLES.SUPER_ADMIN]
    },
    {
        key: 'profile',
        path: '/profile',
        component: Profile,
        allowedRoles: [ROLES.TEAM_LEADER,ROLES.TEAM_CAPTAIN,ROLES.USER,ROLES.SUPER_ADMIN ],
      },
      {
        key: 'userDetails',
        path: "/user/details/:userId",
        component: ProfileDetails, UsersProfile,
        allowedRoles: [ROLES.SUPER_ADMIN ],
      }
]