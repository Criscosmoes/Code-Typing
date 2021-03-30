import React, { useState, useEffect } from 'react'
import styled from "styled-components"; 
import axios from "axios"; 


const StyledInputArea = styled.div`

@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap'); 

& {

    display: flex; 
    justify-content: center; 
    background: #E8E8E8; 
    height: 100%;
    /* font-family: 'Karla', sans-serif;  */
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
    outline: none; 
    width: 30%; 
    padding: 1%; 
    font-size: 3.5rem;
    font-family: 'Karla', sans-serif;
    transition: ease-in .4s; 
    cursor: pointer; 
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



`

const InputArea = () => {

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


    useEffect(async () => {

        const response = await axios.get("http://localhost:5000/api/texts"); 

        const filteredArr = response.data.filter(cur => cur.language === "Python")

        const arr = filteredArr.map(cur => {
            return cur.text; 
        })

        /* Randomize array in-place using Durstenfeld shuffle algorithm */
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
        console.log(lastItem.split("")); 




    }, [])

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


    

        
        if (lastChar == paragraph[pointer]){


            setPointer(pointer + 1); 
            currentSpan.classList.add("right");
            currentSpan.removeAttribute("id", "next"); 

            // checks if current word is incorrect
            if (currentSpan.classList.value == "wrong right" || currentSpan.classList.value == "right wrong" || currentSpan.classList.value == "wrong"){
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

            console.log(children); 

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
            
            console.log(intervalTimer); 

            // when timer ends
            if (sec < 0) {
                setDisabled(true); 
                clearInterval(myTimer);
            }

        }, 1000);

    }
    const onInputClick = () => {


        console.log("clicked") 
         
        setIntervalTimer("true");
        if(seconds >= 59){
            timer();
            
        }
        
    }


    return (
        <StyledInputArea> 
            <div className="big--container">
                <div className="main--container">
                    <div className="text--area">
                        {spanText}
                    </div>
                    <input type="text" spellcheck="false" onClick={onInputClick} onChange={onInputChange} value={userInput} disabled={disabled} />

                    <div className="restart--timer">
                        <button onClick={onRestartClick}>Restart</button>
    
                    </div>
                </div>
            </div>
        </StyledInputArea>
    )
}

export default InputArea
