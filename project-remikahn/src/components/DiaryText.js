import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { getDatabase, ref as dbRef, set as firebaseSet, push as firebasePush} from 'firebase/database';
import ENTRY_DATA from '../data/entries.json';


export function DiaryText(props) {
    const [stateData, setStateData] = useState(ENTRY_DATA);

    const [alertMessage, setAlertMessage] = useState(null);
    const initialValues = {
        title: "",
        date: "",
        text: ""
    };

    const [values, setValues] = useState(initialValues);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };

    fetch(values)
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {
        if(data.length === 0){
            setAlertMessage("Hey! Make sure to input some text!")
        }
    })
    .catch(function(error) {
        setAlertMessage(error.message)
    });

    const entryHeading = getTitleAndDate(props);
    const entryText = getUserText(props, props.userFont);

    const addMessageCallback = props.addMessageCallback;
    let currentUser = props.currentUser;

    function getTitleAndDate(props) {

        const titleElem = (
            <td className="titleTextBoxAdjustSize">
                <input className="title textbox" id="user-diary-title" type="textbox" placeholder="Diary Entry Title Here" name="title" onChange={handleInputChange} value={values.title} label="Edit Title"></input>
            </td>
        );

        const dateElem = (
            <td>
                <input className="journalDate textbox" id="user-diary-date" type="textbox" placeholder="MM/DD/YYYY" name="date" onChange={handleInputChange} value={values.date} label="Edit Date"></input>
            </td>
        );

        return (
            <table className="titleTextboxContainer">
                <tbody>
                    <tr>
                        {titleElem}
                        {dateElem}
                    </tr>
                </tbody>
            </table>
        );
    }

    function getUserText(props) {

        return (
            <textarea 
                className="journalText textbox" 
                id="user-diary-text" 
                type="textbox" 
                placeholder="Start typing here..." 
                style={{font: "Open Sans"}} 
                name="text" 
                onChange={handleInputChange} 
                value={values.text} 
                label="Edit Textbox"
            ></textarea>
        );
    }

    const handleSubmitChange = (event) => {

        let entry = {
            "title":values.title,
            "date":values.date,
            "desc":values.text
        };
        // entry["title"] = values.title;
        // entry["date"] = values.date;
        // entry["desc"] = values.text;

        stateData.push(entry);
        setStateData(stateData);
        setValues("");

        const db = getDatabase();
        const refStringTitle = values.title;

        const refStringDate = values.date;

        const refStringTyped = values.text;

        const userTitleRef = dbRef(db, currentUser.userId+"/"+Date.now()+"/title"); 

        const userDateRef = dbRef(db, currentUser.userId+"/"+Date.now()+"/date");

        const userTypedRef = dbRef(db, currentUser.userId+"/"+Date.now()+"/text");
      
        
        firebaseSet(userTitleRef, refStringTitle);
        firebaseSet(userDateRef, refStringDate);
        firebaseSet(userTypedRef, refStringTyped);

    }

    return (
        <div>
            <div className="button-box">
                <a href='/choosejournal'>
                    <span className="material-icons exit-icon">close</span>
                </a>
            </div>
            {entryHeading}
            {entryText}
            <form >
                <NavLink to="/choosejournal"className="btn-for-submit-diary" id="user-diary-submit" type="submit" onClick={handleSubmitChange}>Save Entry</NavLink>
            </form>
        </div>
    );
}
