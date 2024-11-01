import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
//import reducer {LoginSlice, useSelector } from "../state/authSlice";

export const Dashboard = () => {
  const userRole = useSelector((state: RootState) => state.auth.user);

  console.log("User from Dashboard", userRole);
  if (!userRole) {
    return <div> Loading... </div>;
  }
  const { firstName,role, lastName } = userRole;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {role} {firstName},{lastName} !</h1>
      <p>Account balance: $5000</p>
    </div>
  );
};

export default Dashboard;
