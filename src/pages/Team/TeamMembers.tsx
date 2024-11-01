// TeamManagement.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { getTeams, updateTeam, deleteTeam } from '../../state/teamSlice';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

interface Member {
    id: string;
    name: string;
    role: string;
}

interface Team {
    id: string;
    name: string;
    members: Member[];
}

interface TeamManagementProps {
    userId: string;
}

const TeamManagement: React.FC<TeamManagementProps> = ({ userId }) => {
    const dispatch: AppDispatch = useDispatch();
    const { teams, isLoading, error } = useSelector((state: RootState) => state.team);

    useEffect(() => {
        dispatch(getTeams());
    }, [dispatch]);

    // Filter teams by current user's membership
    const userTeams = teams.filter((team) =>
        team.members.some((member) => member.id === userId)
    );

    const handleUpdateTeam = async (team: Team) => {
        await dispatch(updateTeam({ id: team.id, updateTeam: team }));
    };

    const handleDeleteMember = (teamId: string, memberId: string) => {
        const updatedTeam = userTeams.find((team) => team.id === teamId);
        if (updatedTeam) {
            updatedTeam.members = updatedTeam.members.filter((member) => member.id !== memberId);
            dispatch(updateTeam({ id: teamId, updateTeam: updatedTeam }));
        }
    };

    return (
        <div>
            <h2>Manage Your Teams</h2>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}

            {userTeams.map((team) => (
                <div key={team.id}>
                    <h3>{team.name}</h3>
                    <Formik
                        initialValues={{ members: team.members }}
                        onSubmit={(values) => handleUpdateTeam({ ...team, members: values.members })}
                    >
                        {({ values }) => (
                            <Form>
                                <FieldArray name="members">
                                    {({ push, remove }) => (
                                        <div>
                                            {values.members.map((member, index) => (
                                                <div key={member.id}>
                                                    <Field name={`members[${index}].name`} placeholder="Member Name" />
                                                    <Field as="select" name={`members[${index}].role`}>
                                                        <option value="Member">Member</option>
                                                        <option value="TeamCaptain">Team Captain</option>
                                                        <option value="TeamLeader">Team Leader</option>
                                                    </Field>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteMember(team.id, member.id)}
                                                    >
                                                        Delete Member
                                                    </button>
                                                    <ErrorMessage name={`members[${index}].name`} component="div" className="error" />
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => push({ id: `${Date.now()}`, name: '', role: 'Member' })}
                                            >
                                                Add Member
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                                <button type="submit">Save Changes</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            ))}
        </div>
    );
};

export default TeamManagement;
