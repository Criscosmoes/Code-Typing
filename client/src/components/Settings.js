import React, {useEffect } from 'react'
import styled from "styled-components"; 
import Countdown from 'react-countdown';




import { Link } from "react-router-dom"; 

// icons 
import { BiHomeAlt } from "react-icons/bi"; 
import { BiUser } from "react-icons/bi";
import { AiOutlineTable } from "react-icons/ai"; 
import { RiArrowLeftCircleLine} from "react-icons/ri"
import { FcGoogle } from "react-icons/fc";
import { FiSettings } from "react-icons/fi"; 

// languages 
import { AiOutlineHtml5 } from "react-icons/ai";
import { IoLogoCss3 } from "react-icons/io";
import { SiJavascript } from "react-icons/si"; 
import { SiPython } from "react-icons/si"; 



import { connect } from 'react-redux';

import { logoutUser } from "../actions"; 




// Input Area code 

import axios from "axios"; 





//

const StyledSettings= styled.div`

@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap'); 


& {
    display: flex; 
    justify-content: center; 
    height: 800px; 
    background: #202020;

}


// first div area 

.navigation {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    width: 22%; 
    font-family: 'Karla', sans-serif;
    border-right: 2px solid gray; 
}

.typing--area {
    width: 79%; 
}

.results {
    width: 20%;  ; 
}

.link {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    width: 100%;
    height: 120px; 
    color: white;
    transition: ease-out .3s; 
}

.link:hover {
    background: gray;  
    transition: ease-in .3s; 
}

.link--container {
    width: 100%; 
}

.icon {
    font-size: 3.5rem; 
    width: 20%;
    border: none; 
}

h2 {
    font-size: 3rem; 
    width: 80%; 
}

// middle area 


.typing--area {
    display: flex; 
    justify-content: space-evenly;
    align-items: center; 
    flex-direction: column; 
    color: white; 
    font-family: 'Karla', sans-serif;
}

h1 {
    font-size: 8rem; 
}


.choose--language {
    height: 78%;
    width: 100%; 
}

.choose--language > * {
    margin: 3%
}

label {
    font-size: 5rem; 
}

select {
    width: 15%; 
    font-size: 2.5rem;
    padding: .5%; 
    outline: none; 
    background: gray;
}

option {
    border: 1px solid black; 
}




`

const Settings = ({leaders, username}) => {


    const isUserloggedIn = user => {

        if(user){
            return <Link onClick={onLogOutClick} className="link"><RiArrowLeftCircleLine className="icon"/><h2>Log Out</h2></Link>
        }
        else {
            return <Link onClick={onLogInClick} className="link"><FcGoogle className="icon"/><h2>Log in</h2></Link>
        }
    }

    const onLogInClick = () => {

        window.location = "/auth/google"; 
    }

    const onLogOutClick = () => {

        logoutUser(); 
        
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const renderedLeaders = leaders.map((cur, index) => {

        return (
            <div className="leaders">
                <div className="place">{index + 1}. </div>
                <h2 className="name">{capitalizeFirstLetter(cur.name)}</h2>
                <div className="score">WPM: <span>{cur.wordsPerMinute}</span></div>
            </div>
        )
    })

    return (
        <StyledSettings>
            <div className="navigation">
                <div className="link--container">
                    <Link to="/" className="link"><BiHomeAlt className="icon"/><h2>Home</h2></Link>
                    <Link to="/leaderboard" className="link"><AiOutlineTable className="icon"/><h2>Leaderboard</h2></Link>
                    <Link to="/settings" className="link"><FiSettings className="icon" /><h2>Settings</h2></Link>
                    {isUserloggedIn(username)}
                </div>
            </div>
            <div className="typing--area">
                <h1>Settings</h1>
                
                <div className="choose--language">
                    <label for="languages">Choose a language: </label>
                    <select name="languages">
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                    </select>
                </div>
            </div>
        </StyledSettings>
    )
}

const mapStateToProps = state => {


    return {
        leaders: state.leaderboards, 
        username: state.currentUser.username, 
    }
}

export default connect(mapStateToProps)(Settings)
