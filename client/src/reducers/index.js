const initialState = {
    currentUser: {
        username: ""
    }, 

    currentLanguage: [], 


}


export default (state = initialState, action) => {

    console.log(action); 
    switch(action.type) {
        case "FETCH_USER": 
            return {
                ...state, 
                currentUser: {
                    username: action.payload, 
                }
            }
        case "LOGOUT_USER": 
            return {
                ...state, 
                currentUser: {
                    username: action.payload, 
                }
            }
        case "FETCH_LANGUAGE": 
            return {
                ...state, 
                currentLanguage: action.payload
            }
        default: 
            return state; 
    }
}