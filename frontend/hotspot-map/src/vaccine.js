import React from "react"
import {Link} from 'react-router-dom';
import Home from './h.png';



  
function vaccine(){
    return(
        <div>
            <div > <h1 style = {{textAlign: "Center"}}> Find a COVID-19 vaccine</h1></div>
            <div style={{backgroundColor:"pink",height:"100px", width:"70%", margin:"auto"}}>

            <input id="input" style={{ fontSize:"18px", marginTop:"30px", border:"2px solid black", borderRadius:"20px", height:"40px", paddingLeft:"10px", marginRight:"20px",width:"250px"}} type="text" name="myCountry" placeholder="Enter County or Zip Code"/>
            <span style={{ fontSize:"18px", marginRight:"20px"}}>OR</span>
            <button style={{fontSize:"14px", marginTop:"30px", border:"2px solid black", borderRadius:"20px", height:"40px", marginRight:"20px", width:"130px"}} onClick={getLocation}>Use my location</button>
            <button style={{fontSize:"15px", marginTop:"30px", border:"2px solid black",  borderRadius:"20px", height:"40px", marginRight:"20px", width:"130px"}}>Find Vaccine</button>
            <Link to="/"><div style={{ marginTop:"22px", borderRadius:"8px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", backgroundColor:"#D8D9DA",float:"right", padding:"8px", marginRight:"30px", cursor:"pointer"}} >
            <img alt="Home" title="Home" style={{width:"40px", height:"40px"}} src={Home}/>
            </div>
            </Link>
             </div>
             <div id="demo" style={{backgroundColor:"green",height:"100px", width:"70%", margin:"auto"}}></div>

        </div>
    );
}

// function inputValidation(){


// }

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        document.getElementById("input").innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
      console.log(position.coords.longitude);
   

      
    document.getElementById("input").value = "Latitude: " + position.coords.latitude;
  }

export default vaccine;