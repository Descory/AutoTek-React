/* eslint-disable */
import ReactDOM from 'react-dom';
import React, { useState, useEffect} from "react";
import { useHistory, Link} from "react-router-dom";
import NavBar from '../NavBar';
import '../App.css'



function ProblemosSimptomai() {

    const history = useHistory();
    const token = localStorage.getItem('auth_token')
    const role = localStorage.getItem('user_role')
    const userid = localStorage.getItem('user_id')

    if(token == null){
        history.push('/prisijungimas')
    }
    if(role === "0"){
        history.push('/')
    }

    const [simptomas, setSimptomai] = useState({
        simptomai: null
    });

    const [problema, setProblemos] = useState({
        problemos: null
    });

    const fetchData = async () => {
        const apis = await fetch("https://autoteksaitynai.azurewebsites.net/api/simptomai",{
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        setSimptomai({
            simptomai: await apis.json(),
        });

        const apip = await fetch("https://autoteksaitynai.azurewebsites.net/api/problemos",{
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        setProblemos({
            problemos: await apip.json(),
        });

    };

    useEffect(() => {
        fetchData();
        }, []);

    if(simptomas?.simptomai?.status === "Token is Expired"){
        localStorage.removeItem(`auth_token`)
        localStorage.removeItem(`user_name`)
        localStorage.removeItem(`user_role`)
        localStorage.removeItem(`user_email`)
        history.push('/prisijungimas')
        return null;
    }

    async function deleteSimptomas(id){
        const apim = await fetch("https://autoteksaitynai.azurewebsites.net/api/simptomai/" + id,{
            method: 'delete',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        fetchData();
    }

    async function deleteProblema(id){
        const apim = await fetch("https://autoteksaitynai.azurewebsites.net/api/problemos/" + id,{
            method: 'delete',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        fetchData();
    }

    return (
        <div>
            <NavBar />
        <div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card overflow">
                        <div className="card-header">Simptomai</div>

                        <table className="table table-striped">
                        <thead>
                        <tr>
                        <th scope="row">Id</th>
                                    <th scope="row">Aprašymas</th>
                                    <th scope="row"></th>
                                </tr>
                                </thead>
                            <tbody>
                              {
                                simptomas?.simptomai?.map(data => (
                                    
                                    <tr key={data?.id}>
                                         <td >{data?.id}</td>
                                        <td>{data?.aprasymas}</td>
                                        <td ><button className='btn btn-danger clickas' onClick={()=>deleteSimptomas(data.id)}>Ištrinti</button></td>
                                </tr>
                                ))
                            }
                            </tbody>
                            </table>

                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card overflow">
                        <div className="card-header">Problemos</div>

                        <table className="table table-striped">
                        <thead>
                        <tr>
                        <th scope="col">Id</th>
                                    <th scope="col">Aprašymas</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                            <tbody>
                              {
                                problema?.problemos?.map(data => (
                                    
                                    <tr key={data?.id}>
                                         <td >{data?.id}</td>
                                        <td>{data?.aprasymas}</td>
                                        <td ><button className='btn btn-danger clickas' onClick={()=>deleteProblema(data.id)}>Ištrinti</button></td>
                                </tr>
                                ))
                            }
                            </tbody>
                            </table>

                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default ProblemosSimptomai;

if (document.getElementById('probsimpt')) {
    ReactDOM.render(<ProblemosSimptomai />, document.getElementById('probsimpt'));
}
