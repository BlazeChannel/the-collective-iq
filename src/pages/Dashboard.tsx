import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import BankManager from './BankManager'
import SuperAdminDashboard from './SuperAdminDashboard'
import UserDasboard from './UserDashboard'
//import { userSelector } from '../state/authSlice'

export const Dashboard = () => {
  const userRole = useSelector((state: RootState) => state.auth.user)
  //const { firstName, email, role } =useSelector( userSelector)
  console.log( 'User', userRole)
  if (!userRole){
    return <div> Loading... </div>
  } 
  const { firstName, email, role} =userRole

  return(
        <div className="dashboard-container">
        <h1>Welcome, {firstName}!</h1>
        <p>Account balance: $5000</p>
        </div>
        
    )
} 
// return(
//     <div className="dashboard-container">
//     <h1>Welcome, {firstName}!</h1>
//     <p>Account balance: $5000</p>
//     </div>
    
// )
    {/* You can dynamically fetch this data later */}
{/* 
    switch (userRole) {
      case 'bankManager':
        return  <BankManager/> ; 
        
        case 'superAdmin' :
          return <SuperAdminDashboard/> ;
    
      case 'user' :
       return   <UserDasboard />; */}


            
          
export default Dashboard

