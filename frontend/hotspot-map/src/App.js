import React from "react";
import MyMap from "./components/mymap";
import './App.css'

function App() {
  return (
    <div>
        <h1 style = {{textAlign: "Center"}}> Covid-19 Hotspot Map</h1>
          <MyMap />
    </div>

  );
}

export default App;
