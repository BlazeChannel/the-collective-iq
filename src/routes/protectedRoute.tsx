import React from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import { RootState } from "../state/store";

interface ProtectedRouteProps {
    allowedRoles: string[]; 
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) =>{
    const user = useSelector((state: RootState) => state.auth.user);
    
    if (!user){
        return <Navigate to="/login" />;
    }
    if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

    return <>{children}</>;
}
export default ProtectedRoute