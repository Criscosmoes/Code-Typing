import axios from "axios"; 

import { FETCH_USER } from './types';


export const fetchUser = async () => {


    return function(dispatch) {
        const response = axios.get("http://localhost:5000/api/users"); 

        
    }
}
