import React, { useState }from 'react';
import { NavLink } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';

const getNavLogo = (props) => {
    const logo = (
        <NavLink to="/home" className="logo">
            <span className="material-icons" aria-label="Home" id="diaryLogo">auto_stories</span>
        </NavLink>
    );
    return (logo);
}

export function NavBar(props) {
    const currentUser = props.currentUser;
    const logo = getNavLogo(props); 

    const handleSignOut = (event) => {
        signOut(getAuth());
    }
      
    function inOrOut(props) {
        if(currentUser.userId){
            return (
                <NavLink to="/login" id="burger-navtitles" onClick={handleSignOut}>
                    Log Out
                </NavLink>
            )
        } else if(!currentUser.userId){
            return (
                <NavLink to="/login" id="burger-navtitles">
                    Log In
                </NavLink>
            )
        }
    }

    const [open, setOpen] = useState(false);
    const clickedButton = () => {
        setOpen(!open);
    };

    return(
    <nav className="navBar">
        <div className="brandTitle">
            {logo}
        </div>
            <div className="hamburgerMenu" onClick={clickedButton}>
                <button className="material-symbols-outlined">menu</button>
            </div>

            <div className="nav-links">
                <ul>
                    <li className="nav-item"><NavLink to="/stats" id="navtitles">
                        Stats</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/choosejournal" id="navtitles">
                        Journals</NavLink>
                    </li>
                    <li className="nav-item"><NavLink to="/aboutus" id="navtitles">
                        About Us</NavLink>
                    </li>
                    <li className="nav-item">
                        {inOrOut(currentUser.userId)}
                    </li>
                </ul>
            </div>
            <div className={open ? "burger-nav-links expanded" : "burger-nav-links hide"}>
                <ul>
                    <li className="burger-nav-item"><NavLink to="/stats" id="burger-navtitles">
                        Stats</NavLink>
                    </li>
                    <li className="burger-nav-item">
                        <NavLink to="/choosejournal" id="burger-navtitles">
                        Journals</NavLink>
                    </li>
                    <li className="burger-nav-item"><NavLink to="/aboutus" id="burger-navtitles">
                        About Us</NavLink>
                    </li>
                    <li className="burger-nav-item">
                        {inOrOut(currentUser.userId)}
                    </li>
                </ul>
            </div>
    </nav>
);}



