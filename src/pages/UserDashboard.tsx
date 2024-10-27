import React from 'react'
import { RootState } from '../state/store';
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const userRole = useSelector((state: RootState) => state.auth.user);
  console.log("User from Dashboard", userRole);
  if (!userRole) {
    return <div> Loading... </div>;
  }
  const { firstName,role, lastName } = userRole;

  return (
    <div className="dashboard-container">
    <h1>Welcome,  {role} {firstName},{lastName} !</h1>
  
  </div>
  )
}

export default UserDashboard
