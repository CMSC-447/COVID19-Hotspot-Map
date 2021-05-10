import React from "react"
//import React from 'react';
import App from './App';
import vaccine from "./vaccine";
import {Route} from 'react-router-dom';


function routing(){
    return(
        <div>
        <Route exact path="/vaccine" component={vaccine} />
        <Route exact path="/" component={App} />
        </div>
    );


}
export default routing;