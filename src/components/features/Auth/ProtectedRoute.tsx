import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../../state/store";

interface ProtectedRouteProps {
    role: 'user' | 'teamLeader' | 'superAdmin' | 'teamCaptain'
    children : React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role,children }) =>{
    const user = useSelector((state: RootState) => state.auth.user);
    
    if (!user){
        return <Navigate to="/unauthorised" />
    }
      return children ;
}
export default ProtectedRoute