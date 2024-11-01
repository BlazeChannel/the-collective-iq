import React, { useEffect } from "react";
import {
  getProfileData,
  setProfile,
  updateUser,
} from "../../state/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TeamDashboard from "../Team/TeamManagement";
import TeamList from "../Team/TeamList";
import TeamManagement from "../Team/TeamMembers";
import TeamContainer from "../Team/TeamContainer";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phone: { alternate_number: string; hotline: string };
  profession: string;
  social: string;
}

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const myProfile = useSelector(
    (state: RootState) => state.profileState.profile
  );

  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch]);
  //console.log("On Profile component", profileState);

  const handleUpdateUser = async (details: User) => {
    try {
      const result = await dispatch(updateUser(details)).unwrap();
      if (result) {
        console.log("Profile update successful", details);
        //navigate("/profile");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  useEffect(() => {
    if (myProfile) {
      setProfile(myProfile);
    }
  }, [myProfile]);
  return (
    <>
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-4"> Your Deatils </h3>
        {myProfile.map((user, index) => (
        <div key={(user.id, index)}>
          <div> {user["first-name"]} </div>
          <div>
            {" "}
            <b>{user["last-name"]}</b>{" "}
          </div>
          <i>{user["email"]}</i>
        </div>
      ))}
      </div>

      {/* <ul>
        {myProfile.map((user) => (
          <li key={user.id}>
            {user["first-name"]} - {user["first-name"]}
            <button
              onClick={() =>
                handleUpdateUser(user.id, { name: "Updated User" })
              }
            >
              Update
            </button>
          </li>
        ))}
      </ul> */}

      <Formik
        initialValues={{
          firstName: myProfile?.firstName || "",
          lastName: myProfile?.lastName || "",
          userName: myProfile?.userName || "",
          phone: {
            alternate_number: myProfile?.phone?.alternate_number || "",
            hotline: myProfile?.phone?.hotline || "",
          },
          profession: myProfile?.profession || "",
          social: myProfile?.social || "",
        }}
        enableReinitialize
        onSubmit={(values) => handleUpdateUser(values)}
      >
        {({ values }) => (
          <Form key={myProfile.id}>
            <label>First Name</label>
            <Field name="firstName" disabled />
            <ErrorMessage name="firstName" component="div" className="error" />

            <label>Last Name</label>
            <Field name="lastName" disabled />
            <ErrorMessage name="lastName" component="div" className="error" />

            <label>Username</label>
            <Field name="userName" type="text" />
            <ErrorMessage name="userName" component="div" className="error" />

            <label>Phone Number (Your Hotline)</label>
            <Field name="phone.hotline" type="tel" />
            <ErrorMessage
              name="phone.hotline"
              component="div"
              className="error"
            />

            <label>Alternate Number</label>
            <Field name="phone.alternate_number" type="tel" />
            <ErrorMessage
              name="phone.alternate_number"
              component="div"
              className="error"
            />

            <label>What's Your Occupation</label>
            <Field as="select" name="profession" />
            <ErrorMessage name="profession" component="div" />

            <label>Social Media Profile Links</label>
            <Field name="social" type="url" />
            <ErrorMessage name="social" component="div" className="error" />

            <button type="submit"> Update Profile </button>
          </Form>
        )}
      </Formik>

     
      <TeamList />
   <TeamContainer  userId={myProfile.id} />
    </>
  );
};

export default Profile;
