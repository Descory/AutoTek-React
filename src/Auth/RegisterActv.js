import axios from 'axios';
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import {useHistory, withRouter} from "react-router-dom";
import NavBar from '../NavBar';


const RegisterActv = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setConfirmPass] = useState('');
    const history = useHistory();

    const token =  localStorage.getItem('auth_token')
    if(token != null){
        history.push('/gidai')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            "name": name,
            "email": email,
            "password": password,
            "password_confirmation": password_confirmation
        };
            axios.post(`https://autoteksaitynai.azurewebsites.net/api/registracija`, user).then(res => {
                localStorage.setItem(`auth_token`, res.data.token)
                localStorage.setItem(`user_name`, res.data.user.name)
                localStorage.setItem(`user_role`, res.data.user.administratorius)
                localStorage.setItem(`user_email`, res.data.user.email)
                localStorage.setItem(`user_id`, res.data.user.id)
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
                        <div className="card-header">Registracija</div>

                        <div className="card-body">
                        <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Vardas</label>

                            <div className="col-md-6">
                            <input className="form-control"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

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

                            <div className="row mb-3">
                            <label htmlFor="password_confirmation" className="col-md-4 col-form-label text-md-right">Slaptažodžio patvirtinimas</label>

                            <div className="col-md-6">
                            <input className="form-control"
                                type="password"
                                    required
                                    value={password_confirmation}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                ></input>
                                </div>
                            </div>

                        <div className="row mb-0">
                            <div className="col-md-8 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    Registruotis
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

export default withRouter(RegisterActv);

if (document.getElementById('registerActv')) {
    ReactDOM.render(<RegisterActv />, document.getElementById('registerActv'));
}
