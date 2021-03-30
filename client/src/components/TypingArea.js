import React, {useState} from 'react'
import styled from "styled-components"; 

import { Link } from "react-router-dom"; 

// icons 
import { BiHomeAlt } from "react-icons/bi"; 
import { BiUser } from "react-icons/bi";
import { AiOutlineTable } from "react-icons/ai"; 
import { RiArrowLeftCircleLine} from "react-icons/ri"
import { FcGoogle } from "react-icons/fc";

// languages 
import { AiOutlineHtml5 } from "react-icons/ai";
import { IoLogoCss3 } from "react-icons/io";
import { SiJavascript } from "react-icons/si"; 
import { SiPython } from "react-icons/si"; 


import InputArea from './InputArea';
import { connect } from 'react-redux';

import { logoutUser } from "../actions"; 


const StyledTypingArea = styled.div`

@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap'); 


& {
    display: flex; 
    justify-content: center; 
    height: 800px; 
    background: #E8E8E8; 

}

& > * {
    margin: 0% 0%; 
}


// first div area 

.navigation {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    width: 20%; 
    font-family: 'Karla', sans-serif;
}

.typing--area {
    width: 60%; 
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
}

.link:hover {
    background: gray; 
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



// last div area 


h3 {
    height: 50px; 
    font-size: 4rem; 
    text-align: center; 
}

.languages {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    width: 100%;
    height: 120px; 
}

.languages:hover {
    background: gray; 
}

.languages h2 {
    width: 30%; 
}

`

const TypingArea = ({username, logoutUser}) => {



    const onLogInClick = () => {

        window.location = "/auth/google"; 
    }

    const onLogOutClick = () => {

        logoutUser(); 
        
    }


    const isUserloggedIn = user => {

        if(user){
            return <Link onClick={onLogOutClick} className="link"><RiArrowLeftCircleLine className="icon"/><h2>Log Out</h2></Link>
        }
        else {
            return <Link onClick={onLogInClick} className="link"><FcGoogle className="icon"/><h2>Log in</h2></Link>
        }
    }


    return (
        <StyledTypingArea>
            <div className="navigation">
                <div className="link--container">
                    <h3></h3>
                    <Link to="/" className="link"><BiHomeAlt className="icon"/><h2>Home</h2></Link>
                    <Link to="/myaccount" className="link"><BiUser className="icon"/><h2>My Account</h2></Link>
                    <Link to="/leaderboard" className="link"><AiOutlineTable className="icon"/><h2>Leaderboard</h2></Link>
                    {isUserloggedIn(username)}
                </div>
            </div>
            <div className="typing--area">
                <InputArea />
            </div>
            <div className="navigation">
                <div className="link--container">
                    <h3>Languages</h3>
                    <Link to="html" className="languages"><AiOutlineHtml5 className="icon"/><h2>HTML</h2></Link>
                    <Link to="css" className="languages"><IoLogoCss3 className="icon"/><h2>CSS</h2></Link>
                    <Link to="javascript" className="languages"><SiJavascript className="icon"/><h2>JavaScript</h2></Link>
                    <Link to="python" className="languages"><SiPython className="icon"/><h2>Python</h2></Link>
                </div>
            </div>
        </StyledTypingArea>
    )
}

const mapStateToProps = state => {

    return {
        username: state.currentUser.username, 
    }
}

export default connect(mapStateToProps, { logoutUser })(TypingArea)
