import React from 'react';
import { Navigate } from 'react-router-dom';
import { Header } from './AboutUs.js';


import { getAuth, EmailAuthProvider, GoogleAuthProvider} from 'firebase/auth';

import {StyledFirebaseAuth} from 'react-firebaseui';

import DEFAULT_USERS from '../data/users.json';

export function LogIn(props){
    //the authenticator
  const currentUser = props.currentUser;
  // console.log("currentUser: ");
  // console.log(typeof currentUser);

  const loginFunction = props.loginCallback;
  const auth = getAuth();
  const configObj = {
    signInOptions: [ 
      { 
        provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true 
      },
      { 
        provider: GoogleAuthProvider.PROVIDER_ID
      }
    ],
    signInFlow: 'popup', 
    credentialHelper: 'none', 
    callbacks: {
      signInSuccessWithAuthResult: () => false 
    }
  }
  
  const handleClick = (event) => {
    const whichUser = event.currentTarget.name //access button, not image
    console.log(whichUser);
    const selectedUserObj = DEFAULT_USERS.filter((userObj) => userObj.userId === whichUser)[0] || DEFAULT_USERS[0] //null user if not found

    loginFunction(selectedUserObj)
  }

  if(currentUser.userId) { //if signed in
    return <Navigate to="/home" />
  }
    
  return(
  <div>
    {Header("Log In")}
    <main>
      <div className="card loggingin">
          <StyledFirebaseAuth firebaseAuth={auth} uiConfig={configObj} />
      </div>
    </main>
    </div>
  )
}
