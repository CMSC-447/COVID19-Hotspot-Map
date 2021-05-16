import React from 'react'
import {Bar} from "react-chartjs-2"
import county_data from './data/total_county_data.json'


var randomColorGenerator = function () { 
    var color = [];
    for(var i = 0; i < 58; i++){
        if(county_data[i].conf_cases < 10){
            color.push('#FAF3AD');
        }
        else if(county_data[i].conf_cases < 1000){
            color.push('#F3CC71');
        }
        else if(county_data[i].conf_cases < 10000){
            color.push('#EEAE33');
        }
        else if(county_data[i].conf_cases < 100000){
            color.push('#DD7225');
        }
        else if(county_data[i].conf_cases >= 100000){
            color.push('#B4461F');
        }

    }
    return color; 
};

function Bchart(){
    var covid_data = [];
    var label = [];
    for(var i = 0; i < 58; i++ ){
        // console.log(county_data[i].conf_cases)
        // console.log(county_data[i].county)
        covid_data.push(county_data[i].conf_cases);
        label.push(county_data[i].county);
    }
    const data = {
        labels: label,
        datasets: [
            {
                label: 'County Cases Mar 2020 - May 2021',
                data: covid_data,
                backgroundColor: randomColorGenerator(),
            }
        ]
    }
    return(
        <Bar data={data} />
    )
}
export default Bchart