import axios from "axios"; 

import { FETCH_USER } from './types';


export const fetchUser = () => async dispatch => {

    try {
        const response = await axios.get("https://code-typing.herokuapp.com/current_user"); 

        console.log(response); 

        dispatch({type: "FETCH_USER", payload: response})
    }
    catch(e){
        console.log(e.message); 
    }

}


    
