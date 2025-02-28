import React, { useEffect, useRef, useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  console.log(timerRef);

  const startTimer = () => {
    if(!isRunning){
      setIsRunning(true)
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(centiseconds).padStart(2, "0")}`;
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const recordLap = () => {
    if(isRunning){
      setLaps((prev)=>[...prev,time])
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  useEffect(()=>{
    return ()=>{
      clearInterval(timerRef.current);
    }
  },[])

  return (
    <div>
      {/* Do not remove the main div */}
      <div className="container">
        <h2>{formatTime(time)}</h2>
        <div>
          <button onClick={startTimer}>Start</button>
          <button onClick={stopTimer}>Stop</button>
          <button onClick={recordLap}>Lap</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              {formatTime(lap)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
