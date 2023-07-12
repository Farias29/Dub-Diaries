import React from 'react';
import { Header } from './AboutUs';
import { Chart } from "react-google-charts";

const data = [
    ["Hours Of Sleep", "Day, Hours"],
    [1, 4], [2, 6], [3, 12], [4, 10], [5, 8],
    [6, 4], [7, 6], [8, 7], [9, 4], [10, 6],
    [11, 8], [12, 7], [13, 5], [14, 4], [15, 5],
    [16, 2], [17, 13], [18, 8], [19, 7], [20, 4],
    [21, 6], [22, 5], [23, 5], [24, 4], [25, 4],
    [26, 7], [27, 6], [28, 3], [29, 7], [30, 8],
  ];
  const decData = [
    ["Hours Of Sleep", "Day, Hours"],
    [1, 4], [2, 6], [3, 12], [4, 10], [5, 8],
    [6, 4], [7, 6], [8, 7], [9, 4], [10, 6],
    [11, 8], [12, 7], [13, 5], [14, 4], [15, 5],
    [16, 2], [17, 13], [18, 8], [19, 7], [20, 4],
    [21, 6], [22, 5], [23, 5], [24, 4], [25, 4],
    [26, 7], [27, 6], [28, 3], [29, 7], [30, 8],
    [31, 12],
  ];
  
  const options = {
    title: "Hours Of Sleep Per Day",
    width: "750px",
    height: "450px",
    legend: { position: "none" },
    hAxis: { title: "Days Of The Month"},
    vAxis: { title: "Hours Of Sleep"},
  };

  function SleepCard(props){
    const title = props.title;
    const chart = props.chart;
    return(
            <div className="d-flex row-sm-6 col-lg-6 col">
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                        {chart}
                    </div>
                    <div>         
                    </div>
                </div>
            </div>
    )
    }

export function SleepingLog(){
return(
    <div>
    {Header("Sleeping Log")}
        <div className="card-deck" >
            <div className="row">
            <SleepCard title={'September'} chart={<Chart chartType="ScatterChart" width="100%" height="400px" data={data} options={options}/>} />
            <SleepCard title={'October'} chart={<Chart chartType="ScatterChart" width="100%" height="400px" data={decData} options={options}/>} />
            <SleepCard title={'November'} chart={<Chart chartType="ScatterChart" width="100%" height="400px" data={data} options={options}/>} />
            <SleepCard title={'December'} chart={<Chart chartType="ScatterChart" width="100%" height="400px" data={decData} options={options}/>} />
            </div>
        </div>
    </div>
)
}