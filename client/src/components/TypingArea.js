import React, {useState} from 'react'
import styled from "styled-components"; 

import { Link } from "react-router-dom"; 

// icons 
import { BiHomeAlt } from "react-icons/bi"; 
import { BiUser } from "react-icons/bi";
import { AiOutlineTable } from "react-icons/ai"; 
import { RiArrowLeftCircleLine} from "react-icons/ri"


import InputArea from './InputArea';


const StyledTypingArea = styled.div`

@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap'); 


& {
    display: flex; 
    justify-content: center; 
    height: 800px; 
    background: #E8E8E8

}

& > * {
    margin: 0% 1%; 
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
    width: 100%
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

`

const TypingArea = () => {


    return (
        <StyledTypingArea>
            <div className="navigation">
                <div className="link--container">
                    <Link className="link"><BiHomeAlt className="icon"/><h2>Home</h2></Link>
                    <Link className="link"><BiUser className="icon"/><h2>My Account</h2></Link>
                    <Link className="link"><AiOutlineTable className="icon"/><h2>Leaderboard</h2></Link>
                    <Link className="link"><RiArrowLeftCircleLine className="icon"/><h2>Log Out</h2></Link>
                </div>
            </div>
            <div className="typing--area">
                <InputArea />
            </div>
            <div className="results">

            </div>
        </StyledTypingArea>
    )
}

export default TypingArea
