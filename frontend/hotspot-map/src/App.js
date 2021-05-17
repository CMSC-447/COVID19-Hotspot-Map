import React from "react";
import MyMap from "./components/mymap";
import './App.css';
import icon from './components/logo192.png';
import syring from './components/pls.png';
import {Link} from 'react-router-dom';
import county_data from './data/total_county_data.json';
import prison_data from './data/total_pri_data.json';
import marker_data from './data/markers.json';
import Bchart from './chart_county.js';
import Bachart from './chart_prison.js';

// making todays date accessible to all the methods
var displaytodaydate;
//var latestDataDate = "2021-05-03"
var cty;
var pri;
var data = {}

class App extends React.Component {
  
  constructor(props){
    
    // initializing 
    super(props);
    this.state = {
      county: [],
      prisons: [],
      selectCounty:'All',
      selectPrison:'None',
      theDate: '',
      pri_uni_ref:[],
      cty_uni_ref:[],

    };

  }
  

  // to find the today's date
  datetime = () => {


    var showdate= new Date();

    var date = showdate.getDate();
    var month = 1 + showdate.getMonth();
    var year = showdate.getFullYear();
    
    
    if(date < 10 ){
      date = '0'+showdate.getDate();
    }
    if(month < 10){
      
      month = '0'+(month);
    }
    displaytodaydate = year + '-' + (month) + '-' + date;
    
    return(
      <div></div>
    )


  }
  // Load all the counties for the dropdown.
  async loadCounties() {
    const response = await fetch('/load_counties');   //how it gets backend
    const data = await response.json();
    if (response.ok){
      
      console.log("Connected to backend API from loadDB().");
    }
    else {
      console.log("Could not connect to backend API from loadDB().");
    }
    return data;
  }

  // Writes all the prisons to a file and also returns the result.
  async getPrison() {
    const response = await fetch('/get_prisons');
    const data = await response.json();

    if (response.ok){
      console.log("Connected to backend API from getPrison().");
    }
    else {
      console.log("Could not connect to backend API from getPrison().");
    }
    return data;
  }

  // This gets the total number of cases for all prisons for the latest date.
  async getTotalPrisonCases() {
    const response = await fetch('/getTotalPrisonCases');

    if (response.ok){
      console.log("Connected to backend API from getTotalPrisonCases().");
    }
    else {
      console.log("Could not connect to backend API from getTotalPrisonCases().");
    }
  }

  // Loads all the vaccine locations in california.
  async getVacLoc() {
    const response = await fetch('/getVacLoc');

    if (response.ok){
      console.log("Connected to backend API from getVacLoc().");
    }
    else {
      console.log("Could not connect to backend API from getVacLoc().");
    }
  }

  // This gets the total number of cases for all counties for the latest date.
  async getTotalCountyCases() {
    const response = await fetch('/getTotalCountyCases');

    if (response.ok){
      console.log("Connected to backend API from getTotalCountyCases().");
    }
    else {
      console.log("Could not connect to backend API from getTotalCountyCases().");
    }
  }

  // This gets the data for a selected prison and date.
  async getPrisonData() {
    const response = await fetch('/getPrisonData/' + this.state.pri_uni_ref + " " + this.state.theDate);
    const data = await response.json();
  
    if (response.ok){
      console.log("Connected to backend API from getPrisonData().");
    }
    else {
      console.log("Could not connect to backend API from getPrisonData().");
    }
    return data;
  }

  // This gets the data for all counties given a date.
  async AllCountyData() {
    if (this.state.theDate === '') {
      this.state.theDate = '2021-05-03';
    }
    const response = await fetch('/AllCountyData/' + this.state.theDate);

    if (response.ok){
      console.log("Connected to backend API from AllCountyData().");
    }
    else {
      console.log("Could not connect to backend API from AllCountyData().");
    }
  }

  // This gets the data for all prison given a date.
  async AllPrisonData() {

    const response = await fetch('/AllPrisonData/' + this.state.theDate);

    if (response.ok){
      console.log("Connected to backend API from AllPrisonData().");
    }
    else {
      console.log("Could not connect to backend API from AllPrisonData().");
    }
  }

