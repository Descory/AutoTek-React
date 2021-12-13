import ReactDOM from 'react-dom';
import React, { useEffect, useState} from "react";
import { useHistory, Link} from "react-router-dom";
import NavBar from '../NavBar';
import { useParams } from "react-router";
import '../App.css'
/* eslint-disable */
function MechanikasGidai(){

    const [state, setData] = useState({
        gidai: null
    });


    const { id } = useParams();

    const history = useHistory();
    const token = localStorage.getItem('auth_token')
    

    if(token == null){
        history.push('/prisijungimas')
    }

    

    const fetchData = async () => {
        const api = await fetch("https://autoteksaitynai.azurewebsites.net/api/mechanikai/"+ id+"/gidai",{
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        setData({
            gidai: await api.json(),
        });
        

        
    };


    useEffect(() => {
        fetchData();
        }, []);

    if(state?.mechanikas?.status === "Token is Expired"){
        localStorage.removeItem(`auth_token`)
        localStorage.removeItem(`user_name`)
        localStorage.removeItem(`user_role`)
        localStorage.removeItem(`user_email`)
        localStorage.removeItem(`user_id`)
        history.push('/prisijungimas')
        return null;
    }

    console.log(state?.gidai?.message)

    const findMechanikas = () =>{
        return "/mechanikai/"+id
    }

    if(state?.gidai?.message != undefined){
        return(
            <div className="sb-nav-fixed">
            <NavBar />
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Mechaniko Gidai
                        </div>
                        <a className="nav-link" href={findMechanikas()}>Mechanikas</a>
                        <div className="card-body">
                                <div className="row mb-3">
                            <label className="col-md-4 col-form-label text-md-right">
                                <label className='paddingLeft'>
                                <label >Gidų nerasta!</label>
                                 </label>
                             </label>
                             </div>
               
            </div>
        </div>
        </div>
        </div>
        </div></div>

        );
    }
    else
        return (
        <div className="sb-nav-fixed">
            <NavBar />
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Mechaniko Gidai
                        </div>
                        <a className="nav-link" href={findMechanikas()}>Mechanikas</a>
                        <div className="card-body">
                        {
                            state?.gidai?.map(data => (
                                <div className="row mb-3" key={data?.id}>
                                    <div className="card-body">
                            <   label className="col-md-4 col-form-label text-md-right">
                                <label className='paddingLeft'>
                                <label >{data?.sprendimas} </label>
                                <td ><Link to={'/gidai/'+data.id}><button className='btn btn-dark'>Atidaryti</button></Link></td>
                                 </label>
                             </label>
                             </div> </div>
                            ))}
               
            </div>
        </div>
        </div>
        </div>
        </div></div>
    );
}

export default MechanikasGidai;

if (document.getElementById('mechanikasGidai')) {
    ReactDOM.render(<MechanikasGidai />, document.getElementById('mechanikasGidai'));
}
