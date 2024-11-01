// TeamDashboard.tsx

import React from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { createTeam } from '../../state/teamSlice';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

// Define validation schema with Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Team name is required'),
});

interface Team {
    id: string;
    name: string;
    members: { id: string; name: string; role: string }[];
}

const TeamDashboard = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleCreateTeam = async (values: Omit<Team, 'id'>) => {
        try {
            await dispatch(createTeam(values)).unwrap();
            console.log("Team creation successful:", values);
        } catch (error) {
            console.error("Team creation failed:", error);
        }
    };

    return (
        <div>
            <h1>Create a New Team</h1>
            <Formik
                initialValues={{
                    name: "",
                    members: [], // Add member field array optionally
                }}
                validationSchema={validationSchema}
                onSubmit={handleCreateTeam}
            >
                <Form>
                    <label>Team Name</label>
                    <Field name="name" />
                    <ErrorMessage name="name" component="div" className="error" />

                    <button type="submit">Create Team</button>
                </Form>
            </Formik>
        </div>
    );
};

export default TeamDashboard;
