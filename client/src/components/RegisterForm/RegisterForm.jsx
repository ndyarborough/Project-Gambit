import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import GetUserStats from '../../components/api-routes';
import './RegisterForm.css';

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

        this.getUserStats = new GetUserStats();
    }

    // Register User
    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.email && this.state.password && this.state.confirmPassword && this.state.platform && this.state.region && this.state.gamertag) {
            this.getUserStats.scrapeWebsite(this.state.platform, this.state.region, this.state.gamertag, this.state.email, this.state.password, this.state.confirmPassword);
        }else {
            console.log('Please fill out entire form!');
        }
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
                                <label htmlFor="name">Gamertag (case sensitive)</label>
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
                                <label htmlFor="Region">Region (PS4 and XBOX - Region: Global)</label>
                                <select
                                    name='region'
                                    onChange={this.handleInputChange}
                                    value={this.state.region}
                                    select='false'
                                    id='regionSelect'
                                    className="form-control" >
                                    <option>CN</option>
                                    <option>EU</option>
                                    <option>GLOBAL</option>
                                    <option>KR</option>
                                    <option>US</option>
                                </select>
                                <br />
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