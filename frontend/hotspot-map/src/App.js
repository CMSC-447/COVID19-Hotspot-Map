import React from "react";
import MyMap from "./components/mymap";
import './App.css'


class App extends React.Component {

  async loadDB() {
    const response = await fetch('/hello');   //how it gets backend
    if (response.ok){
      const responseText = await response.text();
      console.log("Connected to backend API.");
    }
    else {
      console.log("Could not connect to backend API.");
    }
  }

  async componentDidMount() {
    this.loadDB();
  }
  
  render() {
    return (
      <div>
          <h1 style = {{textAlign: "Center"}}> Covid-19 Hotspot Map</h1>
            <MyMap />
      </div>

    );
  };
}

export default App;
