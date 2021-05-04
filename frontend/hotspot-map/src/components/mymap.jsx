import React, { Component } from 'react';
import {MapContainer, GeoJSON, TileLayer} from "react-leaflet"
import county_ca from './../data/county_ca.json'
import "leaflet/dist/leaflet.css";



class MyMap extends Component {
    state = { };

    componentDidMount(){
        
        console.log(county_ca);
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
    };

   
    onEachCounty = (county, layer) =>{
        const countyName = county.properties.NAME;
        layer.bindPopup(`${countyName}`)
         
        if(county.properties.COUNTYFP > 34){
            layer.options.fillColor = "green"
        }


    };

    render() {
        return ( 
            <div>
                <MapContainer style = {{height: "80vh", width: '80%', margin: 'auto'}} zoom = {6} center = {[38, -122]} scrollWheelZoom = {false}>
                    <GeoJSON style = {this.countyStyle} data ={county_ca.features} onEachFeature={this.onEachCounty}/>
                    <TileLayer
                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     />
                </MapContainer>
            </div>
        );
    }
}

export default MyMap