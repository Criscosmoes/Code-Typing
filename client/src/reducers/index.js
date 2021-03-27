const initialState = {
    currentUser: {
        username: ""
    }
}


export default (state = initialState, action) => {

    switch(action.type) {
        case "FETCH_USER": 
            return {
                ...state, 
                currentUser: {
                    username: action.payload, 
                }
            }
        default: 
            return state; 
    }
}