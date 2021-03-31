import React, {useEffect} from 'react'

import { connect } from "react-redux"; 

import { Switch, Route } from "react-router-dom"; 

//function from our actions
import { fetchUser, fetchScores } from "../actions"; 

import "../App.css"; 

// components
import NavBar from './NavBar';
import TypingArea from './TypingArea';
import MyTimer from './MyTimer';
import SideLinks from './SideLinks';



const App = ({ fetchUser, fetchScores }) => {



    useEffect(() => {

        

        fetchUser();
        fetchScores(); 

    }, [fetchUser])



    return (
        <div>
           <Switch>
               <Route path="/" exact>
                   <NavBar />
                   <TypingArea />
               </Route>
               <Route path="/leaderboard">
                   <NavBar />
                   <SideLinks />
                   
               </Route>
           </Switch>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        username: state.currentUser.username, 
    }
}

export default connect(mapStateToProps, { fetchUser, fetchScores })(App)

