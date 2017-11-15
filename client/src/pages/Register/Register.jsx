import React from 'react';
import './Register.css';

const Register = () => {
    return (
        <form className="form-horizontal" method="POST" action="/register">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h2>Register New User</h2>
                    <hr />
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 field-label-responsive">
                    <label for="email">E-Mail Address</label>
                </div>
                <div className="col-md-6">
                    <div className="form-group">

                        <input type="text" name="email" className="form-control" id="email"
                            placeholder="you@example.com" required autofocus />
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="form-control-feedback">
                        <span className="text-danger align-middle">
                        </span>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-md-3 field-label-responsive">
                    <label for="password">Password</label>
                </div>
                <div className="col-md-6">
                    <div className="form-group has-danger">

                        <input type="password" name="password" className="form-control" id="password"
                            placeholder="Password" required />
                    </div>
                </div>


                <div className="col-md-3">
                    <div className="form-control-feedback">
                        <span className="text-danger align-middle">

                        </span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 field-label-responsive">
                    <label for="password">Confirm Password</label>
                </div>
                <div className="col-md-6">
                    <div className="form-group">

                        <input type="password" name="password-confirmation" className="form-control"
                            id="password-confirm" placeholder="Confirm Password" required />
                    </div>
                </div>

            </div>

            <div className="row">
                <div className="col-md-3 field-label-responsive">
                    <label for="name">Gamertag</label>
                </div>
                <div className="col-md-6">
                    <div className="form-group">

                        <input type="text" name="Gamertag" className="form-control" id="Gametag"
                            placeholder="John Doe" required autofocus />

                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-control-feedback">
                        <span className="text-danger align-middle">
                        </span>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 field-label-responsive">
                    <label for="Platform">platform</label>
                </div>
                <div className="col-md-6">
                    <div className="form-group">

                        <select select className="form-control" >
                            <option>Xbox</option>
                            <option>Psn</option>
                            <option>Pc</option>
                        </select>


                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <button type="submit" className="btn btn-success"><i className="fa fa-user-plus"></i> Register</button>
                </div>
            </div>
        </form>
    )
}

export default Register;