import React from 'react'
import { connect } from 'react-redux';
import styled from "styled-components"; 


const StyledLeaderboard = styled.div`


& {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column; 
    width: 100%; 
    height: 100%; 

}

h1 {
    font-size: 6rem; 
}

.table {
    display: flex;  
    align-items: center; 
    flex-direction: column;
    width: 100%; 
    border: 2px solid black; 
    margin: 1%
}


.leaders {
    display: flex; 
    justify-content: space-around; 
    align-items: center; 
    width: 100%;
    margin: 1%
}


.name {
    font-size: 7rem;
    width: 600px;  
}

.place {
    font-size: 4rem;
    width: 80px; 
}

.score {
    font-size: 4rem; 
    width: 200px; 
}


`

const Leaderboard = ({leaders}) => {



    // map over the leaders and show to UI

    const renderedLeaders = leaders.map((cur, index) => {

        return (
            <div className="leaders">
                <div className="place">{index + 1}. </div>
                <h2 className="name">{cur.name}</h2>
                <div className="score">WPM: {cur.wordsPerMinute}</div>
            </div>
        )
    })


    return (
        <StyledLeaderboard>
            <h1>Leaderboard</h1>
            <div className="table">
                {renderedLeaders}
            </div>
        </StyledLeaderboard>
    )
}

const mapStateToProps = state => {


    return {
        leaders: state.leaderboards
    }
}

export default connect(mapStateToProps)(Leaderboard)
