import React from "react";
import './App.css'

const Footer = () =>{
    return(

    <footer className="footer">
    <link rel="dns-prefetch" href="//fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet"/>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet"/>
    <b>Autotek. Simonas Jonikas IFF 8/9</b>
    
    </footer>
    )

    
}

export default Footer;
