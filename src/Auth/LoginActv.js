import axios from 'axios';
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import {useHistory, withRouter } from "react-router-dom";
import NavBar from '../NavBar';

const LoginActv = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const token =  localStorage.getItem('auth_token')
    if(token != null){
        history.push('/gidai')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {email, password};
        axios.post(`https://autoteksaitynai.azurewebsites.net/api/prisijungimas`, user).then(res => {
            console.log(res.data.token)
            localStorage.setItem(`auth_token`, res.data[0][0].token)
            localStorage.setItem(`user_name`, res.data[0][1][0].name)
            localStorage.setItem(`user_role`, res.data[0][1][0].administratorius)
            localStorage.setItem(`user_email`, res.data[0][1][0].email)
            localStorage.setItem(`user_id`, res.data[0][1][0].id)
            history.push('/gidai')
         });

    }

    return (
            <div>
            <NavBar />
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Prisijungimas</div>

                        <div className="card-body">
                        <form onSubmit={handleSubmit}>

                        <div className="row mb-3">
                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">El. Paštas</label>

                            <div className="col-md-6">
                            <input className="form-control"
                                    type="text"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Slaptažodis</label>

                            <div className="col-md-6">
                            <input className="form-control"
                                type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></input>
                                </div>
                            </div>

                        <div className="row mb-0">
                            <div className="col-md-8 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    Prisijungti
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>

    );
}

export default withRouter(LoginActv);

if (document.getElementById('loginActv')) {
    ReactDOM.render(<LoginActv />, document.getElementById('loginActv'));
}
