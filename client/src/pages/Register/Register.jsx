import React from 'react';
import './Register.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import Navigation from '../../components/Navigation';
const Register = (props) => 
            <div id='register'>
                <Navigation links={['Register', 'Login']} />
                <RegisterForm />
            </div>
       
export default Register;