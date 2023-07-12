import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, set as firebaseSet, onValue, push as firebasePush } from 'firebase/database' //realtime
import { DiaryText } from './DiaryText.js';
import { DiarySettings } from './DiarySettings.js';

export function DiaryPage(props) {
    const currentUser = props.currentUser;


  const urlParamObj = useParams(); //get me the url parameters
  const journalList = [
    'personal', 'school', 'fun']

    const currentJournal = urlParamObj.type;
    const [chatMessages, setChatMessages] = useState([]);

      //run this function when the component first loads
  useEffect(() => {

    const db = getDatabase(); //"the database"
    console.log(db);
    const allMessageRef = ref(db, "allMessages");
    


    //when db value changes
    const offFunction = onValue(allMessageRef, (snapshot) => {
      const valueObj = snapshot.val();
      console.log(valueObj); //undefined
      //convert object into array
      const objKeys = Object.keys(valueObj);
      const objArray = objKeys.map((keyString) => {
        const theMessageObj = valueObj[keyString];
        theMessageObj.key = keyString;
        return theMessageObj;
      })
      setChatMessages(objArray);
    })

    function cleanup() {
      console.log("component is being removed");
    //when the component goes away, we turn off the listener
    offFunction();
    }
    return cleanup; //return instructions on how to turn off lights
  }, [])


  const addMessage = (inTitle, inDate, inText) => {
    const userObj = currentUser;
    const newMessage = {
      "userId": userObj.userId,
      "userName": userObj.userName,
      "userImg": userObj.userImg,
      "title": inTitle,
      "date": inDate,
      "type": inText,
      "timestamp": Date.now(),
      "journal": currentJournal
    }

    const db = getDatabase(); //"the database"
    const allMessageRef = ref(db, 'allMessages');
    firebasePush(allMessageRef, newMessage);
  }


    return (
        <div>
            <main className="diaryPage">
                <div className="all">
                    <section className="page-column">
                        <DiaryText currentUser={currentUser} addMessageCallback={addMessage}/>
                    </section>
                    <section className="settings-column">
                        <DiarySettings
                            colorArr={props.colorArr}
                            fontArr={props.fontArr}
                            sizeArr={props.sizeArr}
                            textColorArr={props.textColorArr}
                        />
                    </section>
                </div>
            </main>
        </div>
    );
}


