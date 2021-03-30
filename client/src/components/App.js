import React, {useEffect} from 'react'

import { connect } from "react-redux"; 

//function from our actions
import { fetchUser } from "../actions"; 

import "../App.css"; 

// components
import NavBar from './NavBar';
import TypingArea from './TypingArea';


const App = ({ fetchUser  }) => {



    useEffect(() => {


        fetchUser(); 

    }, [fetchUser])



    return (
        <div>
           <NavBar />
           <TypingArea />
        </div>
    )
}


const mapStateToProps = state => {
    return {
        username: state.currentUser.username, 
    }
}

export default connect(mapStateToProps, { fetchUser })(App)

