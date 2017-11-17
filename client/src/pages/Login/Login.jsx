import React from 'react';
import './Login.css';

const Login = () => {
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
                                    <label for="exampleInputEmail1">Username or Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Password </label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-sm btn-default">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;