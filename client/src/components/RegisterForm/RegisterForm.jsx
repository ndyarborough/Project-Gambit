import React from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './RegisterForm.css';
import { createNewUser } from '../../api';


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            platform: 'xbox',
            region: 'global',
            gamertag: '',
            regionOptions: ['Global'],
        };
    }

    // Register User
    handleFormSubmit = (event) => {
        // event.preventDefault();
        if (this.state.email) {
            createNewUser(this.state.platform, this.state.region, this.state.gamertag, this.state.email, this.state.password, this.state.confirmPassword);
        }else {
            console.log(this.state)
            console.log('Please fill out entire form!');
        }
    }
    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        if (name === 'platform') {
            console.log('handleRegionChange')
            console.log(value)
            this.handleRegionChange(value);            
        }        
    };

    // Changing state of region dropdown
    handleRegionChange = platform => {
        if (platform === 'PC') {
            console.log('set state region options')
            this.setState({
                regionOptions: ['CN', 'EU', 'US', 'KR']
            });
        }   
        else if (platform === 'XBOX' || platform ==='PSN') {
            this.setState({
                regionOptions: ['Global']
            });
        }
    }

    render() {
        return (
            <Container fluid>
                <Col md={{ size: 6, offset: 3 }}>
                    <Row>
                        <Col md='12'>
                            <form className="form-horizontal">
                                <h2>Register New User</h2>
                                <hr />
                                <label htmlFor="email">Email Address</label>
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
                                    onChange={this.handleRegionChange}
                                    select='false'
                                    id='regionSelect'
                                    className="form-control" >
                                  {
                                    this.state.regionOptions.map((region) => <option key={region}>{region}</option>)
                                   }
                                </select>
                                <br />
                                <Link to='login' onClick={this.handleFormSubmit}>
                                    <Button color="primary">Register</Button>
                                </Link>
                            </form>
                        </Col>
                    </Row>
                </Col>
            </Container>
        )
    }
};

export default RegisterForm;