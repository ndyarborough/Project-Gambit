import React from 'react';
import './Register.css';

import GetUserStats from '../../components/api-routes.js'

class Register extends React.Component {
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

        // this.handleChange = this.handleChange.bind(this);
        this.getUserStats = new GetUserStats();
    }

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.email && this.state.password && this.state.confirmPassword && this.state.platform && this.state.region && this.state.gamertag) {
            // Get UserStats
            this.getUserStats.scrapeWebsite(this.state.platform, this.state.region, this.state.value);
            console.log(this.getUserStats);
        } else {
            console.log('Please fill out entire form!')
        }
    };

    render() {
        console.log('render');
        return (
            <form className="form-horizontal">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h2>Register New User</h2>
                        <hr />
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-group">
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
                            <div className="form-control-feedback">
                                <span className="text-danger align-middle">
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-group has-danger">
                            <label htmlFor="password">Password</label>
                            <input
                                name='password'
                                onChange={this.handleInputChange}
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                required />
                            <div className="form-control-feedback">
                                <span className="text-danger align-middle">

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                name='confirmPassword'
                                onChange={this.handleInputChange}
                                type="password"
                                className="form-control"
                                id="password-confirm"
                                placeholder="Confirm Password"
                                required />
                        </div>
                    </div>

                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Gamertag</label>
                            <input
                                name='gamertag'
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="John Doe"
                                required autoFocus
                            />
                            <div className="form-control-feedback">
                                <span className="text-danger">
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="Platform">Platform</label>
                            <select
                                name='platform'
                                onChange={this.handleInputChange}
                                select='false'
                                className="form-control"
                            >
                                <option>XBOX</option>
                                <option>PSN</option>
                                <option>PC</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="Region">Region</label>
                            <select
                                name='region'
                                onChange={this.handleInputChange}
                                select='false'
                                className="form-control" >
                                <option>CN</option>
                                <option>EU</option>
                                <option>GBL</option>
                                <option>KR</option>
                                <option>US</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <button onSubmit={this.handleFormSubmit} type="submit" className="btn btn-primary register-button"><i className="fa fa-user-plus"></i> Register</button>
                    </div>
                </div>
            </form>
        )
    }
};

export default Register;