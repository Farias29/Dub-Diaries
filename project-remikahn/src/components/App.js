
import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate, useNavigate, Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// importing functions
import { Card } from './AboutUs.js';
import { NavBar } from './Navigation.js'
import { AboutUs } from './AboutUs';
import { LogIn } from './Login.js'
import { DiaryPage } from './DiaryPage.js';
import { Stats } from './Stats'
import { HomePage } from './HomePage.js';
import { ChooseJournal } from './ChooseJournal.js';
import { MoodTracker } from './moodtracker';
import { SleepingLog } from './sleepinglog';
import DEFAULT_USERS from '../data/users.json';
import { EntryDetail } from './EntryDetail.js';
import { ViewJournal } from './ViewJournal.js';
import '../CSS/index.css';
import '../CSS/navBar.css';

export default function App(props){
    const [currentUser, setCurrentUser] = useState(DEFAULT_USERS[0]) //default to null user
    console.log("rendering app, user is", currentUser.displayName);
  
    const navigateTo = useNavigate(); //navigation hook
  
    //effect to run when the component first loads
    useEffect(() => {
      //log in a default user
      // loginUser(DEFAULT_USERS[1])
  
      const auth = getAuth();
      //                 authenticator, a callback
      onAuthStateChanged(auth, (firebaseUser) => {
        if(firebaseUser) {
            // console.log("1 signing in as", firebaseUser.displayName)
            // console.log("2", firebaseUser);
          firebaseUser.userId = firebaseUser.uid;
            // console.log("3 uid is",firebaseUser.userId)
          firebaseUser.userName = firebaseUser.displayName;
          firebaseUser.userImg = firebaseUser.photoURL || "/img/placeholder.jpg";
          setCurrentUser(firebaseUser);
        }
        else { //no user
          // console.log("signed out");
          setCurrentUser(DEFAULT_USERS[0]); //change the null user
        }
      })
 
  
    }, []) //array is list of variables that will cause this to rerun if changed
  // console.log("4 userid", currentUser.userId);
  
    const loginUser = (userObj) => {
      setCurrentUser(userObj);

      if(userObj.userId !== null){
        navigateTo('home'); //go to journals after login
      }
    }

    // console.log("5 current", currentUser);
    // console.log("6 userId is", currentUser.userId);
    return(
    <div>
        <main>
            <div id="navs">
              <NavBar currentUser={currentUser}/>
            </div>
        </main>

        <Routes>
            
            <Route path ="login" element={<LogIn currentUser={currentUser} loginCallback={loginUser}/>} />
            <Route path ="stats/sleepinglog" element={<SleepingLog/>} />
            <Route path ="stats/moodtracker" element={<MoodTracker/>} />
            {/* add protected routes */}
            <Route element={<ProtectedPage currentUser={currentUser} />}>
              <Route path="home" index element={<HomePage promptArr={props.promptArr}/>}/>
              <Route path="stats" element={<Stats/>} />
              <Route path="aboutus" element={<AboutUs people={props.people}/>} />
              <Route path="choosejournal" element={<ChooseJournal options={props.options} currentUser={currentUser}/>} />
              <Route path="DiaryPage" element={<DiaryPage 
                colorArr={props.colorArr} 
                fontArr={props.fontArr}
                sizeArr={props.sizeArr}
                textColorArr={props.textColorArr} 
                currentUser={currentUser}
              />} />
              <Route path="home/:title" element={<EntryDetail />}/>
              <Route path="choosejournal/:type" element={<ViewJournal />}/>
              <Route path="choosejournal/:type/:title" element={<EntryDetail />}/>
              <Route path="*" element={<Navigate to="/home" />} />
            </Route>
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        
        <footer className="container">
            <p>&copy; 2022 INFO 340: Remi, Shiina, Mari, Johnny</p>
        </footer>
    </div>
    )
}

function ProtectedPage(props) {
    //...determine if user is logged in
    if(props.currentUser.userId === null) { //if no user, send to sign in
      return <Navigate to="/login" />
    }
    else { //otherwise, show the child route content
      return <Outlet />
    }
  }