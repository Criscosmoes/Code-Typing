import axios from "axios"; 

import { FETCH_USER } from './types';


export const fetchUser = () => async dispatch => {

    try {
        const response = await axios.get("/current_user"); 

        console.log(response); 
    }
    catch(e){
        console.log(e.message); 
    }

}


export const loginUser = () => async dispatch => {


    try {
        const response = await axios.get("https://code-typing.herokuapp.com/auth/google")

        console.log(response); 
    }
    catch(e){
        console.log(e.message); 
    }
}




    
