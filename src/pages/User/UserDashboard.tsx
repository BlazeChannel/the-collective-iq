import React, { useEffect } from 'react'
import { RootState, AppDispatch } from '../state/store';
import { useSelector } from "react-redux";
import Profile from '../Profile/Profile';
import { useDispatch } from 'react-redux';
import { LoginSlice } from '../../state/authSlice';
import { getProfileData } from '../../state/profileSlice';

const UserDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userRole = useSelector((state: RootState) => state.auth.user);
  console.log("User from Dashboard", userRole);
  useEffect(() => {
    dispatch(getProfileData());  // Dispatches the profile fetching thunk
  }, [dispatch]);
  console.log("Profile State in Component:", userRole);

  if (!userRole) {
    return <div> Loading... </div>;
  }
  const { firstName,role, lastName } = userRole;

  return (
    <div className="dashboard-container">
    <h1>Welcome,  {role} {firstName},{lastName} !</h1>
  {/* <button  >
  check profile
  </button> */}
  <Profile />
  </div>
  )
}

export default UserDashboard
