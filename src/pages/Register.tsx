import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RegisterSlice } from "../state/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (values: User) => {
    const formValue = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      role: values.role,
    };
    try {
      const result = await dispatch(RegisterSlice(formValue)).unwrap();
      if (result) {
        localStorage.setItem('banktoken', JSON.stringify(formValue) )
        console.log("register succesful", formValue);
        navigate("/login");
      }
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    role: Yup.string().required("Role is required"),
  });

  return (
    <div className="register-container">
      <h1>Create an Account</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "user",
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        <Form>
          <label>First Name</label>
          <Field name="firstName" />
          <ErrorMessage name="firstName" component="div" className="error" />

          <label>Last Name</label>
          <Field name="lastName" />
          <ErrorMessage name="lastName" component="div" className="error" />

          <label>Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" className="error" />

          <label>Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" className="error" />
          <label>Role</label>
          <Field as="select" name="role">
            <option value="user">User</option>
            <option value="bankManager">Bank Manager</option>
            <option value="superAdmin">Super Admin</option>
          </Field>
          <ErrorMessage name="role" component="div" />

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