  // This gets the data for a selected county and date.
  async getCountyData() {
      const response = await fetch('/getCountyData/' + this.state.cty_uni_ref + " " + this.state.theDate);
      const data = await response.json();
  
      if (response.ok){
        console.log("Connected to backend API from getCountyData()");
      }
      else {
        console.log("Could not connect to backend API from getCountyData()");
      }
      return data;
    }


  async componentDidMount() {
    cty = this.loadCounties();
    pri = this.getPrison();
    this.getVacLoc();
    this.AllCountyData();
    this.AllPrisonData();

    this.getTotalPrisonCases();
    this.getTotalCountyCases();

    //probably need to move this to a new method
    if(!document.getElementById("myDate").value){
      document.getElementById("error").innerHTML = "No data avalible for <strong>" + displaytodaydate + "</strong> Showing data for <strong>2021-05-03</strong>";
    }
    
    // county drop down.
    cty.then( result => {
      this.setState({ county:result,
      });
    });
    
  }

  // for the drop down menus
  selectLACounty(event){

    this.setState({ 
      prisons: [],
      selectPrison: 'None',
      selectCounty: 'All'
      
  });

    
    this.setState({ selectCounty: event.target.value});

    var tar = event.target.value;

    pri.then( result => {

      this.setState({prisons:[]});

      // get the match for the counties.
      for (var i = 0; i < result.length; i++) {
        if (result[i].county === tar) {
          this.state.prisons.push(result[i])
        }
      }

      if(event.target.value) {
        var uni_ref;
        // get the reference value for a chosen county.
        for (var j = 0; j < this.state.county.length; j++) {
          if (this.state.county[j].c_name === event.target.value) {
            uni_ref = this.state.county[j].uni_ref;
          }
        }
    
        this.setState({cty_uni_ref: uni_ref});
      }
      else {
        this.setState({ 
          prisons: [],
          selectPrison: 'None',
          selectCounty: 'All'
      });
    }

    });

  }

  selectLAPrison(event){
    
    // if a value is set for prison
    if(event.target.value){
      this.setState({

        selectPrison: event.target.value,

      });
    }
    // if the user goes back to having no value for prison
    else{
      this.setState({ 
        selectPrison: 'None',
      });
    }


    var uni_ref;
    // get the reference value for a chosen prison.
    for (var i = 0; i < this.state.prisons.length; i++) {
      if (this.state.prisons[i].p_name === event.target.value) {
        uni_ref = this.state.prisons[i].uni_ref;
      }
    }
    this.setState({pri_uni_ref: uni_ref}, function () {
  
    });
  }

  handleInputChange = (event) =>{

    event.preventDefault()
    console.log(event.target.value)
    this.setState({
      theDate: event.target.value
    })
  }

  handleSubmit=(event) =>{
    document.getElementById("error").innerHTML = "Scroll down for more information";
    document.getElementById("error").style.color = "green";
    document.getElementById("chosenData").style.visibility = "visible";
    event.preventDefault()
    data = this.state;
    this.inputValidate(data);
    this.AllCountyData();
    this.AllPrisonData();
   } 


