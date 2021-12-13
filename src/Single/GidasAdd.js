/* eslint-disable */
import React, { useEffect, useState} from "react";
import { useHistory} from "react-router-dom";
import NavBar from '../NavBar';
import { useParams } from "react-router";
import '../App.css'
import { DropDownList } from "@progress/kendo-react-dropdowns";

function Gidas(){
    const history = useHistory();
    const { id } = useParams();
    const token =  localStorage.getItem('auth_token')
    const username =  localStorage.getItem('user_name')
    const userid =  localStorage.getItem('user_id')

    const [tempSprend, setTempSprend] = useState('');
    const [tempAuto, setTempAuto] = useState('');
    const [tempProb, setTempProb] = useState('');
    const [tempSimpt, setTempSimt] = useState('');
    const [descr, setDescription] = useState('');

    const prosim = [
        {
            id: "simptomas",
        },
        {
            id: "problema"
        }]

    const [prosimpt, setPS] = useState({
            id: []
    });

    const [automobilis, setAuto] = useState({
        automobiliai: []
    });

    const [simptomas, setSimptomai] = useState({
        simptomai: []
    });

    const [problema, setProblemos] = useState({
        problemos: []
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


    useEffect(() => {
        fetchData();
        }, []);

    if(automobilis?.automobiliai?.status === "Token is Expired"){
        localStorage.removeItem(`auth_token`)
        localStorage.removeItem(`user_name`)
        localStorage.removeItem(`user_role`)
        localStorage.removeItem(`user_email`)
        history.push('/prisijungimas')
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({'automobilis_id': tempAuto.id,  "simptomas_id":tempSimpt.id, "problema_id":tempProb.id, 'sprendimas': tempSprend }))
        const ww = await fetch("https://autoteksaitynai.azurewebsites.net/api/gidai",{
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + token
            }),
            body: JSON.stringify({'automobilis_id': tempAuto.id,  "simptomas_id":tempSimpt.id, "problema_id":tempProb.id, 'sprendimas': tempSprend })

        });
        history.push('/gidai')
    }

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        console.log()
       
        var x = ""
        if(prosimpt.id === "problema"){
            x = "https://autoteksaitynai.azurewebsites.net/api/problemos"
        }
        else{
            x = "https://autoteksaitynai.azurewebsites.net/api/simptomai"
        }
        const ww = await fetch(x ,{
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + token
            }),
            body: JSON.stringify({"aprasymas":descr})

        });
        fetchData();
    }
    return (
        <div>
            <NavBar />
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Naujas Gidas</div>

                        <div className="card-body">
                        <form onSubmit={handleSubmit}>
                        <div className="row mb-3 ">    
                            <label className="col-md-4 col-form-label text-md-right">Autorius:</label>
                            <div className="col-md-6">
                            <input readOnly className="form-control"
                                type="text"
                                    value={username}
                                ></input>
                                </div>
                                
                        </div>
                        <div className="row mb-3">   
                            <label className="col-md-4 col-form-label text-md-right">Automobilis: 
                                </label>
                                <div className="col-md-6">
                                <DropDownList
                                        data={automobilis?.automobiliai}
                                        textField={"pavadinimas"}
                                        dataItemKey="id"
                                        value={tempAuto.value}
                                        onChange={(e) =>setTempAuto(e.target.value)}
                                    />
                                </div>
                            
                        </div>
                        <div className="row mb-3">   
                            <label className="col-md-4 col-form-label text-md-right">Simptomai: 
                                </label>
                                <div className="col-md-6">
                                  
                                <DropDownList
                                        data={simptomas?.simptomai}
                                        textField={"aprasymas"}
                                        dataItemKey="id"
                                        value={tempSimpt.value}
                                        onChange={(e) =>setTempSimt(e.target.value)}
                                    />
                                </div>
                                
                            
                        </div>
                        <div className="row mb-3">   
                            <label className="col-md-4 col-form-label text-md-right">Problemos: 
                                </label>
                                <div className="col-md-6">
                                <DropDownList
                                        data={problema?.problemos}
                                        textField={"aprasymas"}
                                        dataItemKey="id"
                                        value={tempProb.value}
                                        onChange={(e) =>setTempProb(e.target.value)}
                                    />
                                </div>
                            
                        </div>
                        <div className="row mb-3">   
                            <label className="col-md-4 col-form-label text-md-right">Sprendimas: 
                                </label>
                                <div className="col-md-6">
                                <textarea className="form-control"
                                type="text"
                                required
                                    onChange={(e) => setTempSprend(e.target.value)}
                                ></textarea>
                                </div>
                            
                        </div>
                        <div className="row mb-0 ">
                            <div className="col-md-8 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    Patvirtinti
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Pridėti simptomą/problemą</div>

                        <div className="card-body">
                        <form onSubmit={handleSubmit1}>
                        <div className="row mb-3">   
                            <label className="col-md-4 col-form-label text-md-right">Problema / Sprendimas: 
                                </label>
                                <div className="col-md-6">
                                <DropDownList
                                        data={prosim}
                                        required
                                        textField="id"
                                        dataItemKey="id"
                                        value={prosimpt.value}
                                        onChange={(e) =>setPS(e.target.value)}
                                    />
                                </div>
                            
                        </div>
                        
                        
                        <div className="row mb-3">
                            <label className="col-md-4 col-form-label text-md-right">Aprašymas</label>

                            <div className="col-md-6">
                            <input className="form-control"
                                    type="text"
                                    required
                                    value={descr}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mb-0 ">
                            <div className="col-md-8 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    Patvirtinti
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

export default Gidas;
