import React, { Component } from 'react';
import {Marker, MapContainer, GeoJSON, TileLayer, Tooltip} from "react-leaflet"
import county_ca from './../data/county_ca.json'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import data from './../data/markers.json'
import icon from './marker.png';

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
            hovered:false
        };
    }

    componentDidMount() {

        // arrange data for marking and popups
        for (var i = 0; i < data.length; i++) {
            this.state.locations.push({"name":data[i].p_name, "position": [data[i].latitude, data[i].longitude], 
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
        
         
        if(county.properties.COUNTYFP > 34){
            layer.options.fillColor = "yellow"
        }
    };

    

    render() {

        return ( 
            <div>
                <MapContainer style = {{height: "80vh", width: '80%', margin: 'auto'}} zoom = {6} center = {[38, -122]} scrollWheelZoom = {true}>
                    <GeoJSON style = {this.countyStyle} data ={county_ca.features} onEachFeature={this.onEachCounty}
                    onMouseMove={this.handleMove} onMouseLeave={this.handleLeave}/>
                    <TileLayer
                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     />
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
            </div>
        );
    }
}

export default MyMap