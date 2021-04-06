import React from 'react'
import styled from "styled-components"; 


const StyledFooter = styled.div`


@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');

& {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    border-top: 2px solid gray;
    background: #F9F9FC;
    background: #202020; 
    color: white; 
    height: 100px; 
    font-family: 'Karla', sans-serif;
}

.copyright {
    margin-left: 4%; 
    font-size: 2rem; 
}

.made--by {
    margin-right: 4%; 
    font-size: 2rem; 
}

a {
    color: white;
    transition: ease-out .3s; 
    font-size: 2.5rem; 
}

a:hover {
    color: #228B22; 
    transition: ease-in .3s;
    cursor: pointer;
}


@media (max-width: 500px){

    .copyright {
        font-size: 1.5rem;
    }

    .made--by {
        font-size: 1.6rem;
    }

    a {
        font-size: 2rem; 
        text-decoration: underline; 
    }

    
}

`

const Footer = () => {



    return (
        <StyledFooter>
            <h3 className="copyright">Copyright © 2021</h3>
            <h3 className="made--by">Made By: <a href="https://www.cristianfernandez.dev/" > Cristian</a> 🙂</h3>
        </StyledFooter>
    )
}

export default Footer
