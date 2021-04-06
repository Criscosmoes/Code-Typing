import React, {useEffect} from 'react'

import { connect } from "react-redux"; 

import { Switch, Route } from "react-router-dom"; 

//function from our actions
import { fetchUser, fetchScores } from "../actions"; 

import "../App.css"; 

// components
import NavBar from './NavBar';
import TypingArea from './TypingArea';
import Footer from './Footer';
import Leaderboard from './Leaderboard';
import Settings from "./Settings"; 


const App = ({ fetchUser, fetchScores }) => {



    useEffect(() => {

        

        fetchUser();
        fetchScores(); 

    }, [fetchUser, fetchScores])



    return (
        <div>
           <Switch>
               <Route path="/" exact>
                   <NavBar />
                   <TypingArea />
                   <Footer />
               </Route>
               <Route path="/leaderboard">
                   <NavBar />
                   <Leaderboard />
                   <Footer />
               </Route>
               <Route path="/settings">
                   <NavBar />
                   <Settings />
                   <Footer />
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

// test push 

export default connect(mapStateToProps, { fetchUser, fetchScores })(App)