  inputValidate(valiData){
    
    var total_deaths = 0;
    var total_cases = 0;
    var pri_cases = 0;
    var pri_deaths = 0;
    var pri_released = 0;
    var new_cases = 0;
    var new_deaths = 0;
    var cty_tot_deaths = 0;
    var cty_tot_cases = 0;
    var cty_cases = 0;
    var cty_deaths = 0;

    if(valiData.selectCounty === 'All'){
      // if(valiData.theDate){
        // document.getElementById("error").style.color = "red";
        // document.getElementById("error").innerHTML = "You must choose a county, or both, a county and a prison";
      // }
      // else{
        console.log("All county")
        console.log(valiData.theDate);
        for(var i = 0; i < 58; i++){
          total_cases  += county_data[i].conf_cases;
          total_deaths  += county_data[i].conf_deaths;
  
        // }
        document.getElementById("info").style.visibility = "visible";
        document.getElementById("info").innerHTML = "<h2 style='font-family:Andale Mono, monospace; text-align:center;'>California</h2><h3 style=' font-family:Andale Mono, monospace; text-align:center'>03/10/2020 - 05/03/2021</h3><strong style='padding-left:15px; font-family:Andale Mono, monospace'>Confirmed Cases:</strong> <span style='font-family:Andale Mono, monospace'>" + total_cases + "</span><br><strong style='padding-left:15px; font-family:Andale Mono, monospace;'>Confirmed Deaths </strong><span style='font-family:Andale Mono, monospace'>" + total_deaths + "</span>";
      }

    }
    else if(valiData.selectPrison === 'None'){
      console.log("here")
      if(valiData.theDate){
        var cty_data = this.getCountyData();
        cty_data.then(function(result) {
  
          if (result.length) {
            document.getElementById("info").style.visibility = "visible";
            cty_cases = result[0].new_cases;
            cty_deaths = result[0].new_deaths;
            cty_tot_cases = result[0].cases;
            cty_tot_deaths = result[0].deaths
            document.getElementById("info").innerHTML = "<h2 style='text-align:center; font-family:Andale Mono, monospace;'>" + data.selectCounty + " </h2><h3 style='text-align:center; font-family:Andale Mono, monospace;'>" + data.theDate + "</h3><strong style='padding-left:15px; font-family:Andale Mono, monospace;'> Confirmed Cases today: </strong><span style='font-family:Andale Mono, monospace;'> " + cty_cases + "</span><br><strong style='padding-left:15px; font-family:Andale Mono, monospace;'>Confirmed Deaths today: </strong><span style ='font-family:Andale Mono, monospace;' >" + cty_deaths + "<br><br><strong style='padding-left:15px; font-family:Andale Mono, monospace;'>Total cases so far : </strong><span style='font-family:Andale Mono, monospace;'>" + cty_tot_cases + "</span><br><strong style='padding-left:15px; font-family:Andale Mono, monospace;'>Total deaths so far : </strong><span style='font-family:Andale Mono, monospace;'>" + cty_tot_deaths + "</span>";
          } else {
            document.getElementById("error").innerHTML = "Data not found for the selected date.";
            document.getElementById("error").style.color = "red";
            document.getElementById("info").innerHTML = "";
            
          }
        });
        
      }
      else {
        document.getElementById("info").style.visibility = "visible";
        for(var j = 0; j < 58; j++){
          if(data.selectCounty === county_data[j].county){
            document.getElementById("info").innerHTML = "<h2 style='text-align:center'>" + data.selectCounty + " </h2><strong style='padding-left:15px;'> Confirmed Cases:</strong> " + county_data[j].conf_cases + "<br><strong style='padding-left:15px'>Confirmed Deaths: </strong>" + county_data[j].conf_deaths;
          }
        }
      }
     
    }
    else {
      if(data.theDate){
        cty_data = this.getCountyData();
        cty_data.then(function(result) {
  
          if (result.length) {
            document.getElementById("info").style.visibility = "visible";
            cty_cases = result[0].new_cases;
            cty_deaths = result[0].new_deaths;
            cty_tot_cases = result[0].cases;
            cty_tot_deaths = result[0].deaths
            document.getElementById("info").innerHTML = "<h2 style=' font-family:Andale Mono, monospace; text-align:center'>County Data<h2><h3 style=' font-family:Andale Mono, monospace; text-align:center'>"+ data.selectCounty +"</h3><h3 style=' font-family:Andale Mono, monospace; text-align:center'>" + data.theDate + "</h3><strong style='padding-left:15px; font-family:Andale Mono, monospace;'>Confirmed Cases today:</strong> <span style=' font-family:Andale Mono, monospace;'>" + cty_cases + "</span><br><strong style='padding-left:15px; font-family:Andale Mono, monospace;'> Confirmed Deaths today:</strong> <span style='font-family:Andale Mono, monospace;'>" + cty_deaths + "</span><br><strong style='padding-left:15px; font-family:Andale Mono, monospace;'> Confirmed Cases so far:</strong> <span style=' font-family:Andale Mono, monospace;'>" +cty_tot_cases + "<br><strong style='padding-left:15px; font-family:Andale Mono, monospace;'>Confirmed Deaths so far: </strong> <span style=' font-family:Andale Mono, monospace;'>" + cty_tot_deaths + "</span>";
          } else {
            document.getElementById("error").innerHTML = "Data not found for the selected date.";
            document.getElementById("error").style.color = "red";
            document.getElementById("info").innerHTML = "";
            
          }
        });
        var pri_data = this.getPrisonData();
        pri_data.then(function(result) {

          if (result.length) {
            document.getElementById("info").style.visibility = "visible";
            pri_cases = result[0].conf_cases;
            pri_deaths = result[0].deaths;
            pri_released = result[0].released_cases;
            new_cases = result[0].new_conf_cases;
            new_deaths = result[0].new_deaths;
            document.getElementById("info").innerHTML += "<h2 style=' font-family:Andale Mono, monospace; text-align:center'>Prison Data<h2><h3 style=' font-family:Andale Mono, monospace; text-align:center'>"+ data.selectPrison +"</h3><h3 style=' font-family:Andale Mono, monospace; text-align:center'>" + data.theDate + "</h3><strong style='padding-left:15px; font-family:Andale Mono, monospace;'>Confirmed Cases today:</strong> <span style=' font-family:Andale Mono, monospace;'>" + new_cases + "</span><br><strong style='padding-left:15px; font-family:Andale Mono, monospace;'> Confirmed Deaths today:</strong> <span style='font-family:Andale Mono, monospace;'>" + new_deaths + "</span><br><strong style='padding-left:15px; font-family:Andale Mono, monospace;'> Confirmed Cases so far:</strong> <span style=' font-family:Andale Mono, monospace;'>" + pri_cases + "<br><strong style='padding-left:15px; font-family:Andale Mono, monospace;'>Confirmed Deaths so far: </strong> <span style=' font-family:Andale Mono, monospace;'>" + pri_deaths + "</span><br><strong style='padding-left:15px; font-family:Andale Mono, monospace;'>Confirmed Release so far: </strong> <span style='font-family:Andale Mono, monospace;'>" + pri_released + "</span>";
            
          } else {
            pri_cases = 0;
            pri_deaths = 0;
            pri_released = 0;
            new_cases = 0;
            new_deaths = 0;
            document.getElementById("error").innerHTML = "Data not found for the selected date.";
            document.getElementById("error").style.color = "red";
            document.getElementById("info").innerHTML = "";
          }
        });
      }
      else{
        document.getElementById("info").style.visibility = "visible";
     
        for(var k = 0; k < Object.keys(marker_data).length; k++){
          if(data.selectPrison === marker_data[k].p_name){
            for(var l = 0; l < Object.keys(prison_data).length; l++ ){
              
              if(prison_data[l].uni_ref === marker_data[k].uni_ref){
                document.getElementById("info").innerHTML = "<h2 style='text-align:center; font-family:Andale Mono, monospace;'>" + data.selectPrison  + " </h2><h3 style='text-align:center; font-family:Andale Mono, monospace;'>" + data.selectCounty + " </h3><strong style='padding-left:15px; font-family:Andale Mono, monospace;'> Total Confirmed Cases:</strong> <span style='font-family:Andale Mono, monospace;'>" + prison_data[l].conf_cases + "<span><br><strong style='padding-left:15px; font-family:Andale Mono, monospace;'>Total Confirmed Deaths: </strong><apan style='font-family:Andale Mono, monospace;'" + prison_data[l].conf_deaths + "</span><strong style='padding-left:15px; font-family:Andale Mono, monospace'>Total Confirmed Release: </strong><span style='font-family:Andale Mono, monospace'> " + prison_data[l].rel_cases + "</span>";
                
                document.getElementById("info").innerHTML = "<h2 style='text-align:center'>" + data.selectPrison + " </h2><h3 style='text-align:center'>" + data.selectCounty + " </h3><strong style='padding-left:15px;'> Confirmed Cases:</strong> " + prison_data[l].conf_cases + "<br><strong style='padding-left:15px'>Confirmed Deaths: </strong>" + prison_data[l].conf_deaths + "<br><strong style='padding-left:15px'>Confirmed Release: </strong>" + prison_data[l].rel_cases;
              }
            }     
          }
        }
      }
    }
  }

