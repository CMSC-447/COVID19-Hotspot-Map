import React, { Component } from 'react';
import {Marker, MapContainer, GeoJSON, TileLayer, Tooltip} from "react-leaflet"
import county_ca from './../data/county_ca.json'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import data from './../data/markers.json'
import icon from './marker.png';
var datainfo = [];

let DefaultIcon = L.icon({
    iconUrl: icon,
    iconSize:[20,20],
    iconAnchor:[5,10],
    popupAnchor:[5,5]
});

L.Marker.prototype.options.icon = DefaultIcon;

class MyMap extends Component {
    constructor () {
        super();
        this.state = {
            locations:[],
            legend: {},
            hovered:false,
            check:false,
            

        };
    }

    componentDidMount() {

        // arrange data for marking and popups
        for (var i = 0; i < data.length; i++) {
            this.state.locations.push({"name":data[i].p_name, "position": [data[i].latitude, data[i].longitude], 
            "city":data[i].city, "county":data[i].county});
            datainfo.push({"name":data[i].p_name, "position": [data[i].latitude, data[i].longitude], 
            "city":data[i].city, "county":data[i].county});
            
        }
        


    }

    getColor = (n) => {
        if(n > 2){
            return "red";
        }
        else{
            return "blue";
        }
    
    };

    countyStyle = {
        fillColor: "blue",
        fillOpacity: .6,
        color: "black",
        weight:0.6,
    };

   
    onEachCounty = (county, layer) =>{
        
        const countyName = county.properties.NAME;
        
        layer.bindTooltip(`${countyName}`); // county name display.
        layer.on('click', function (e) {
            // console.log(this.state.locations[1]);
            document.getElementById("info").innerHTML = "<strong>County:</strong> " + `${countyName}` + "<br><br>" +  
            "<strong>Prisons:</strong> " + "<br>";
            // document.getElementById("info").innerHTML = "Prisons: " + "<br>" ;

            for(var i = 0; i < datainfo.length; i++ ){
                if(datainfo[i].county === `${countyName}`){
                    console.log(datainfo[i])
                    document.getElementById("info").innerHTML += "<li>" + datainfo[i].name + "  (City: " + datainfo[i].city + ")"+"</li>" ;              
                }
            }
            console.log(datainfo[1].name);
           
          });
        
       // layer.document.getElementById("info").innerHTML = `${countyName}`;
        
         
        if(county.properties.COUNTYFP > 34){
            layer.options.fillColor = "yellow"
        }
    };

    handlecheck = (event) =>{
        console.log(event.target.value)
        if(document.getElementById('chkbx').checked){
            this.setState({

                selected: !this.state.selected,
                check:1
            })
        }
        else if(!document.getElementById('chkbx').checked){
            this.setState({
                check:0
            })
        }
    }

    // infoShow =() =>{
    //     infoDisplay = true; 
    // }


    render() {
        const {check} = this.state; 
        return ( 
            
            <div>
                <div style = {{  width: '50%', margin:"auto" , display:"block", overflow:"auto"}}>
                    
                <input id="chkbx" onChange={this.handlecheck.bind(this)} type="checkbox" style={{float:"right"}}/> <label style={{float:"right", fontSize:"14px"}}>Show Tile Layer</label>
                </div>
                <MapContainer style = {{border:"2px solid #393F44", height: "80vh", width: '50%', margin: 'auto'}} zoom = {6} center = {[38, -120]} scrollWheelZoom = {true}>
                    <GeoJSON style = {this.countyStyle} data ={county_ca.features} onEachFeature={this.onEachCounty} 
                    onMouseMove={this.handleMove} onMouseLeave={this.handleLeave} />
                 
                 
                 
                    {check ? (<TileLayer style={{visibility:"hidden",color:"pink"}}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                    />):("")}


                    {this.state.locations.map((location,idx) => 


                        // marker and detailed display.
                        <Marker key={`marker-${idx}`} position={location.position}>
                            <Tooltip>
                                <span>
                                    Prison: &nbsp;
                                </span>
                                {location.name}
                                <span><br />
                                    County: &nbsp;
                                </span>
                                {location.county}
                                <span><br />
                                    City: &nbsp;
                                </span>
                                {location.city}
                                </Tooltip>
                        </Marker>
                    )}
                    


                </MapContainer>
                <div id="info" style={{paddingTop:"20px", paddingLeft:"20px",textAlign:"left", height:"500px", width: '50%', margin: 'auto', backgroundColor:"pink", marginTop:"60px"}}></div>
                
            </div>
        );
    }
}

export default MyMap