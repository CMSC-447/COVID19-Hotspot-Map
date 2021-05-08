import React from "react";
import MyMap from "./components/mymap";
import './App.css'

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
      selectCounty:'None',
      selectPrison:'None',
      theDate: '',
      pri_uni_ref:[],
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
      //console.log(data)
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

  async getData() {
    const response = await fetch('/getData/' + this.state.pri_uni_ref + " " + this.state.theDate);
    const data = await response.json();

    if (response.ok){
      console.log("Connected to backend API from getData().");
    }
    else {
      console.log("Could not connect to backend API from getData().");
    }


    return data;
  }


  async componentDidMount() {
    cty = this.loadCounties();
    pri = this.getPrison();

    //console.log(cty);


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
      }
      else {
        this.setState({ 
          prisons: [],
          selectPrison: 'None',
          selectCounty: 'None'
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

    //console.log(event.target.value)

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
  handleInputChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  // data collected for the whole form
  handleSubmit=(event) => {
    event.preventDefault()

    var pass_data = this.getData();
    console.log("Fetched data", pass_data)

    //const Data = this.state
    //console.log("final data", Data)

  } 
 
  render() {  
    const {theDate} = this.state 
    const {selectPrison} = this.state  
    const {selectCounty} = this.state
    return (

      <div>   
     
      <div>
        <div > <h1 
        style = {{textAlign: "Center"}}> California Covid-19 Hotspot Map</h1></div>
     
      
      <form onSubmit={this.handleSubmit}>
        <div style={{margin:"auto", width:"80%", display:"block", overflow:"auto"}}>
        
        
        <div style={{float:"left" }}>

          <select  style={{marginRight:"50px", marginBottom:"25px", paddingLeft:"10px", height:"30px", width:"200px", border:"2px black solid", backgroundColor:"#393F44", color:"#D8D9DA"}} value={this.state.selectCounty} onChange={this.selectLACounty.bind(this)}>
           
            <option value=""  defaultValue >SELECT COUNTY</option>
            {this.state.county.map(x => {
              return <option key={x.c_name}>{x.c_name}</option>
            })}

          </select>

          <select onChange={this.selectLAPrison.bind(this)} value={this.state.selectPrison} style={{marginBottom:"25px", marginRight:"50px", paddingLeft:"10px", height:"30px", width:"200px", border:"2px black solid", backgroundColor:"#393F44", color:"#D8D9DA"}}>
           
            <option value="" defaultValue>SELECT PRISON</option>
            {
              this.state.prisons.map(x => { 
                return <option  key={x.p_name}>{x.p_name}</option>     
              })
            }
          
          </select>

        </div>
        
        <div style={{float:"left" }}>

          <input id="myDate" type="date" name="theDate" onChange= {this.handleInputChange} style={{ marginBottom:"25px", marginRight:"50px", height:"30px", width:"170px", border:"2px black solid", backgroundColor:"#393F44", color:"#D8D9DA", paddingLeft:"10px"}}></input>
      
          <button style={{ marginBottom:"25px", height:"30px", width:"100px",  marginRight:"50px", border:"2px black solid", backgroundColor:"#393F44", color:"#D8D9DA", paddingLeft:"10px"}}>SUBMIT</button>

        </div>
        </div>

        </form>
       

            {this.datetime()}
        
            <p>You Chose</p>
            <p>County: {selectCounty}</p>
            <p>Prison: {selectPrison}</p>
            <p>Date: {theDate}</p>
        </div>

        <div>
    
          <MyMap />
      </div>

      </div>    

    );
  };
}

export default App;
