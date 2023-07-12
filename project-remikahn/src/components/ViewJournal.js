import React from 'react';
import ENTRY_DATA from '../data/entries.json';
import { useParams, Link } from 'react-router-dom';
import { EntryCardList } from './HomePage.js'

import _ from 'lodash';

export function ViewJournal(props) {
    const urlParams = useParams();
    const entryTypeString = urlParams.type;

    let data = ENTRY_DATA;
    data = data.filter(entry => (entry.journal).toLowerCase().includes(entryTypeString.toLowerCase()) == true);
    if(data.length == 0) return ( 
        <div className="container">
            <div className="d-flex px-4 py-4 justify-content-center">
                <h2>No entries found</h2>
            </div>
            <div className="d-flex justify-content-center">
                <Link to="/choosejournal">Back to journals</Link>
            </div>
        </div> 
    );

    return (
        <div className="container py-4">
            <div className="d-flex px-2 py-4">
                <Link to="/choosejournal">Back to journals</Link>
            </div>
            <div className="d-flex px-4 py-4 justify-content-center">
                <h1>Your <strong>{entryTypeString}</strong> Journal</h1>
            </div>
            <div id="class-cards" className="row">
                <EntryCardList entries={data}/> 
            </div>
        </div>
    )
}