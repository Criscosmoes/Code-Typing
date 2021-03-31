const initialState = {
    currentUser: {
        id: "", 
        username: ""
    }, 

    currentLanguage: [],

    incorrectWords: 0, 
    correctWords: 0, 

}


export default (state = initialState, action) => {

    console.log(action); 
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
        case "CORRECT_WORD": 
            return {
                ...state,
                correctWords: state.correctWords + 1

            }
        case "WRONG_WORD": 
            return {
                ...state, 
                wrongWords: state.wrongWords + 1, 
            }
        default: 
            return state; 
    }
}