import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { getTeams } from '../../state/teamSlice';

const TeamList = () => {
     const dispatch: AppDispatch = useDispatch();
   const { teams, isLoading, error } = useSelector((state: RootState) => state.team);

   useEffect(() => {
    dispatch(getTeams());
    console.log('Fetching teams...');
}, [dispatch]);

   

//    if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

  return (
    <>
    <h2>Team List</h2>
    {teams.length > 0 ? (
        teams.map((team) => (
            <div key={team.id}>{team.name}</div>
        ))
    ) : (
        <div>No teams available</div>
    )}
</>
  );
};

export default TeamList;
