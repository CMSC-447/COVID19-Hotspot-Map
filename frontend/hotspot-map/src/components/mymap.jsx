import React, { Component } from 'react';
import { MapContainer, GeoJSON, TileLayer, Tooltip, CircleMarker} from "react-leaflet";
import county_ca from './../data/county_ca.json';
import 'leaflet/dist/leaflet.css';
import data from './../data/markers.json';
import county_data from './../data/total_county_data.json';
import prison_data from './../data/total_pri_data.json';
import county_spec_data from './../data/county_spec_data.json';
import pri_spec_data from './../data/pri_spec_data.json';


var datainfo = [];


class MyMap extends Component {
    constructor (props) {
        super(props);
        this.state = {
            locations:[],
            hovered:false,
            check:false,   

        };
    }

    componentDidMount() {

       // console.log(county_data[1].conf_cases);

        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
          }
        // arrange data for marking and popups
        datainfo = [];
        for (var i = 0; i < data.length; i++) {
            datainfo.push({"name":data[i].p_name, "uni_ref": data[i].uni_ref, "position": [data[i].latitude, data[i].longitude], 
            "city":data[i].city, "county":data[i].county, "cases":0});
        }

        for (var u = 0; u < datainfo.length; u++) {
            for (var v = 0; v < pri_spec_data.length; v++) {
                if (datainfo[u].name === pri_spec_data[v].p_name) {
                    datainfo[u].cases = pri_spec_data[v].new_conf_cases
                }

            }
        }

        // set the state (If state is not saved, will causes problems)
        this.setState({locations:datainfo});

        // Updating COUNTYFP VALUES FOR SHADING.
        for (var m = 0; m < 58; m++) {
            county_ca.features[m].properties.COUNTYFP = 0
        }

        for (var k = 0; k < 58; k++) {
            var nm = county_ca.features[k].properties.NAME;
            for (var j = 0; j < county_spec_data.length; j++) {
                if (county_spec_data[j].county === nm) {
                    county_ca.features[k].properties.COUNTYFP = county_spec_data[j].cases
                }
            }
        }

    }

    getColor = (n) => {

        if(n < 2) {
            return "#CFEBF7"
        }
        else if(n < 5) {
            return "#A2D7F0"
        }
        else if(n < 10) {
            return "#42ABDB"
        }
        else if(n < 20) {
            return "#19749F"
        }
        else {
            return "#0C2533"
        }
    
    };

    countyStyle = {
        fillColor: "grey",
        fillOpacity: .6,
        color: "black",
        weight:.6,

    };

   
    onEachCounty = (county, layer) => {
        
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
                        document.getElementById("info").innerHTML += "<li style='padding-left:25px'>" + datainfo[j].name + "  (City: " + datainfo[j].city + ")</li>";
            
                    }
                }
            }       
            else {
                document.getElementById("info").innerHTML += "<span style='padding-left:25px'>No prisons to show<span>"
            }

            for(var k = 0; k < Object.keys(county_data).length; k++){
                if(county_data[k].county === `${countyName}`){
                    document.getElementById("info").innerHTML +=  "<h3 style='text-align:center'>County Covid Data</h3><strong style='padding-Left: 10px'>Total Cases: </strong>" + county_data[k].conf_cases + "<br> <strong style='padding-Left: 10px'>Total Deaths: </strong>" + county_data[k].conf_deaths;
                }
            }

            var elmnt = document.getElementById("info");
            elmnt.scrollIntoView({behavior: "smooth"});
        });

        if(county.properties.COUNTYFP < 10) {
            layer.options.fillColor = "#FAF3AD"
        }
        else if(county.properties.COUNTYFP < 1000) {
            layer.options.fillColor = "#F3CC71"
        }
        else if(county.properties.COUNTYFP < 10000) {
            layer.options.fillColor = "#EEAE33"
        }
        else if(county.properties.COUNTYFP < 100000) {
            layer.options.fillColor = "#DD7225"
        }
        else {
            layer.options.fillColor = "#B4461F"
        }
        

    };


    handlecheck = (event) => {
       
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
        document.getElementById("info").innerHTML = "<h2 style='text-align:center'>" + e.target._tooltip.options.children[1] + "<h2>" ;
        var index = 0;
        
        for(var i =0; i< datainfo.length; i++){
            if(datainfo[i].name === e.target._tooltip.options.children[1]){
                index = i;
            }
        }
        document.getElementById("info").innerHTML += "<strong style='padding-Left: 10px'>County: </strong>" + datainfo[index].county  + "<br> <strong style='padding-Left: 10px'>City:</strong> " + datainfo[index].city;

        document.getElementById("info").innerHTML +=  "<h3 style='text-align:center'>Prison Covid Data<h3>";
        for(var k = 0; k < Object.keys(prison_data).length; k++){
            
            if(datainfo[index].uni_ref === prison_data[k].uni_ref ){
                console.log("data array id", datainfo[index].uni_ref)
                console.log("new file", datainfo[index].uni_ref)
                document.getElementById("info").innerHTML +=  "<strong style='padding-Left: 10px'>Total Cases: </strong>" + prison_data[k].conf_cases;
                document.getElementById("info").innerHTML +=  "<br> <strong style='padding-Left: 10px'>Total Deaths: </strong>" + prison_data[k].conf_deaths;
            }
        }
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
                    onMouseMove={this.handleMove} onMouseLeave={this.handleLeave}  />
                 
                 
                 
                    {check ? (<TileLayer style={{visibility:"hidden"}}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                    />):("")}


                    {this.state.locations.map((location,idx=0) => 

                    <CircleMarker
                    eventHandlers={{ click: (e) => {this.prisonPrint(e)}, }}

                        key={`marker-${idx}`}
                        center={location.position}
                        fillOpacity={1.0}
                        color="blue"
                        weight={0.5}
                        fillColor={this.getColor(this.state.locations[idx].cases)}
                        >
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
                        </CircleMarker>
                    )}
                    

                </MapContainer>

            </div>
        );
    }
}

export default MyMap
