
import React, {  useState} from "react";
import { useHistory} from "react-router-dom";
import NavBar from '../NavBar';
import '../App.css'
import { DropDownList } from "@progress/kendo-react-dropdowns";
/* eslint-disable */
function Gidas(){
    const history = useHistory();
    const token =  localStorage.getItem('auth_token')

    const kurs = [
        {
            kuras: "benzinas",
        },
        {
            kuras: "dyzelinas"
        },
        {
            kuras: "elektra"
        }]

    const [temppav, setPav] = useState('');
    const [tempmark, setMarke] = useState('');
    const [tempProb, setTempProb] = useState({
        value: {
            kuras: "benzinas"
        }
    });

    const [automobilis, setAuto] = useState({
        automobiliai: []
    });

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

        //console.log(JSON.stringify({'pavadinimas': temppav,  "marke":tempmark, "kuras":tempProb.kuras}))
        const ww = await fetch("https://autoteksaitynai.azurewebsites.net/api/automobiliai",{
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + token
            }),
            body: JSON.stringify({'pavadinimas': temppav,  "marke":tempmark, "kuras":tempProb.kuras})

        });
        history.push('/automobiliai')
    }

    return (
        <div>
            <NavBar />
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Naujas Automobilis</div>

                        <div className="card-body">
                        <form onSubmit={handleSubmit}>
                        <div className="row mb-3 ">    
                            <label className="col-md-4 col-form-label text-md-right">Pavadinimas:</label>
                            <div className="col-md-6">
                            <input className="form-control"
                                type="text"
                                    value={temppav}
                                    onChange={(e) => setPav(e.target.value)}
                                    required
                                ></input>
                                </div>
                                
                        </div>
                        <div className="row mb-3 ">    
                            <label className="col-md-4 col-form-label text-md-right">Marke:</label>
                            <div className="col-md-6">
                            <input className="form-control"
                                type="text"
                                required
                                    value={tempmark}
                                    onChange={(e) => setMarke(e.target.value)}

                                ></input>
                                </div>
                                
                        </div>
                        <div className="row mb-3">   
                            <label className="col-md-4 col-form-label text-md-right">Kuras: 
                                </label>
                                <div className="col-md-6">
                                <DropDownList
                                required
                                        data={kurs}
                                        textField={"kuras"}
                                        dataItemKey="kuras"
                                        value={tempProb}
                                        onChange={(e) =>setTempProb(e.target.value)}
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
