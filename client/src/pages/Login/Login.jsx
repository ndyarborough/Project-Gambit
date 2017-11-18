import React from 'react';
import './Login.css';
import GetUserStats from '../../components/api-routes'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.userLogin = new GetUserStats();
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
        console.log(this.state)
        if (this.state.email && this.state.password) {
            // Login User
            this.userLogin.login(this.state.email, this.state.password);
        } else {
            console.log('Please fill out entire form!')
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">
                                    <strong>Sign In </strong>
                                </h3>
                            </div>
                            <div className="panel-body">

                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email</label>
                                        <input name='email' type="email" onChange={this.handleInputChange} className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input name='password' type="password" onChange={this.handleInputChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <button type="submit" onClick={this.handleFormSubmit} className="btn btn-sm btn-primary btn-default">Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
};

export default Login;