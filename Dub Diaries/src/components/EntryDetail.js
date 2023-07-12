import React from 'react';
import ENTRY_DATA from '../data/entries.json';
import { useParams, Link } from 'react-router-dom';

import _ from 'lodash';

export function EntryDetail(props) {
    const urlParams = useParams();
    const entryNameString = urlParams.title;

    let entry = _.find(ENTRY_DATA, {title: entryNameString});
    console.log(entry.image);
    if(!entry) return <h2>No entry found</h2>

    return (
        <section className="d-flex px-4 py-4">
            <div className="container px-4 py-5 entryDetail">
                <p>
                    <Link to="/home">Home</Link> /
                    <Link to="/choosejournal" className="container">Journals</Link>/ 
                    <span className="pl-2">{entry.journal}</span> / {entry.title}
                </p>
                <h1><strong>{entry.title}</strong></h1>
                <p>{entry.date}</p>
                <p><span className="badge dark rounded-pill text-dark">{entry.mood}</span>  
                <span className="badge dark rounded-pill text-dark">{entry.journal}</span></p>
                <hr />
                <p>{entry.desc}</p>
            </div>
        </section>
    )
}