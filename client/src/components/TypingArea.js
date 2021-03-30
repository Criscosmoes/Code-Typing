import React, {useState, useEffect} from 'react'
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



import { connect } from 'react-redux';

import { logoutUser } from "../actions"; 



// Input Area code 

import axios from "axios"; 


import { VscDebugRestart } from "react-icons/vsc"; 


//

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


.typing--area {
    display: flex; 
    justify-content: center; 
    background: #E8E8E8; 
    height: 100%;
}

.big--container { 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column;
    width: 100%; 
    background: white; 
    border: 1px solid black;
    margin: 1% 0%
}


.main--container {
    height: 100%; 
    width: 100%;
    display: flex; 
    justify-content: space-evenly; 
    align-items: center; 
    flex-direction: column; 
}

.text--area {
    height: 100px; 
    font-size: 7rem; 
    text-align: center; 
    width: 100%; 
    letter-spacing: .2rem;  
    line-height: 100%;
    font-family: 'Karla', sans-serif;
}

input {
    width: 50%;
    height: 60px;
    font-size: 3rem; 
    outline: none; 
    border: 2px solid black; 
}

.restart--timer {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    width: 100%; 
}

button {
    display: flex; 
    justify-content: center;  
    align-items: center; 
    outline: none; 
    width: 30%; 
    padding: 1%; 
    font-size: 3.5rem;
    font-family: 'Karla', sans-serif;
    transition: ease-in .4s; 
    cursor: pointer; 
}

.res {
    width: 32%; 
}

//text box 
.wrong {
    color: red; 
}

.right {
   color: #228B22; 
}

#next {
    background: lightgray; 
    animation: blink 2s linear infinite; 
}

#cursor {
  background: gray;
  line-height: 17px;
  margin-left: 3px;
  -webkit-animation: blink 1.5s infinite;
  width: 7px;
  height: 15px;
}

@-webkit-keyframes blink {
  0% {background: #222}
  50% {background: lime}
  100% {background: #222}
}


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


    // input area code 


    const [userInput, setUserInput] = useState(""); 
    const [pointer, setPointer] = useState(0);
    const [data, setData] = useState([]); 
    const [text, setText] = useState("")
    const [paragraph, setParagraph] = useState(text.split(""));
    const [wrongWords, setWrongWords] = useState(0); 
    const [correctWords, setCorrectWords] = useState(0); 
    const [wpm, setWpm] = useState(0); 
    const [seconds, setSeconds] = useState(60); 
    const [disabled, setDisabled] = useState(false);
    const [intervalTimer, setIntervalTimer] = useState("false"); 


    const changeLanguage = async (language) => {


        const response = await axios.get("/api/texts"); 

        console.log(response); 

        const filteredArr = response.data.filter(cur => cur.language === language)

        const arr = filteredArr.map(cur => {
            return cur.text; 
        })

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        shuffleArray(arr); 
        setData(arr); 

        const lastItem = arr[arr.length - 1]; 

        setText(lastItem); 
        setParagraph(lastItem.split("")); 

    }

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

   

    const spanText = paragraph.map((cur, index) => {
        return (
            <span key={index}>{cur}</span>
        )
    })


    const onInputChange = e => {


        const lastChar = e.target.value.slice(-1);
        const currentSpan = e.target.previousSibling.childNodes[pointer];

        if (e.target.previousSibling.childNodes[pointer + 1]){

            const nextSpan = e.target.previousSibling.childNodes[pointer + 1];

            nextSpan.setAttribute("id", "next");
        }


    

        
        if (lastChar === paragraph[pointer]){


            setPointer(pointer + 1); 
            currentSpan.classList.add("right");
            currentSpan.removeAttribute("id", "next"); 

            // checks if current word is incorrect
            if (currentSpan.classList.value === "wrong right" || currentSpan.classList.value === "right wrong" || currentSpan.classList.value === "wrong"){
                currentSpan.classList.remove("right");

            }
            else {
                setCorrectWords(correctWords + 1); 
            }

        
        }
        else {
        
            // adds the wrong class if input does not match. 
            currentSpan.classList.add("wrong"); 
            if (e.target.previousSibling.childNodes[pointer + 1]){

                const nextSpan = e.target.previousSibling.childNodes[pointer + 1];
    
                nextSpan.removeAttribute("id", "next");
            }
            setWrongWords(wrongWords + 1)
            return false; 

        }



    

        setUserInput(e.target.value);
        
        // if user is at the end; 
        if(userInput.length === text.length - 1){

            const children = e.target.previousSibling.childNodes; 

            const arr = Array.from(children); 

            arr.forEach(cur => {
                cur.classList.remove("right");
                cur.classList.remove("wrong");
            })

            const randomNum = Math.floor((Math.random() * data.length - 1) + 1); 
            const newText = data[randomNum]; 

            setText(newText); 
            setParagraph(newText.split(""))
            setPointer(0);
            setUserInput("");





        }
    }

    const onRestartClick = () => {

        const children = document.querySelector(".text--area").childNodes; 

        const arr = Array.from(children); 

        arr.forEach(cur => {
            cur.classList.remove("right");
            cur.classList.remove("wrong");
            cur.removeAttribute("id", "next")
        })

        const randomNum = Math.floor((Math.random() * data.length - 1) + 1); 
        const newText = data[randomNum]; 

        setIntervalTimer("false"); 
        setCorrectWords(0); 
        setWrongWords(0); 
        setWpm(0); 
        setDisabled(false); 
        setSeconds(60); 
        setText(newText); 
        setParagraph(newText.split(""))
        setPointer(0);
        setUserInput("");
    }


    function timer(){
        var sec = 59;
        var myTimer = setInterval(function(){

            
            setSeconds(sec); 
            sec--;
            

            // when timer ends
            if (sec < 0) {
                setDisabled(true); 
                clearInterval(myTimer);
            }

        }, 1000);

    }
    const onInputClick = () => {


         
        setIntervalTimer("true");
        if(seconds >= 59){
            timer();
            
        }
        
    }

    useEffect(async () => {

        const response = await axios.get("http://localhost:5000/api/texts"); 

        const filteredArr = response.data.filter(cur => cur.language === "Python")


        const arr = filteredArr.map(cur => {
            return cur.text; 
        })

        shuffleArray(arr); 
        setData(arr); 

        const lastItem = arr[arr.length - 1]; 

        setText(lastItem); 
        setParagraph(lastItem.split("")); 


    }, [])
    


    // 



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
                <div className="big--container">
                    <div className="main--container">
                        <div className="text--area">
                            {spanText}
                        </div>
                        <input type="text" spellCheck="false" onClick={onInputClick} onChange={onInputChange} value={userInput} disabled={disabled} />

                        <div className="restart--timer">
                            <button onClick={onRestartClick}><VscDebugRestart className="icon" /><h2 className="res">Restart</h2></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navigation">
                <div className="link--container">
                    <h3>Languages</h3>
                    <Link to="html" className="languages"><AiOutlineHtml5 className="icon"/><h2>HTML</h2></Link>
                    <Link to="css" className="languages"><IoLogoCss3 className="icon"/><h2>CSS</h2></Link>
                    <Link onClick={() => changeLanguage("JavaScript")} to="javascript" className="languages"><SiJavascript className="icon"/><h2>JavaScript</h2></Link>
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

export default connect(mapStateToProps, { logoutUser })(TypingArea); 
