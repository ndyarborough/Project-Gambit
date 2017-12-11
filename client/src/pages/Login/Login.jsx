import React from 'react';
import './Login.css';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import Navigation from '../../components/Navigation';

const Login = () => {
    return (
        <div id='login'>
            <Navigation links={['Register', 'Login']} />
            <LoginForm />
        </div>
    )
};

export default Login;