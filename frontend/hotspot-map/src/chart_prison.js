import React from 'react'
import {Bar} from "react-chartjs-2"
import pri_data from './data/total_pri_data.json'
import marker from './data/markers.json'


var randomColorGenerator = function () { 
    var color = [];
    for(var i = 0; i < Object.keys(pri_data).length; i++){
        if(pri_data[i].conf_cases < 600){
            color.push('#049CE6');
        }
        else if(pri_data[i].conf_cases < 1200){
            color.push('#038ACC');
        }
        else if(pri_data[i].conf_cases < 1800){
            color.push('#0379B3');
        }
        else if(pri_data[i].conf_cases < 2400){
            color.push('#026899');
        }
        else if(pri_data[i].conf_cases >= 2400){
            color.push('#025780');
        }

    }
    return color; 
};

function Bchart(){
    var covid_data = [];
    var label = [];
    for(var i = 0; i < Object.keys(pri_data).length; i++ ){
        // console.log(county_data[i].conf_cases)
        // console.log(county_data[i].county)
        covid_data.push(pri_data[i].conf_cases);
        for(var j = 0; j < Object.keys(marker).length; j++){
            if (pri_data[i].uni_ref === marker[j].uni_ref){
                label.push(marker[j].p_name)
            }
        }
    }
    const data = {
        labels: label,
        datasets: [
            {
                label: 'Prison Cases Mar 2020 - May 2021',
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