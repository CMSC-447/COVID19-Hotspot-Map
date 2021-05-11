import React, { Component } from 'react';
import {Marker, MapContainer, GeoJSON, TileLayer, Tooltip} from "react-leaflet"
import county_ca from './../data/county_ca.json'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import data from './../data/markers.json'
import prison_data from './../data/total_pri_data.json'
import county_data from './../data/total_county_data.json'
import icon from './blue-pin.png';


let DefaultIcon = L.icon({
    iconUrl: icon,
    iconSize:[20,20],
    iconAnchor:[5,10],
    popupAnchor:[5,5]
});

L.Marker.prototype.options.icon = DefaultIcon;

var datainfo = [];


class MyMap extends Component {
    constructor () {
        super();
        this.state = {
            locations:[],
            hovered:false,
            check:false,   

        };
    }

    componentDidMount() {

        

        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
          }
        // arrange data for marking and popups
        datainfo = [];
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
            document.getElementById("info").style.visibility = "visible";
            document.getElementById("info").innerHTML = `<h2 style='text-align:center'>${countyName}</h2><strong style='padding-left:15px'>Prisons:</strong><br>`;

            // document.getElementById("info").innerHTML = "Prisons: " + "<br>" ;

            var exist = false;
            var i =0;
            for( i= 0; i < datainfo.length; i++ ){
                if(datainfo[i].county === `${countyName}`){
                    exist = true;
                }

            }            

            if(exist){
                
                for(var j = 0; j < datainfo.length; j++ ){
                    if(datainfo[j].county === `${countyName}`){
                        document.getElementById("info").innerHTML += "<li style='padding-left:25px'>" + datainfo[j].name + "  (City: " + datainfo[j].city + ")</li>" ;
                    }
                }
            }
           
                    
            else{
                document.getElementById("info").innerHTML += "<span style='padding-left:25px'>No prisons to show<span>" ;
            }

            var elmnt = document.getElementById("info");
            elmnt.scrollIntoView({behavior: "smooth"});
        

          });


        if(county.properties.COUNTYFP > 34){
            layer.options.fillColor = "yellow"
        }
    };


    handlecheck = (event) =>{
       
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


    prisonPrint = (e) =>{


        
        document.getElementById("info").style.visibility = "visible";
        document.getElementById("info").innerHTML = "<h2 style='text-align:center'>" + e.target.options.children.props.children[1] + "<h2>" 
        var index = 0;
        for(var i =0; i< datainfo.length; i++){
            if(datainfo[i].name === e.target.options.children.props.children[1]){
                index = i;

            }
        }
        document.getElementById("info").innerHTML += "<strong style='padding-Left: 10px'>County: </strong>" + datainfo[index].county  + "<br> <strong style='padding-Left: 10px'>City:</strong>" + datainfo[index].city;

        var elmnt = document.getElementById("info");
        elmnt.scrollIntoView({behavior: "smooth"});
    }

  
    render() {
        const {check} = this.state; 
       
        return ( 
            
            <div>

                <div style = {{  width: '70%', margin:"auto" , display:"block", overflow:"auto"}}>
                    
                <input id="chkbx" onChange={this.handlecheck.bind(this)} type="checkbox" style={{float:"right"}}/> <label style={{float:"right", fontSize:"14px"}}>Show Tile Layer</label>
                </div>
                <MapContainer 
                
                style = {{border:"2px solid #393F44", height: "72vh", width: '70%', margin: 'auto'}} zoom = {6} center = {[37.5, -120]} scrollWheelZoom = {true}>
                    <GeoJSON style = {this.countyStyle} data ={county_ca.features} onEachFeature={this.onEachCounty} 
                    onMouseMove={this.handleMove} onMouseLeave={this.handleLeave} />
                 
                 
                 
                    {check ? (<TileLayer style={{visibility:"hidden"}}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                    />):("")}


                    {this.state.locations.map((location,idx) => 


                        // marker and detailed display.
                        <Marker 
                        eventHandlers={{
                            click: (e) => {
                              this.prisonPrint(e)
                            
                            },
                          }}
                        key={`marker-${idx}`} position={location.position}>

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

                
                
            </div>
        );
    }
}

export default MyMap
