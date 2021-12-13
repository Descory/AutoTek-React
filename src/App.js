import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import React from "react";
import Footer from "./Footer"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginActv from "./Auth/LoginActv";
import GidaiList from "./Lists/GidaiList";
import Logout from "./Auth/Logout";
import Automobiliai from "./Lists/Automobiliai";
import Mechanikai from "./Lists/Mechanikai";
import './App.css'
import RegisterActv from "./Auth/RegisterActv";
import Mechanikas from "./Single/Mechanikas";
import MechanikasGidai from './Single/MechanikasGidai';
import Gidas from './Single/Gidas';
import GidasEdit from './Single/GidasEdit';
import GidasAdd from './Single/GidasAdd';
import AutoAdd from './Single/AutoAdd';
import ProblemosSimptomai from './Lists/ProblemosSimptomai';


function App() {
    return(
        <div className="mainDiv">
            <Router>
                <Switch>
                <Route exact path="/">
                    <LoginActv />
                </Route>
                    <Route exact path="/prisijungimas">
                    <LoginActv />
                </Route>
                    <Route exact path="/registracija">
                    <RegisterActv/>
                </Route>
                <Route exact path="/gidai/naujas">
                    <GidasAdd/>
                </Route>
                <Route exact path="/gidai">
                    <GidaiList/>
                </Route>
                <Route exact path="/gidai/:id" component={Gidas}>
                    <Gidas/>
                </Route>
                <Route exact path="/problemosirsimptomai">
                    <ProblemosSimptomai/>
                </Route>
                <Route exact path="/gidai/:id/koreguoti" component={Gidas}>
                    <GidasEdit/>
                </Route>
                <Route exact path="/atsijungimas">
                    <Logout/>
                </Route>
                <Route exact path="/automobiliai">
                    <Automobiliai/>
                </Route>
                <Route exact path="/automobiliai/naujas">
                    <AutoAdd/>
                </Route>
                <Route exact path="/mechanikai">
                    <Mechanikai/>
                </Route>
                <Route exact path="/mechanikai/:id" component={Mechanikas}>
                    <Mechanikas/>
                </Route>
                <Route exact path="/mechanikai/:id/gidai" component={Mechanikas}>
                    <MechanikasGidai/>
                </Route>
                </Switch>
             </Router>
             <Footer/>
             </div>
  );
}

export default App;
