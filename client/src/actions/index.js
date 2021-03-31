import axios from "axios"; 

import { FETCH_USER } from './types';


export const fetchUser = () => async dispatch => {

    try {
        const response = await axios.get("/api/current_user"); 

        dispatch({type:"FETCH_USER", payload: {
            username: response.data.username, 
            id: response.data.googleId
        }})
    }
    catch(e){
        console.log(e.message); 
    }

}

export const fetchLanguage = language => async dispatch => {

    const response = await axios.get("/api/texts"); 

    const filteredArr = response.data.filter(cur => cur.language === language)

    dispatch({type: "FETCH_LANGUAGE", payload: filteredArr})
}



export const logoutUser = () => async dispatch => {

   try {
       const response = await axios.get("/api/logout"); 

       dispatch({type: "LOGOUT_USER", payload: ""}) 

    }
   catch(e){
       console.log(e.message); 
    }
}

export const sendScore = (wordsPerMinute, userId, username) => async dispatch => {


    try {

        const response = await axios.post("/api/scores", {score: wordsPerMinute, owner: userId, name: username}); 

        console.log(response); 

    }
    catch(e){
        console.log(e.message); 
    }
    
}


export const fetchScores = () => async dispatch => {

    try {
        const response = await axios.get("/api/leaders"); 

        console.log(response.data);

        const leaders = response.data.sort(function(a,b){return b.wordsPerMinute - a.wordsPerMinute})

        dispatch({type: "FETCH_SCORES", payload: leaders})
    }
    catch(e){
        console.log(e.message); 
    }


}




    
