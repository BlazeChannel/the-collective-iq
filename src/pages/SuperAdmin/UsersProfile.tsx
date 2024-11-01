// import React, { useEffect, useState } from "react";
// import { getProfileData } from "../../state/profileSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../state/store";
// import ProfileDetails from "./ProfileDetails";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const profileState = useSelector(
//     (state: RootState) => state.profileState.profile
//   );
//   const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(getProfileData());
//   }, [dispatch]);
//   console.log(profileState.firstName)
//   const handleUserClick = (userId: string) => {
//     //setSelectedUserId(userId);
//     console.log("Navigating to user ID:", userId);
//     navigate(`/user/details/${userId}`);
    
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Available Users</h1>
//       <div>
//         <p> Count of Available users: <span> {profileState.length} </span></p>        
//       </div>
//       {profileState.map((user, index) => (
//   <div key={user.id, index}> {/* Ensure user.id exists here */}
//     <button
//       onClick={() => handleUserClick(user.id)}
//       className="text-blue-500 hover:underline"
//     >
//       {/* {user["first-name"]} {user["last-name"]} */}
//       {user.email}
//     </button>
//   </div>
// ))}


//       {selectedUserId && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-80">
//             <ProfileDetails userId={selectedUserId} />
//             <button
//               onClick={() => setSelectedUserId(null)}
//               className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React from 'react'

const UsersProfile = () => {
  return (
    <div>
      
    </div>
  )
}

export default UsersProfile
