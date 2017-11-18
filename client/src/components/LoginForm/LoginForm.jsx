import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import './LoginForm.css';
import logo from '../../imgs/Project-Gambit-Logo.png';

const LoginForm = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(document.getElementById('exampleInputEmail1').value)
    }

    return (
        <Container fluid>
                <Col md={{ size: 6, offset: 3 }}>
                    <Row className='loginBox' >
                        <Col md='4'>
                            <img src={logo} alt='logo' />
                        </Col>
                        <Col md='8'>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Username or Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                    <label htmlFor="exampleInputPassword1">Password </label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    <button onClick={handleSubmit} type="submit" className="btn btn-sm btn-default">Sign in</button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Col>
            </Container>
    )
};

export default LoginForm;