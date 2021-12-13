import ReactDOM from 'react-dom';
import React, { useState, useEffect} from "react";
import {Animated} from "react-animated-css";
import { useHistory, Link} from "react-router-dom";
import NavBar from '../NavBar';
import logo from '../monkey.png';
import '../App.css';
import Modal from 'react-bootstrap/Modal';
/* eslint-disable */


function Mechanikai() {

    const history = useHistory();
    const token = localStorage.getItem('auth_token')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const username =  localStorage.getItem('user_name')
    const usermail =  localStorage.getItem('user_email')
    const role =  localStorage.getItem('user_role')



    if(token == null){
        history.push('/prisijungimas')
    }

    const [state, setData] = useState({
        mechanikai: null
    });

    const fetchData = async () => {
        const api = await fetch("https://autoteksaitynai.azurewebsites.net/api/mechanikai",{
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        setData({
            mechanikai: await api.json(),
        });
    };

    const routeToMechanik = (id) => {
        return '/mechanikai/' + id
    }
    useEffect(() => {
        fetchData();
        }, []);

    async function deleteMechanikas(id){
        const apim = await fetch("https://autoteksaitynai.azurewebsites.net/api/mechanikai/" + id,{
            method: 'delete',
            headers: new Headers({
                'Authorization': 'Bearer' + token
            })
        });
        fetchData();
    }
    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
          <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}><h1>{username}</h1></Animated></Modal.Title>
        </Modal.Header>
        <Modal.Body><div>
            El. paštas: {usermail}
            </div>
            {role === "1"
            ? <div>Role: Administratorius</div>
            :   <div>Role: Narys</div>
            }
            </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-danger' onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>


        <div className="sb-nav-fixed">
            <NavBar />
        <div className="container">
            
            <div className="row justify-content-center">
                <div className="col-md-8">
                <img src={logo} className='fotke'></img>
                    <div className="card">
                        <div className="card-header">Mechanikai
                        <button className='btn btn-dark clickas' onClick={handleShow}>
        Mano profilis
      </button></div>
                        <table className="table table-striped">
                        <thead>
                        <tr>
                                    <th scope="col">Vardas</th>
                                    <th scope="col">Rolė</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>


                            <tbody>
                              {
                                state?.mechanikai?.map(data => (

                                    <tr key={data?.id}>
                                        
                                    <td>{data?.name}</td>
                                        {
                                            data?.administratorius === 0
                                            ? <td>Narys</td>
                                            : <td>Administratorius</td>
                                        }
                                        <td ><Link to={routeToMechanik(data?.id)}><button className='btn btn-dark clickas'>Profilis</button></Link></td>
                                        {
                                            role === "1"
                                            ?<td ><button onClick={()=>deleteMechanikas(data?.id)} className='btn btn-danger clickas'>Ištrinti</button></td>
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
        </>
    );
}

export default Mechanikai;

if (document.getElementById('mechanikai')) {
    ReactDOM.render(<Mechanikai />, document.getElementById('mechanikai'));
}
