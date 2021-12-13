import ReactDOM from 'react-dom';
import React, { useState, useEffect} from "react";
import { useHistory, Link} from "react-router-dom";
import NavBar from '../NavBar';
import svg from '../purple_muscle.svg'
/* eslint-disable */


function Automobiliai() {

    const history = useHistory();
    const token = localStorage.getItem('auth_token')
    const role = localStorage.getItem('user_role')
    if(token == null){
        history.push('/prisijungimas')
    }

    const [state, setData] = useState({
        auto: null
    });

    const fetchData = async () => {
        const api = await fetch("https://autoteksaitynai.azurewebsites.net/api/automobiliai",{
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        setData({
            auto: await api.json(),
        });
    };

    useEffect(() => {
        fetchData();
        }, []);

    async function deleteAuto(id){
        const apim = await fetch("https://autoteksaitynai.azurewebsites.net/api/automobiliai/" + id,{
            method: 'delete',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        fetchData();
    }

    return (
        <div className="sb-nav-fixed">
            <NavBar />
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                
                    <div className="card">
                        <div className="card-header">Automobiliai
                        {   role === "1"
                        ?<Link to={'/automobiliai/naujas'}><button className='btn btn-dark clickas'>Pridėti</button></Link>
                        :<></>}
        
      </div>
                        <table className="table table-striped">
                        <thead>
                        <tr>
                                    <th>Id</th>
                                    <th>Pavadinimas</th>
                                    <th>Marke</th>
                                    <th>Kuras</th>
                                    <th></th>
                                </tr>
                                </thead>


                            <tbody>
                              {
                                state?.auto?.map(autom => (
                                    <tr key={autom?.id}>
                                    <td>{autom?.id}</td>
                                    <td>{autom?.pavadinimas}</td>
                                    <td>{autom?.marke}</td>
                                    <td>{autom?.kuras}</td>
                                    {   role === "1"
                                        ?<td ><button className='btn btn-danger' onClick={()=>deleteAuto(autom?.id)}>Ištrinti</button></td>
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
            <img src={svg} className='fotkeKita' alt='Car SVG'></img>
        </div>
        </div>
    );
}

export default Automobiliai;

if (document.getElementById('automobiliai')) {
    ReactDOM.render(<Automobiliai />, document.getElementById('automobiliai'));
}
