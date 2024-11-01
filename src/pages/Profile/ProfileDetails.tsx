import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from '../../state/profileSlice';
import { AppDispatch, RootState } from '../../state/store';

const ProfileDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams<{ userId: string }>();
console.log("Fetched userId from params:", userId); // Debugging

  const selectedUser = useSelector((state: RootState) => state.profileState.profile).find((user)=> user.id === userId);
  const isLoading = useSelector((state: RootState) => state.profileState.isLoading);
  const error = useSelector((state: RootState) => state.profileState.error);

  useEffect(() => {
    if (userId) {
        console.log("Fetching details for userId:", userId); 
        dispatch(getProfileById(userId));
        console.log(userId)
      }
  }, [dispatch, userId]);

  if (!selectedUser) {
    return <div className="text-gray-500">User not found.</div>;
  }
  console.log("User details:", selectedUser);
  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
        <div>
          <h2>User Details</h2>
          <p>Name: {selectedUser['first-name']} {selectedUser['last-name']}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Role: {selectedUser.role}</p>
        </div>
    </div>
  );
};

export default ProfileDetails;
