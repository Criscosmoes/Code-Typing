import React from 'react'
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
    height: 80%; 
    width: 100% 
}




`

const Leaderboard = () => {
    return (
        <StyledLeaderboard>
            <h1>Leaderboard</h1>
            <div className="table">

            </div>
        </StyledLeaderboard>
    )
}

export default Leaderboard
