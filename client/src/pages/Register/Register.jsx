import React from 'react';
import './Register.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';

const Register = (props) => 
            <div id='register'>
                <RegisterForm changePage={props.changePage} />
            </div>
       
export default Register;