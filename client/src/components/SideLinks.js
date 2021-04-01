import React from 'react'
import styled from "styled-components"; 



// icons
import { BiHomeAlt } from "react-icons/bi"; 
import { BiUser } from "react-icons/bi";
import { AiOutlineTable } from "react-icons/ai"; 
import { RiArrowLeftCircleLine} from "react-icons/ri"
import { FcGoogle } from "react-icons/fc";
import { FiSettings } from "react-icons/fi"; 


import { Link } from "react-router-dom"; 
import { connect } from 'react-redux';
import { logoutUser } from "../actions"; 

// components

import Leaderboard from './Leaderboard';

const StyledSideLinks = styled.div`

& {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    font-family: 'Karla', sans-serif;
    height: 800px; 
    background: #202020;
    color: white;
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
}

.link:hover {
    background: gray; 
}

.link--container {
    width: 27.1%;
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

h3 {
    height: 50px; 
    font-size: 4rem; 
    text-align: center; 
}


`

const SideLinks = ({ logoutUser, username}) => {


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



    return (
        <StyledSideLinks className="navigation">
            <div className="link--container">
                <Link to="/" className="link"><BiHomeAlt className="icon"/><h2>Home</h2></Link>
                <Link to="/leaderboard" className="link"><AiOutlineTable className="icon"/><h2>Leaderboard</h2></Link>
                <Link to="/settings" className="link"><FiSettings className="icon" /><h2>Settings</h2></Link>
                {isUserloggedIn(username)}
            </div>
            <Leaderboard />
        </StyledSideLinks>
    )
}


const mapStateToProps = state => {

    return {
        username: state.currentUser.username
    }
}

export default connect(mapStateToProps, { logoutUser })(SideLinks)
