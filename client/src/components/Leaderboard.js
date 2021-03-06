import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

// icons
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineTable } from "react-icons/ai";
import { RiArrowLeftCircleLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FiSettings } from "react-icons/fi";

import { connect } from "react-redux";

import { fetchScores, logoutUser } from "../actions";

// Input Area code

//

const StyledLeaderboard = styled.div`
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
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    color: white;
    font-family: "Karla", sans-serif;
  }

  h1 {
    font-size: 8rem;
    margin: 1%;
  }

  .table {
    overflow-y: auto;
    width: 100%;
  }

  .leaders {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1%;
    border: 2px solid gray;
  }

  .place {
    width: 30px;
    font-size: 4rem;
  }

  .name {
    width: 300px;
    font-size: 4.5rem;
  }

  .score {
    width: 150px;
    font-size: 3rem;
  }

  span {
    font-size: 5rem;
    color: #228b22;
  }

  .user {
    font-weight: bolder; 
  }


  @media (max-width: 500px){

    & {
      display: flex; 
      justify-content: flex-start; 
      align-items: center; 
      flex-direction: column; 
      height: 600px; 
    }

    .typing--area {
      width: 100%
    }

    .typing--area > * {
      margin: 2%
    }

    h1 {
      font-size: 4.5rem; 
    }

    .place {
      font-size: 3rem;
    }

    .name {
      width: 40%; 
      font-size: 3rem; 
    }

    span {
      font-size: 3rem; 
    }

    .leaders {
      display: flex; 
      justify-content: space-around; 
      align-items: center; 
      margin: 3%
    }


  }




`;

const Leaderboard = ({ leaders, username, fetchScores, logoutUser }) => {

  const [width, setWidth] = useState(window.innerWidth); 

  const onLogInClick = () => {
    window.location = "/auth/google";
  };

  const onLogOutClick = () => {
    logoutUser();
  };

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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const renderedLeaders = leaders.map((cur, index) => {
    return (
      <div className="leaders">
        <div className={`place ${username === cur.name ? "user" : ""}`}>
          {index + 1}.{" "}
        </div>
        <h2 className={`name ${username === cur.name ? "user" : ""}`}>{capitalizeFirstLetter(cur.name)}</h2>
        <div className="score">
          WPM: <span>{cur.wordsPerMinute}</span>
        </div>
      </div>
    );
  });


  const showSideBar = () => {

    if (window.innerWidth < 800){
      // we are in phone view

      return; 
    }

    // else we are not in phone view
    return (
      <motion.div className="navigation">
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
      </motion.div>
    )
  }

  useEffect(() => {
    fetchScores();

    const handleWindowResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleWindowResize);
    showSideBar(); 

    return () => window.removeEventListener("resize", handleWindowResize)

  }, []);

  return (
    <StyledLeaderboard>
      {showSideBar()}
      <motion.div
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1}}
        className="typing--area"
      >
        <h1>Leaderboard</h1>
        <div className="table">{renderedLeaders}</div>
      </motion.div>
    </StyledLeaderboard>
  );
};

const mapStateToProps = (state) => {
  return {
    leaders: state.leaderboards,
    username: state.currentUser.username,
  };
};

export default connect(mapStateToProps, { fetchScores, logoutUser })(
  Leaderboard
);
