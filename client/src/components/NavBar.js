import React from "react";
import styled from "styled-components";

import { FcGoogle } from "react-icons/fc";
import { connect } from "react-redux";

import { SiCodesandbox } from "react-icons/si";  

const StyledNavBar = styled.div`

    @import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');


  & {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110px;
    border-bottom: 2px solid gray;
    background: #F9F9FC;
    background: #202020; 
    color: white; 
  }

  .logo {
    display: flex; 
    justify-content: space-evenly; 
    align-items: center; 
    margin-left: 4%;
    font-size: 4rem;
    font-family: 'Karla', sans-serif;
    font-weight: 700; 
    width: 15%
  }

  h4 {
    font-size: 3.5rem; 
  }
  
  .icon {
    border: none;
    margin: 0% 1%;
  }

  // login button

  .login--button {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 14%;
    padding: 0.4%;
    margin-right: 4%;
    cursor: pointer;
    border: 2px solid white; 
    background: white; 
    color: black; 
    font-family: 'Karla', sans-serif;
    font-weight: 600;
    transition: ease-out .3s; 
  }

  .login--button:hover {

    background: 	#A9A9A9;   
    transition: ease-in .3s;
    border: 2px solid 	#A9A9A9; 

  }

  .google--icon {
    font-size: 2.6rem;
    border: none;
  }

  h2 {
    font-size: 2.2rem;
  }

  .name {
    margin-right: 4%; 
    font-size: 5.5rem;
    font-family: 'Karla', sans-serif;
    transition: ease-in .5s; 
  }
`;

const NavBar = ({username}) => {

  const onButtonClick = () => {

    window.location = "/auth/google"; 
  }


  const trackUser = (user) => {

    if(user){
      return <h1 className="name">{`Welcome, ${user}`}</h1>
    }
    else {

      return (
        <div className="login--button" onClick={onButtonClick}>
          <FcGoogle className="google--icon" />
          <h2>Sign in with Google</h2>
        </div>
      )

    }
  }


  return (
    <StyledNavBar>
      <div className="logo"><SiCodesandbox className="icon" /><h4>Code Typing</h4></div>
      {trackUser(username)}
      
    </StyledNavBar>
  );
};

const mapStatetoProps = state => {

  return {
    username: state.currentUser.username, 
  }
}

export default connect(mapStatetoProps)(NavBar);
