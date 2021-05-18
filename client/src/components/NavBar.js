import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { FcGoogle } from "react-icons/fc";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { SiCodesandbox } from "react-icons/si";
import { AiOutlineBars } from "react-icons/ai";
import { RiArrowLeftCircleLine } from "react-icons/ri";

const StyledNavBar = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Karla&display=swap");

  & {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110px;
    border-bottom: 2px solid gray;
    background: #f9f9fc;
    background: #202020;
    color: white;
  }

  .logo {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-left: 4%;
    font-size: 4rem;
    font-family: "Karla", sans-serif;
    font-weight: 700;
    width: 15%;
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
    font-family: "Karla", sans-serif;
    font-weight: 600;
    transition: ease-out 0.3s;
  }

  .login--button:hover {
    background: #a9a9a9;
    transition: ease-in 0.3s;
    border: 2px solid #a9a9a9;
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
    font-family: "Karla", sans-serif;
    transition: ease-in 0.5s;
  }

  @media (max-width: 800px) {
    .name {
      font-size: 2.4rem;
    }

    h2 {
      font-size: 2.3rem;
    }

    .login--button {
      width: 30%;
      padding: 1%;
    }

    .nav-links {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
      height: 100vh;
      width: 320px;
      background: gray;
      transform: translateX(-320px);
      transition: transform 0.5s;
      background: #181818;
      border-right: 3px solid gray;
    }

    .open {
      transform: translateX(0);
      transition: 500ms ease-in;
    }

    .all-links {
      display: flex;
      margin: 4%;
      align-items: center;
      font-size: 2.2rem;
      padding: 12px 15px;
      color: white;
      font-family: "Karla", sans-serif;
    }

    .all-links > * {
      margin-right: 15px;
    }

    .nav-icons {
      font-size: 2.2rem;
      border: none;
    }
  }
  // iphone queries

  @media (max-width: 500px) {
    .name {
      font-size: 2.4rem;
    }

    h2 {
      font-size: 2.3rem;
    }

    .login--button {
      width: 40%;
      padding: 3%;
    }

    .link {
      color: white;
    }

    .nav-links {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
      height: 100vh;
      width: 320px;
      background: gray;
      transform: translateX(-320px);
      transition: transform 0.5s;
      background: #181818;
      border-right: 3px solid gray;
    }

    .open {
      transform: translateX(0);
      transition: 500ms ease-in;
    }

    .all-links {
      display: flex;
      margin: 4%;
      align-items: center;
      font-size: 2.2rem;
      padding: 12px 15px;
      color: white;
      font-family: "Karla", sans-serif;
    }

    .all-links > * {
      margin-right: 15px;
    }

    .nav-icons {
      font-size: 2.2rem;
      border: none;
    }
  }
`;

const NavBar = ({ username }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);

  const onButtonClick = () => {
    window.location = "/auth/google";
  };

  const trackUser = (user) => {
    if (user) {
      return <h1 className="name">{`Welcome, ${user}`}</h1>;
    } else {
      if (window.innerWidth < 800) {
        return (
          <div className="login--button" onClick={onButtonClick}>
            <FcGoogle className="google--icon" />
            <h2>Sign in</h2>
          </div>
        );
      } else {
        return (
          <div className="login--button" onClick={onButtonClick}>
            <FcGoogle className="google--icon" />
            <h2>Sign in with Google</h2>
          </div>
        );
      }
    }
  };

  const sideBar = () => {
    setIsOpen(!isOpen);

    if (isOpen) {
      return "Open";
    }

    return "";
  };

  const viewport = () => {
    if (window.innerWidth < 800) {
      // we are a phone screen

      return (
        <div className="logo">
          <AiOutlineBars onClick={sideBar} className="icon" />
        </div>
      );
    } else {
      // we are in desktop mode
      return (
        <div className="logo">
          <h4>Code Typing</h4>
        </div>
      );
    }
  };

  const isUserloggedIn = (user) => {
    if (user) {
      return (
        <a className="all-links" href="/api/logout">
          {/*  <RiArrowLeftCircleLine className="icon" /> */}
          <h2>Log Out</h2>
        </a>
      );
    } else {
      return (
        <a className="all-links" href="/auth/google">
          {/* <FcGoogle className="icon" /> */}
          <h2>Log in</h2>
        </a>
      );
    }
  };

  // test

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);

    viewport();
    trackUser(username);

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <StyledNavBar>
      {viewport()}
      {trackUser(username)}

      {isOpen ? (
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link className="all-links" onClick={() => setIsOpen(false)} to="/">
            Home
          </Link>
          <Link
            className="all-links"
            onClick={() => setIsOpen(false)}
            to="/leaderboard"
          >
            Leaderboard
          </Link>
          <Link
            className="all-links"
            onClick={() => setIsOpen(false)}
            to="/settings"
          >
            Settings
          </Link>
          {isUserloggedIn(username)}
        </div>
      ) : (
        ""
      )}
    </StyledNavBar>
  );
};

const mapStatetoProps = (state) => {
  return {
    username: state.currentUser.username,
  };
};

export default connect(mapStatetoProps)(NavBar);
