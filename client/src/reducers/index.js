const initialState = {
    currentUser: {
        id: "", 
        username: ""
    }, 

    currentLanguage: [],

    leaderboards: [], 

    term: "Python", 

}


export default (state = initialState, action) => {

    switch(action.type) {
        case "FETCH_USER": 
            return {
                ...state, 
                currentUser: {
                    id: action.payload.id, 
                    username: action.payload.username, 
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
        case "FETCH_SCORES": 
            return {
                ...state, 
                leaderboards: action.payload, 
            }
        case "LANGUAGE_TERM": 
            return {
                ...state, 
                term: action.payload, 
            }
        default: 
            return state; 
    }
}