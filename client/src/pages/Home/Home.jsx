import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './Home.css';

const Home = () => {
    return (
        <div>
            <Link to='/login'>
                <Button>Login</Button>
            </Link>
            or 
            <Link to='/register'>
                <Button>Register</Button>
            </Link>    
        </div>
    );
}

export default Home;