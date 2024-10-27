import React from "react";
import { Formik, Form, Field,ErrorMessage } from 'formik'
import { useDispatch } from "react-redux";
import { LoginSlice } from '../state/authSlice'
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";


 interface User {
        email: string,
        password: string
    }

const Login = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();   
    const [loginError, setLoginError] = React.useState('');

    const handleLogin = async (values: User) => {
        try{
            const result= await dispatch(LoginSlice(values)).unwrap();
            if (result){
                localStorage.setItem('banktoken', JSON.stringify({email: values.email, role: result.role,  token: result.token}) );
                console.log('login succesful', result);
                console.log('Logged in as a', result.role);
                //navigate('/dashboard');
                if(result.role === 'user')
                    { navigate('/user')}
                else{ navigate('/dashboard')}
            }  
            else{
                setLoginError('Invalid email or password');
            }    
           
        } catch (error) {
        console.error('Invalid email or password. Login failed:', error);
        
      }
    }
    const validationSchema = Yup.object({
        email: Yup.string().email( 'Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
    });

    return(
        <div className="login-container" >
            <h1> Login</h1>
            <Formik 
            initialValues={{ email:'', password:''}}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
            >

            <Form >
            <label htmlFor="email"> Email </label>
            <Field id="email" name='email' type='email' />
            <ErrorMessage name="email" component="div" className="error" />

            <label  htmlFor="password" > Password </label>
            <Field id="password" name='password' type='password' />
            <ErrorMessage name="password" component="div" className="error"/>

            {loginError && <div className="error">{loginError}</div>}

            <button type="submit"   > Login</button>
            </Form>
            </Formik>
        </div>
    )
}

export default Login