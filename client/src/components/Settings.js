import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

// icons
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineTable } from "react-icons/ai";
import { RiArrowLeftCircleLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FiSettings } from "react-icons/fi";

// languages

import { connect } from "react-redux";

import { logoutUser, languageTerm } from "../actions";

// Input Area code

//

const StyledSettings = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Karla&display=swap");

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
    font-family: "Karla", sans-serif;
    border-right: 2px solid gray;
  }

  .typing--area {
    width: 79%;
  }

  .results {
    width: 20%;
  }

  .link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
    color: white;
    transition: ease-out 0.3s;
  }

  .link:hover {
    background: gray;
    transition: ease-in 0.3s;
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
    font-family: "Karla", sans-serif;
  }

  h1 {
    font-size: 8rem;
  }

  .choose--language {
    height: 78%;
    width: 100%;
  }

  .choose--language > * {
    margin: 3%;
  }

  label {
    font-size: 5rem;
  }

  select {
    width: 15%;
    font-size: 2.5rem;
    padding: 0.5%;
    outline: none;
    background: gray;
  }

  option {
    border: 1px solid black;
  }



  @media (max-width: 800px){

    select {
      width: 30%
    }



  }

  @media (max-width: 500px){


    & {
      height: 600px; 
    }

    h1 {
      font-size: 4.5rem; 
    }


    .typing--area {
      width: 100%
    }

    .choose--language {
      text-align: center; 
      display: flex; 
      align-items: center; 
      flex-direction: column; 
    }

    select {
      width: 50%; 
    }

    label {
      font-size: 3.5rem; 
    }



  }










`;

const Settings = ({ username, languageTerm }) => {


  const [width, setWidth] = useState(window.innerWidth); 



  const isUserloggedIn = (user) => {
    if (user) {
      return (
        <Link onClick={onLogOutClick} className="link">
          <RiArrowLeftCircleLine className="icon" />
          <h2>Log Out</h2>
        </Link>
      );
    } else {
      return (
        <Link onClick={onLogInClick} className="link">
          <FcGoogle className="icon" />
          <h2>Log in</h2>
        </Link>
      );
    }
  };

  const onLogInClick = () => {
    window.location = "/auth/google";
  };

  const onLogOutClick = () => {
    logoutUser();
  };

  const showSideBar = () => {

    if(window.innerWidth < 800){
      return;
    }

    return (
      <div className="navigation">
        <div className="link--container">
          <Link to="/" className="link">
            <BiHomeAlt className="icon" />
            <h2>Home</h2>
          </Link>
          <Link to="/leaderboard" className="link">
            <AiOutlineTable className="icon" />
            <h2>Leaderboard</h2>
          </Link>
          <Link to="/settings" className="link">
            <FiSettings className="icon" />
            <h2>Settings</h2>
          </Link>
          {isUserloggedIn(username)}
        </div>
      </div>
    )
  }

  useEffect(() => {



    const handleWindowResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleWindowResize);
    showSideBar(); 

    return () => window.removeEventListener("resize", handleWindowResize)
  })

  return (
    <StyledSettings>
      {showSideBar()}
      <motion.div
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1}}
        className="typing--area"
      >
        <h1>Settings</h1>

        <div className="choose--language">
          <label for="languages">Choose a language: </label>
          <select onChange={languageTerm} name="languages">
            <option value="0">Select: </option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="HTML">HTML</option>
          </select>
        </div>
      </motion.div>
    </StyledSettings>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.currentUser.username,
  };
};

export default connect(mapStateToProps, { languageTerm })(Settings);
