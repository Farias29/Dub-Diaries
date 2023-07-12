import React from 'react';
import ReactDOM from 'react-dom/client';
import {initializeApp} from "firebase/app";
import {BrowserRouter} from 'react-router-dom';

//import css
import 'bootstrap/dist/css/bootstrap.css';
import './CSS/index.css';
import './CSS/navBar.css';

//importing pages/functions
import App from './components/App';
import TEAM_MATES from './data/aboutus.json';
import JOURNAL_TYPES from './data/journals.json';
import ENTRY_LIST from './data/entries.json';
import DEFAULT_USERS from './data/users.json';
import PROMPT_ARR from './data/prompts.json';

// Diary Page Settings
import COLOR_ARR from './data/moodColors.json';
import FONT_ARR from './data/fontNames.json';
import SIZE_ARR from './data/fontSizes.json';
import TEXT_COLOR_ARR from './data/textColors.json';


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBmVITikeOG7vTyTJsNu7iw-b83rxSBIAc",
  authDomain: "dubdiaries-cc6f8.firebaseapp.com",
  databaseURL: "https://dubdiaries-cc6f8-default-rtdb.firebaseio.com",
  projectId: "dubdiaries-cc6f8",
  storageBucket: "dubdiaries-cc6f8.appspot.com",
  messagingSenderId: "724842001385",
  appId: "1:724842001385:web:0c0b1c160405f13562d178"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <App 
      people={TEAM_MATES} 
      options={JOURNAL_TYPES} 
      colorArr={COLOR_ARR} 
      fontArr={FONT_ARR}
      sizeArr={SIZE_ARR}
      textColorArr={TEXT_COLOR_ARR}
      users={DEFAULT_USERS}
      promptArr={PROMPT_ARR}
    />
  </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
