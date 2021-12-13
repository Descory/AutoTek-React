/* eslint-disable */
import ReactDOM from 'react-dom';
import React, { useState, useEffect} from "react";
import { useHistory, Link} from "react-router-dom";
import NavBar from '../NavBar';
import '../App.css'



function GidaiList() {

    const history = useHistory();
    const token = localStorage.getItem('auth_token')
    const role = localStorage.getItem('user_role')
    const userid = localStorage.getItem('user_id')

    if(token == null){
        history.push('/prisijungimas')
    }

    const [state, setData] = useState({
        gidai: null
    });

    const [simptomas, setSimptomai] = useState({
        simptomai: null
    });

    const [problema, setProblemos] = useState({
        problemos: null
    });

    const [mechanikai, setMechanikai] = useState({
        mechanikai: null
    });

    const [automobilis, setAuto] = useState({
        automobiliai: null
    });

    const fetchData = async () => {
        const api = await fetch("https://autoteksaitynai.azurewebsites.net/api/gidai",{
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        setData({
            gidai: await api.json(),
        });

        const apia = await fetch("https://autoteksaitynai.azurewebsites.net/api/automobiliai",{
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        setAuto({
            automobiliai: await apia.json(),
        });

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

        const apim = await fetch("https://autoteksaitynai.azurewebsites.net/api/mechanikai",{
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        setMechanikai({
            mechanikai: await apim.json(),
        });
    };

    useEffect(() => {
        fetchData();
        }, []);

    if(state?.gidai?.status === "Token is Expired"){
        localStorage.removeItem(`auth_token`)
        localStorage.removeItem(`user_name`)
        localStorage.removeItem(`user_role`)
        localStorage.removeItem(`user_email`)
        history.push('/prisijungimas')
        return null;
    }

    const findProblema = (id) => {
        var x = null;
        if(problema?.problemos != null){
            problema?.problemos.forEach(element => {
                if(element.id === id){
                    x = element.aprasymas;
                }
            });
            return x;
        }
        else{
            return 'id:' + id;
        }
    }
    const findSimptoma = (id) => {
        var x = null;
        if(simptomas?.simptomai != null){
            simptomas?.simptomai.forEach(element => {
                if(element.id === id){
                    x = element.aprasymas;
                }
            });
            return x;
        }
        else{
            return 'id:' + id;
        }
    }

    const findMechanikas = (id) => {
        var x = null;
        if(mechanikai?.mechanikai != null){
            mechanikai?.mechanikai.forEach(element => {
                if(element.id === id){
                    x = element.name;
                }
            });
            return x;
        }
        else{
            return 'id:' + id;
        }
    }

    const findAuto = (id) => {
        var x = null;
        if(automobilis?.automobiliai != null){
            automobilis?.automobiliai.forEach(element => {
                if(element.id === id){
                    x = element.pavadinimas + " " + element.marke;
                }
            });
            return x;
        }
        else{
            return 'id:' + id;
        }
    }

    async function deleteGidas(id){
        const apim = await fetch("https://autoteksaitynai.azurewebsites.net/api/gidai/" + id,{
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
                        <div className="card-header">Gidai
                        
                        </div>
                        <table className="table table-striped">
                        <thead>
                        <tr>
                        <th scope="col">Automobilis</th>
                                    <th scope="col">Simptomai</th>
                                    <th scope="col">Problema</th>
                                    <th scope="col">Mechanikas</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                            <tbody>
                              {
                                state?.gidai?.map(gidas => (
                                    
                                    <tr key={gidas?.id}>
                                         {<td >{findAuto(gidas?.automobilis_id)}</td>}
                                        {<td>{findSimptoma(gidas?.simptomas_id)}</td>}
                                        {<td >{findProblema(gidas?.problema_id)}</td>}
                                        {<td >{findMechanikas(gidas?.mechanikas_id)}</td>}
                                        <td ><Link to={'/gidai/'+gidas.id}><button className='btn btn-dark'>Atidaryti</button></Link></td>
                                        {   
                                            (role === "1" || "" + gidas?.mechanikas_id === userid)
                                            ? (<>
                                            <td ><Link to={'/gidai/'+gidas.id+'/koreguoti'}><button className='btn btn-primary'>Koreguoti</button></Link></td>
                                             <td ><button className='btn btn-danger' onClick={()=>deleteGidas(gidas.id)}>Ištrinti</button></td>
                                             </>)
                                            :<></>

                                        }
                                    



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

export default GidaiList;

if (document.getElementById('gidaiList')) {
    ReactDOM.render(<GidaiList />, document.getElementById('gidaiList'));
}
