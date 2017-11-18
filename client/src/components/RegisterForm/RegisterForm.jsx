import React from 'react';
import { Container, Col, Row } from 'reactstrap';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            platform: '',
            region: '',
            gamertag: '',
        };
    }


    handleSubmit = (event) => {
        event.preventDefault();
        console.log(document.getElementById('exampleInputEmail1').value)
    }
    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <Container fluid>
                <Col md={{ size: 6, offset: 3 }}>
                    <Row>
                        <Col md='12'>
                            <form className="form-horizontal">
                                <h2>Register New User</h2>
                                <hr />
                                <label htmlFor="email">E-Mail Address</label>
                                <input
                                    name='email'
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="you@example.com"
                                    required autoFocus
                                />
                                <label htmlFor="password">Password</label>
                                <input
                                    name='password'
                                    onChange={this.handleInputChange}
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    required />
                                <label htmlFor="password">Confirm Password</label>
                                <input
                                    name='confirmPassword'
                                    onChange={this.handleInputChange}
                                    type="password"
                                    className="form-control"
                                    id="password-confirm"
                                    placeholder="Confirm Password"
                                    required />
                                <label htmlFor="name">Gamertag</label>
                                <input
                                    name='gamertag'
                                    onChange={this.handleInputChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="John Doe"
                                    required autoFocus
                                />
                                <label htmlFor="Platform">Platform</label>
                                <select
                                    name='platform'
                                    onChange={this.handleInputChange}
                                    value={this.state.platform}
                                    select='false'
                                    id='platformSelect'
                                    className="form-control"
                                >
                                    <option>XBOX</option>
                                    <option>PSN</option>
                                    <option>PC</option>
                                </select>
                                <label htmlFor="Region">Region</label>
                                <select
                                    name='region'
                                    onChange={this.handleInputChange}
                                    value={this.state.region}
                                    select='false'
                                    id='regionSelect'
                                    className="form-control" >
                                    <option>CN</option>
                                    <option>EU</option>
                                    <option>GBL</option>
                                    <option>KR</option>
                                    <option>US</option>
                                </select>
                                <button onClick={this.handleFormSubmit} type="submit" className="btn btn-primary register-button"><i className="fa fa-user-plus"></i> Register</button>
                            </form>
                        </Col>
                    </Row>
                </Col>
            </Container>
        )
    }
};

export default RegisterForm;