import React from "react";
import styled from "styled-components";

import { FcGoogle } from "react-icons/fc";

const StyledNavBar = styled.div`

    @import url('https://fonts.googleapis.com/css2?family=Karla&display=swap'); 


  & {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110px;
    border-bottom: 2px solid black;
    background: #E8E8E8
  }

  .logo {
    margin-left: 4%;
    font-size: 2rem;
    color: white;
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
    border: 2px solid black;
    color: black; 
    font-family: 'Karla', sans-serif;
    font-weight: 600; 
  }

  .google--icon {
    font-size: 2.6rem;
    border: none;
  }

  h2 {
    font-size: 2.2rem;
  }
`;

const NavBar = () => {
  return (
    <StyledNavBar>
      <div className="logo"></div>
      <div className="login--button">
        <FcGoogle className="google--icon" />
        <h2>Sign in with Google</h2>
      </div>
      
    </StyledNavBar>
  );
};

export default NavBar;
