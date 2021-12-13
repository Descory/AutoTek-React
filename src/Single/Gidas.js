
import React, { useEffect, useState} from "react";
import { useHistory} from "react-router-dom";
import NavBar from '../NavBar';
import { useParams } from "react-router";
import '../App.css'
/* eslint-disable */
function Gidas(){
    const history = useHistory();
    const { id } = useParams();
    const token =  localStorage.getItem('auth_token')
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
        const api = await fetch("https://autoteksaitynai.azurewebsites.net/api/gidai/"+id,{
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
                    if(element.kuras === "dyzelinas"){
                        x += " (d)"
                    }
                    else if(element.kuras === "benzinas"){
                        x += " (b)"
                    }
                    else {
                        x += " (e)"
                    }
                }
            });
            return x;
        }
        else{
            return 'id:' + id;
        }
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

    return (
        <div className="sb-nav-fixed">
            <NavBar />
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Gidas 
                        </div>
                        <div className="card-body">
                           
                            {
                            state?.gidai?.map(data => (
                                
                                <div key={data?.id}>
                                <div className="row mb-3">
                                <label className="col-md-4 col-form-label text-md-right">Autorius:
                                    <label className='paddingLeft'>
                                        <label >{findMechanikas(data?.mechanikas_id)} </label>
                                    </label>
                                </label>
                                </div>
                                <div className="row mb-3">
                                <label className="col-md-4 col-form-label text-md-right">Automobilis:
                                <label className='paddingLeft'>
                                    <label >{findAuto(data?.automobilis_id)} </label>
                                </label>
                            </label>
                            </div>
                            <div className="row mb-3">
                            <label className="col-md-4 col-form-label text-md-right">Simptomai:
                                <label className='paddingLeft'>
                                    <label >{findSimptoma(data?.simptomas_id)} </label>
                                </label>
                            </label>
                            </div>
                            <div className="row mb-3">
                            <label className="col-md-4 col-form-label text-md-right">Problema:
                                <label className='paddingLeft'>
                                    <label >{findProblema(data?.problema_id)} </label>
                                </label>
                            </label>
                            <div className="container">
                            <div className="row justify-content-center">
               
                    <div className="card">
                            <label className="col-md-4 col-form-label text-md-right">Sprendimas:
                            <div>
                                <label className='paddingLeft'>
                                    <label >{data?.sprendimas} </label>
                                </label>
                                </div>
                            </label>
                            
                            </div>
                            </div></div></div></div>
                             ))}
                             
                </div>                 
            </div>
        </div>
        </div>
        </div>
        </div>
    );
}

export default Gidas;
