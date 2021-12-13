
import React from "react";
import './App.css'
import { useState } from "react"


const NavBar = () =>{
    const token =  localStorage.getItem('auth_token')
    const role =  localStorage.getItem('user_role')
    const [bar, setBar] = useState('navbar-collapse collapse');

    


    var loggedIn = false;

    if (token != null){
        loggedIn = true;
    }

    function toggleCollapse(){
        if(bar === 'navbar-collapse collapse show')
            setBar('navbar-collapse collapse')
        else
            setBar('navbar-collapse collapse show')
    }


    if(!loggedIn){
        return(
            <>
            
            <div className="sb-nav-fixed customFont" >

                <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm" >
                <div className="container-fluid" >

                    <a className="navbar-brand" href="/">
                        Autotek
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" onClick={() => toggleCollapse()}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">

                        </ul>


                        <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/prisijungimas">Prisijungimas</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/registracija">Registracija</a>
                                    </li>
                                </ul>

                    </div>
                    </div>

            </nav>
            </div>
</>


        )
    }
    else{
    return(
        <> 
        
            <div className="sb-nav-fixed customFont">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        Autotek
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" onClick={() => toggleCollapse()}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={bar} id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            {
                                role === "1"
                                ? (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/problemosirsimptomai">Problemos/Simptomai</a>
                                    </li>
                                )
                                : <></>
                            }
                        <li className="nav-item">
                                        <a className="nav-link" href="/gidai/naujas">Sukurti gida</a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" href="/gidai">Gidai</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/automobiliai">Automobiliai</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/mechanikai">Mechanikai</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/atsijungimas">Atsijungti</a>
                                    </li>
                                </ul>
                    </div>
                </div>
            </nav>
            </div>
            </>
        )
    }
}

export default NavBar;
