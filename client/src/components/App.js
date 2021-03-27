import React, {useEffect} from 'react'

import { connect } from "react-redux"; 

//function from our actions
import { fetchUser } from "../actions"; 




const App = ({ fetchUser }) => {



    useEffect(() => {


        fetchUser(); 

    })



    return (
        <div>
            Hello There!
        </div>
    )
}


const mapStateToProps = state => {
    return {
        
    }
}

export default connect(mapStateToProps, { fetchUser })(App)
