
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
    const usrid =  localStorage.getItem('user_id')
    const role =  localStorage.getItem('user_role')

    const [tempSprend, setTempSprend] = useState('');

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
        mechanikai: []
    });

    const [automobilis, setAuto] = useState({
        automobiliai: null
    });

    const fetchData = async () => {
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

        const api = await fetch("https://autoteksaitynai.azurewebsites.net/api/gidai/"+id,{
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        setData({
            gidai: await api.json(),
        });
    };

 
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

    const findMechanikas = (tid) => {
        if(""+usrid !== ""+tid && tid !==null && role !== "1"){
            history.push('/gidai')
        }
        var x = null;
        if(mechanikai?.mechanikai != null){
            mechanikai?.mechanikai.forEach(element => {
                if(element.id === tid){
                    x = element.name;
                }
            });
            return x;
        }
        else{
            return 'id:' + tid;
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify({'sprendimas': tempSprend}))
        fetch("https://autoteksaitynai.azurewebsites.net/api/gidai/" + id,{
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + token
            }),
            body: JSON.stringify({'sprendimas': tempSprend})

        });
    }

    async function deleteGidas(id){
        const apim = await fetch("https://autoteksaitynai.azurewebsites.net/api/gidai/" + id,{
            method: 'delete',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        history.push('/gidai')
    }


    return (
        <div>
            <NavBar />
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Redaktorius</div>

                        <div className="card-body">
                        {
                            state?.gidai?.map(data => (
                        <form onSubmit={handleSubmit} key={data?.id}>
                        <div className="row mb-3 ">    
                            <label className="col-md-4 col-form-label text-md-right">Autorius:</label>
                            <div className="col-md-6">
                            <input readOnly className="form-control"
                                type="text"
                                    value={findMechanikas(data.mechanikas_id)}
                                ></input>
                                </div>
                                
                        </div>
                        <div className="row mb-3">   
                            <label className="col-md-4 col-form-label text-md-right">Automobilis: 
                                </label>
                                <div className="col-md-6">
                            <input readOnly className="form-control"
                                type="text"
                                    value={findAuto(data.automobilis_id)}
                                ></input>
                                </div>
                            
                        </div>
                        <div className="row mb-3 ">  
                        <label className="col-md-4 col-form-label text-md-right">Simptomai:  
                               </label>
                               <div className="col-md-6">
                            <input readOnly className="form-control"
                                type="text"
                                    value={findSimptoma(data.simptomas_id)}
                                ></input>
                                </div>
                        </div>
                        <div className="row mb-3">   
                            <label className="col-md-4 col-form-label text-md-right">Problemos: 
                                </label>
                                <div className="col-md-6">
                            <input readOnly className="form-control"
                                type="text"
                                    value={findProblema(data.problema_id)}
                                ></input>
                                </div>
                            
                        </div>
                        <div className="row mb-3">   
                            <label className="col-md-4 col-form-label text-md-right">Sprendimas: 
                                </label>
                                <div className="col-md-6">
                            <textarea className="form-control"
                                type="text"
                                    required
                                    defaultValue={data.sprendimas}
                                    onChange={(e) => setTempSprend(e.target.value)}
                                ></textarea>
                                </div>
                            
                        </div>
                        <div className="row mb-0 ">
                            <div className="col-md-8 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    Patvirtinti
                                </button>
                                <button className='btn btn-danger offset-md-2' onClick={()=>deleteGidas(data.id)}>Ištrinti</button>

                            </div>
                        </div>
                    </form>
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
