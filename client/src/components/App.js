import React, {useEffect} from 'react'

import { connect } from "react-redux"; 

//function from our actions
import { fetchUser, loginUser } from "../actions"; 




const App = ({ fetchUser, loginUser }) => {



    useEffect(() => {


        fetchUser(); 

    }, [])



    return (
        <div onClick={loginUser}>
            Hello There!
        </div>
    )
}


const mapStateToProps = state => {
    return {
        username: state.currentUser.username, 
    }
}

export default connect(mapStateToProps, { fetchUser, loginUser })(App)
