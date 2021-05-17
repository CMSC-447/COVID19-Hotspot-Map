import React from "react"
import {Link} from 'react-router-dom';
import Home from './h.png';
import './App.css';
import vac_loc from "./data/vaccine_location.json"


  
function vaccine(){

   

    return(
        <div>
            <div > <h1 style = {{textAlign: "Center"}}> Find a COVID-19 vaccine</h1></div>
            <div style={{height:"100px", width:"50%", margin:"auto"}}>
            <button style={{fontSize:"14px", marginTop:"30px", border:"2px solid black", borderRadius:"20px", height:"40px", marginRight:"20px", width:"130px"}} onClick={getLocation}>Use my location</button>
            <Link to="/"><div className="home_btn" style={{ marginTop:"22px", borderRadius:"8px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",float:"right", padding:"8px", marginRight:"30px", cursor:"pointer"}} >
            <img alt="Home" title="Home" style={{width:"40px", height:"40px"}} src={Home}/>
            </div>
            </Link>
             </div>
             <div id="loc_wrapper" style={{ alignItems:"center" , alignContent:"center", border:"2px black solid", textAlign:"left", paddingBottom:"30px", height:"auto", width:"50%", margin:"auto"}}>
               
             <div id="distance" style={{ color:"red",  padding:"10px 10px 0 10px",textAlign:"left", display:"inline-block" }}></div>
                <div id="name" style={{ textAlign:"left", display:"inline-block"}}></div>
             </div>

        </div>
    );
}

function getLocation() {
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        document.getElementById("loc_wrapper").innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    var vaccine_distance =  [];  
    
    document.getElementById("name").innerHTML =  "";
    document.getElementById("distance").innerHTML =  "";
    for(var i = 0; i < Object.keys(vac_loc).length; i++){
      var lat = vac_loc[i].latitude;
      var lng = vac_loc[i].longitude; 
      var nam = position.coords.latitude; 
      var cou = position.coords.longitude;
      //In below line we will get the distance between current and given coordinates.
      var d=distance(nam, cou, lat, lng, "N");
      
      if (d > 2000){
       
        if(vac_loc[i].name === null || vac_loc[i].county === null || vac_loc[i].zip === null ){
          console.log("hi")

        }
        else{
          d = d + 2;
          vaccine_distance.push(vac_loc[i])
          document.getElementById("distance").innerHTML += "~ " + d.toFixed(2) +" miles<br/><br/>";
          document.getElementById("name").innerHTML +=  vac_loc[i].name + ", " + vac_loc[i].county + ", " + vac_loc[i].zip + "<br/><br/>";
          
        }
      }
      if(vaccine_distance.length === 30){
        break;
      }
    }   
    
  }

  function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    // var radlon1 = Math.PI * lon1/180
    // var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit==="K") { dist = dist * 1.609344 }
    if (unit==="N") { dist = dist * 0.8684 }
    return dist
}  

export default vaccine;
