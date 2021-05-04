import React from "react";
import MyMap from "./components/mymap";
import './App.css'
import 'react-datepicker/dist/react-datepicker.css'

// making todays date accessible to all the methods
var displaytodaydate;

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
    };

  }

  // to find the today's date
  datetime = () =>{

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
  async loadDB() {
    const response = await fetch('/hello');   //how it gets backend
    if (response.ok){
      
      console.log("Connected to backend API.");
    }
    else {
      console.log("Could not connect to backend API.");
    }
  }

  async componentDidMount() {
    this.loadDB();

    //probably need to move this to a new method
    if(!document.getElementById("myDate").value){
      document.getElementById("myDate").value = displaytodaydate;
    }

    this.setState({
      county: [
        {name: 'county', prisons:['a','b','c']},
        {name: 'county2', prisons:['d','e','f']},
      ],
      theDate: displaytodaydate
    });
  }

  // for the drop down menus
  selectLACounty(event){
    
    this.setState({ selectCounty: event.target.value});
    
    // if there is a county value set
    if(event.target.value){
      this.setState({ prisons: this.state.county.find(x => x.name === event.target.value).prisons});
    }
    // else: empty the prisons array (if previousy populated), set prison and county to none
    else{
      this.setState({ 
        prisons: [],
        selectPrison: 'None',
        selectCounty: 'None'
    });
    }
    console.log(event.target.value)
  }


  selectLAPrison(event){
    
    // if a value is set for prison
    if(event.target.value){
      this.setState({
        selectPrison: event.target.value
      });
    }
    // if the user goes back to having no value for prison
    else{
      this.setState({ 
        selectPrison: 'None',
    });
    }
    console.log(event.target.value)
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
  handleSubmit=(event) =>{
    event.preventDefault()
    const Data = this.state
    console.log("final data", Data)

  } 
 
  render() {  
    const {theDate} = this.state 
    const {selectPrison} = this.state  
    const {selectCounty} = this.state
    return (

      <div>   
     
      <div>
        <div > <h1 
        style = {{textAlign: "Center"}}> Covid-19 Hotspot Map</h1></div>
     
      
      <form onSubmit={this.handleSubmit}>
        <div style={{margin:"auto", width:"80%", display:"block", overflow:"auto"}}>
        
        
        <div style={{float:"left" }}>

          <select  style={{marginRight:"50px", marginBottom:"25px", paddingLeft:"10px", height:"30px", width:"200px", border:"2px black solid", backgroundColor:"#393F44", color:"#D8D9DA"}} value={this.state.selectCounty} onChange={this.selectLACounty.bind(this)}>
           
            <option value=""  defaultValue >SELECT COUNTY</option>
            {this.state.county.map(x => {
              return <option key={x.name}>{x.name}</option>
            })}

          </select>

          <select onChange={this.selectLAPrison.bind(this)} value={this.state.selectPrison} style={{marginBottom:"25px", marginRight:"50px", paddingLeft:"10px", height:"30px", width:"200px", border:"2px black solid", backgroundColor:"#393F44", color:"#D8D9DA"}}>
           
            <option value="" defaultValue>SELECT PRISON</option>
            {
              this.state.prisons.map(x => { 
                return <option  key={x}>{x}</option>     
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
