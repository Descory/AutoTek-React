import ReactDOM from 'react-dom';
import React, { useEffect, useState} from "react";
import { useHistory} from "react-router-dom";
import NavBar from '../NavBar';
import { useParams } from "react-router";
import '../App.css'
/* eslint-disable */
function Mechanikas(){

    const [state, setData] = useState({
        mechanikas: null
    });


    const { id } = useParams();

    const history = useHistory();
    const token = localStorage.getItem('auth_token')
    

    if(token == null){
        history.push('/prisijungimas')
    }

    

    const fetchData = async () => {
        const api = await fetch("https://autoteksaitynai.azurewebsites.net/api/mechanikai/"+ id,{
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        setData({
            mechanikas: await api.json(),
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
        history.push('/prisijungimas')
        return null;
    }

    const findMechanikas = () =>{
        return "/mechanikai/"+id+"/gidai"
    }

    return (
        <div className="sb-nav-fixed">
            <NavBar />
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Mechanikas 
                        </div>
                        <a className="nav-link" href={findMechanikas()}>Gidai</a>
                        <div className="card-body">

                        <div className="row mb-3">
                            <label className="col-md-4 col-form-label text-md-right">Vardas:
                            {
                            state?.mechanikas?.map(data => (
                                <label className='paddingLeft' key={data?.id}>
                                <label >{data?.name} </label>
                                    </label>
                             ))}
                             </label>
                             </div>
                             <div className="row mb-3">
                            <label className="col-md-4 col-form-label text-md-right">El. Paštas:
                            {
                            state?.mechanikas?.map(data => (
                                <label className='paddingLeft' key={data?.id}>
                                <label >{data?.email} </label>
                                    </label>
                             ))}
                             </label>
                </div>
                <div className="row mb-3">
                            <label className="col-md-4 col-form-label text-md-right">Rolė:
                            {
                            state?.mechanikas?.map(data => (
                                <label className='paddingLeft' key={data?.id}>
                                    {
                                            data?.administratorius === 0
                                            ? <label>Narys</label>
                                            : <label>Administratorius</label>
                                        }
                                    </label>
                             ))}
                             </label>
                             </div>
                                        
            </div>
        </div>
        </div>
        </div>
        </div></div>
    );
}

export default Mechanikas;

if (document.getElementById('mechanikas')) {
    ReactDOM.render(<Mechanikas />, document.getElementById('mechanikas'));
}
