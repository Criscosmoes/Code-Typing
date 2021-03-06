import React from 'react';
import { useTimer } from 'react-timer-hook';

const MyTimer = ({ expiryTimestamp }) => {

    const {
        seconds,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });



    return (
        <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '100px'}}>
                <span>{seconds}</span>
            </div>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button onClick={() => {
                // Restarts to 5 minutes timer
                const time = new Date();
                time.setSeconds(time.getSeconds() + 10);
                restart(time)
            }}>Restart</button>
    </div>
    )
}

export default MyTimer
