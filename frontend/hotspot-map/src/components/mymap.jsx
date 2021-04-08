import React, { Component } from 'react';
import {MapContainer, GeoJSON, TileLayer, Marker} from "react-leaflet"
import county_ca from './../data/county_ca.json'
import "leaflet/dist/leaflet.css";
class MyMap extends Component {
    state = { };

    componentDidMount(){
        console.log(county_ca);
    }

    render() {
        return ( 
            <div>
                <h1 style = {{textAlign: "center"}}>My Map</h1>
                <MapContainer style = {{height: "80vh"}} zoom = {6.5} center = {[38, -122]}>
                    <GeoJSON data ={county_ca.features}/>
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