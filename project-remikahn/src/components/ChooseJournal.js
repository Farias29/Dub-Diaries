import React, { useState } from 'react';
// import { HomeCard } from './HomePage.js';
import { Header } from './AboutUs.js';
import { useNavigate, NavLink, Link } from 'react-router-dom';


export function JournalCard(props){
    const journData = props.journData;
    let index = props.index;
    let currentUser = props.currentUser;
    const title = props.title;
    const type = journData.type;

    // button click call back to navigate to correct page
    const navigate = useNavigate();
    const toDiaryPage = () => {
        navigate('/DiaryPage');
    };
        
    return(
        <div className="d-flex col-md-6 col-lg-4">
            <div className="card journalCard">

            <img className="card-img-top" id="chosen" src={journData.img} alt="placeholder" /> 
            
                <div className="card-body">
                    <div className="col-sm">
                       <h2 className="card-title text-center text-responsive cardTextTitle">{journData.title}</h2>
                        <p className="card-text">{journData.descr}</p>
                        <Link to={type} className="btn btn-outline-primary" aria-label={journData.butOne}> {journData.butOne} </Link>
                        <button href="" className="btn btn-outline-primary" aria-label={journData.butTwo} onClick={toDiaryPage}>{journData.butTwo}</button>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export function ChooseJournal(props){
    const months = props.options;
    const currentUser = props.currentUser;

    let monthArray = months.map((obj) => {
        let newJournal = <JournalCard key={obj.title} journData={obj} />
        return newJournal;
    })

    return(
        <div>
            {Header("Choose A Journal")}
            <div className="container" id="choose">
                <div className="row">
                    {monthArray}
                </div>
            </div>
        </div>
    )
}