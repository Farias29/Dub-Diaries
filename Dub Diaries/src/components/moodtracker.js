import React from 'react';
import { Header } from './AboutUs';
import { Chart } from 'react-google-charts';
import { useState } from 'react';

function Checkbox(props) { 
    const [checked, setChecked] = useState(false);
    const emotion = props.emotion;
    const days = props.days;
    const color = props.color;
    const handleChange = () => { 
      
      setChecked(!checked);

    }; 
    return ( 
      <div>
        {color}
        <h5>{emotion}: <input type="checkbox" onChange={handleChange}/> </h5>
       {checked ? "You have been " + emotion + " " + days + " times this month." : ""}
    </div> 
    ); 
  };

const calm = ["Calm", 9, "green", null];
const sparkly = ["Sparkly", 6, "yellow", null];
const chill = ["Chill", 5, "blue", null];
const angry = ["Angry", 4, "red", null];
const bubbly = ["Bubbly", 2, "orange", null];
const cute = ["Cute", 2, "pink", null];
const complicated = ["Complicated", 2, "purple", null];

    const data = [
        [
          "Emotions",
          "Number Of Days",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        calm,
        sparkly,
        chill,
        angry,
        bubbly,
        cute,
        complicated
      ];
      
      const options = {
        title: "Amount Of Days With Emotion",
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
        hAxis: { title: "Number of Days"},
        vAxis: { title: "Emotions"},
      };

function DataCard(props){
const title = props.title;
const chart = props.chart;
return(
        <div className="d-flex row-sm-6 col-lg-6">
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">{title}</h5>
                    {chart}
                    <h3>Click to see how many times you have been an emotion this month!</h3>
                    <Checkbox emotion={'Calm'} days={9} color={"Green"} />
                    <Checkbox emotion={'Sparkly'} days={'6'} color={"Yellow"} />
                    <Checkbox emotion={'Chill'} days={'5'} color={"Blue"} />
                    <Checkbox emotion={'Angry'} days={'4'} color={"Red"} />
                    <Checkbox emotion={'Bubbly'} days={'2'} color={"Orange"} />
                    <Checkbox emotion={'Cute'} days={'2'} color={"Pink"} />
                    <Checkbox emotion={'Complicated'} days={'2'} color={"Purple"} />
                </div>
                <div>         
                </div>
            </div>
        </div>
)
}

export function MoodTracker(){
return(
    <div>
    {Header("Mood Tracker")}
        <div className="card-deck" >
            <div className="row">
            <DataCard title={'November'} chart={ <Chart chartType="BarChart" width="100%" height="400px" data={data} options={options} />}/>
            <DataCard title={'December'} chart={ <Chart chartType="BarChart" width="100%" height="400px" data={data} options={options} />}/>
            </div>
        </div>
    </div>
)
}