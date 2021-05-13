import React from "react";
import MyMap from "./components/mymap";
import './App.css';
import icon from './components/logo192.png';
import syring from './components/pls.png';
import {Link} from 'react-router-dom';

// making todays date accessible to all the methods
var displaytodaydate;
var cty;
var pri;

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


  var showdate=new Date();
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

async getTotalPrisonCases() {
  const response = await fetch('/getTotalPrisonCases');

  if (response.ok){
    console.log("Connected to backend API from getTotalPrisonCases().");
  }
  else {
    console.log("Could not connect to backend API from getTotalPrisonCases().");
  }
}

async getTotalCountyCases() {
  const response = await fetch('/getTotalCountyCases');

  if (response.ok){
    console.log("Connected to backend API from getTotalCountyCases().");
  }
  else {
    console.log("Could not connect to backend API from getTotalCountyCases().");
  }
}

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
  this.getTotalPrisonCases();
  this.getTotalCountyCases();



  //probably need to move this to a new method
  if(!document.getElementById("myDate").value){
    document.getElementById("myDate").value = displaytodaydate;
  }
  
  // county drop down.
  cty.then( result => {
    this.setState({ county:result,theDate: displaytodaydate});
  });
  
}

// for the drop down menus
selectLACounty(event){
  //console.log(event.target.value)
  
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
      this.setState({theDate: displaytodaydate});

      var uni_ref;
      // get the reference value for a chosen county.
      for (var j = 0; j < this.state.county.length; j++) {
        if (this.state.county[j].c_name === event.target.value) {
          uni_ref = this.state.county[j].uni_ref;
        }
      }
  
      this.setState({cty_uni_ref: uni_ref}, function () {
        //console.log("County ref", this.state.cty_uni_ref);
      });

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


  // immediately update the ref for prisons.
  this.setState({pri_uni_ref: uni_ref}, function () {
    //console.log(this.state.pri_uni_ref);
  });


}

// for the date
handleInputChange = (event) =>{

  event.preventDefault()
  console.log(event.target.value)
  this.setState({
    [event.target.name]: event.target.value
  })
}

// data collected for the whole form
handleSubmit=(event) => {
  document.getElementById("chosenData").style.visibility = "visible";
  event.preventDefault()

  var pass_data_prison = this.getPrisonData();
  var pass_data_county = this.getCountyData();
  
  console.log("Select Prison data", pass_data_prison)
  console.log("Select County data", pass_data_county)


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
      <div > <h1 style = {{textAlign: "Center"}}> California Covid-19 Hotspot Map</h1></div>

    
    
      <div style={{margin:"auto", textAlign:"center", width:"70%", display:"block", overflow:"auto"}}>
      <form style={{display: "inline-block"}} onSubmit={this.handleSubmit}>
      
      <div style={{float:"left" }}>

        <select  style={{marginRight:"40px", marginBottom:"15px", paddingLeft:"10px", height:"30px", width:"200px", border:"2px black solid", backgroundColor:"#393F44", color:"#D8D9DA"}} value={this.state.selectCounty} onChange={this.selectLACounty.bind(this)}>

          
          <option value=""  defaultValue >SELECT COUNTY</option>
          {this.state.county.map(x => {
            return <option key={x.c_name}>{x.c_name}</option>
          })}

        </select>


        <select onChange={this.selectLAPrison.bind(this)} value={this.state.selectPrison} style={{marginBottom:"15px", marginRight:"40px", paddingLeft:"10px", height:"30px", width:"200px", border:"2px black solid", backgroundColor:"#393F44", color:"#D8D9DA"}}>

          
          <option value="" defaultValue>SELECT PRISON</option>
          {
            this.state.prisons.map(x => { 
              return <option  key={x.p_name}>{x.p_name}</option>     
            })
          }
        
        </select>

      </div>
      
      <div style={{float:"left" }}>


        <input id="myDate" type="date" name="theDate" onChange= {this.handleInputChange} style={{ marginBottom:"15px", marginRight:"40px", height:"30px", width:"170px", border:"2px black solid", backgroundColor:"#393F44", color:"#D8D9DA", paddingLeft:"10px"}}></input>
    
        <button style={{ cursor:"pointer", marginBottom:"15px", height:"30px", width:"100px", border:"2px black solid", backgroundColor:"#393F44", color:"#D8D9DA", paddingLeft:"10px"}}>SUBMIT</button>

      </div>
      </form>
      </div>

          {this.datetime()}
          <div style={{ textAlign:"center", margin:"auto", width:"70%", overflow:"auto"}} >
          <div id="chosenData" style={{margin:"10px", width:"85%", float:"left", border:"2px solid #393F44", visibility:"visible"}} >
            
            <p>County: {selectCounty} &emsp;&emsp;  Prison: {selectPrison} &emsp;&emsp;  Date: {theDate}</p>
            </div>
            
            
            <Link to="/vaccine"><div style={{borderRadius:"8px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", backgroundColor:"#D8D9DA", float:"right", padding:"8px", margin:"10px", cursor:"pointer"}} >
          <img alt="Vaccine info" title="Get vaccine info" style={{width:"40px", height:"40px", align:"center", verticalAlign:"middle"}} src={syring}/>
          </div>
          </Link>
          </div>


      </div>

      <div>
  
        <MyMap />


    
        <div style={{paddingTop:"20px", visibility:"visible", float:"right", width: '20%', margin: 'auto', display:"flex"}} >
                  <span onClick={this.scrollUp.bind(this)}>
                    <img alt="Page up" title="Scroll to the top" style={{cursor:"pointer", height:"40px", width:"40px"}} src={icon} />
                      </span>
                  </div>
          
          <div id="info" style={{visibility:"hidden", paddingBottom:"20px", paddingTop:"20px", textAlign:"left", height:"auto", width: '40%', margin: 'auto', border:"2px solid #393F44 ", marginTop:"60px"}}>             
          </div>
    

    </div>
    </div>    
  

  );
};
}

export default App;
