import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from './AboutUs';

function StatCard(props){
const title = props.title;
const text = props.text;
const source = props.source;
const alt = props.alt;
const route = props.route;
return(
        <div className="d-flex row-sm-6 col-lg-6">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{text}</p>
                </div>
                <div className="border">
                    <Link to={route}>            
                        <img className="card-img-top" src={source} alt={alt}/>
                    </Link>
                </div>
            </div>
        </div>
)
}

export function Stats(){
return(
    <div>
    {Header("Stats")}
        <div className="card-deck" id="stats">
            <div className="row">
            <StatCard title={'Mood Tracker'} text ={'Analyze your mood trends by clicking the image'} source={'img/bar_graph.jpg'} alt={'Mood Tracker'} route ={'/stats/moodtracker'} />
            <StatCard title={'Sleeping Log'} text ={'Analyze your sleeping trends by clicking the image'} source={'img/line_graph.jpg'} alt={'Sleeping Log'} route ={'/stats/sleepinglog'}/>
            </div>
        </div>
    </div>
)
}