  scrollUp= ()=>{ 
    window.scrollTo({top: 0, behavior: 'smooth'});
}
  
  render() {  
    const {theDate} = this.state 
    const {selectPrison} = this.state  
    const {selectCounty} = this.state

    return (
      <div>   
      <div>
      
        <div > <h2 style = {{textAlign: "Center"}}> California Covid-19 Hotspot Map</h2></div>
      
        <div style={{margin:"auto", textAlign:"center", width:"70%", display:"block", overflow:"auto"}}>
        <form style={{display: "inline-block"}} onSubmit={this.handleSubmit}>
        
        <div style={{float:"left" }}>

          <select  style={{marginRight:"40px", marginBottom:"5px", paddingLeft:"10px", paddingRight:"10px", height:"30px", width:"200px", border:"2px black solid", backgroundColor:"#393F44", color:"#D8D9DA"}} value={this.state.selectCounty} onChange={this.selectLACounty.bind(this)}>

           
            <option value=""  defaultValue >SELECT COUNTY</option>
            {this.state.county.map(x => {
              return <option key={x.c_name}>{x.c_name}</option>
            })}

          </select>


          <select onChange={this.selectLAPrison.bind(this)} value={this.state.selectPrison} style={{marginBottom:"5px", paddingRight:"10px", marginRight:"40px", paddingLeft:"10px", height:"30px", width:"200px", border:"2px black solid", backgroundColor:"#393F44", color:"#D8D9DA"}}>

           
            <option value="" defaultValue>SELECT PRISON</option>
            {
              this.state.prisons.map(x => { 
                return <option  key={x.p_name}>{x.p_name}</option>     
              })
            }
          
          </select>

        </div>
        
        <div style={{float:"left" }}>


          <input id="myDate" type="date" min="2020-03-10" max="2021-05-03" name="theDate" onChange= {this.handleInputChange} style={{ marginBottom:"5px", marginRight:"40px", height:"30px", width:"170px", border:"2px black solid", backgroundColor:"#393F44", color:"#D8D9DA", paddingLeft:"10px"}}></input>
      
          <button className="sbmt_btn" style={{ cursor:"pointer", marginBottom:"5px", height:"30px", width:"100px", border:"2px black solid",  color:"#D8D9DA", paddingLeft:"10px"}}>SUBMIT</button>

        </div>
        </form>
        </div>
          
            {this.datetime()}
            <div style={{ textAlign:"center", margin:"auto", width:"70%", overflow:"auto"}} >
            <div><p style={{color:"red"}} id="error"></p></div>
            <div id="chosenData" style={{margin:"10px", width:"85%", float:"left", border:"2px solid #393F44", visibility:"visible"}} >
             
              <p>County: {selectCounty} &emsp;&emsp;  Prison: {selectPrison} &emsp;&emsp;  Date: {theDate}</p>
             </div>
             
             
             
             <Link to="/vaccine"><div className="vac_btn" style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",  float:"right", padding:"8px", margin:"10px", cursor:"pointer"}} >
            <img alt="Vaccine info" title="Get vaccine info" style={{width:"40px", height:"40px", align:"center", verticalAlign:"middle"}} src={syring}/>
            </div>
            </Link>
            </div>


        </div>
        <div>
    
          <MyMap />

          <div id="scroll_up" style={{paddingTop:"20px", visibility:"visible", float:"right", width: '20%', margin: 'auto', display:"flex"}} >
                    <span onClick={this.scrollUp.bind(this)}>
                      <img alt="Page up" title="Scroll to the top" style={{cursor:"pointer", height:"40px", width:"40px"}} src={icon} />
                        </span>
                    </div>
            
            
            <div id="info" style={{visibility:"hidden", paddingBottom:"20px", paddingTop:"20px", textAlign:"left", height:"auto", width: '40%', margin: 'auto', border:"2px solid #393F44 ", marginTop:"60px"}}>
             
            </div>

            <div style={{margin:"auto", width:"85%", paddingTop: "100px"}} id="info_chart">
              <Bachart/>

            </div>
            <div style={{margin:"auto", width:"85%", paddingTop: "100px"}} id="info_chart">
              <Bchart/>

            </div>

      
      </div>
      </div>    
   
    );
  };
}

export default App;
