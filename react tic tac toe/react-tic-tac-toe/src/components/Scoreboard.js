import React, { useState,useEffect } from 'react';

// First, we need to create a context
export const scoreboard = React.createContext();

const ScoreboardProvider=(props)=> {
    const [oWinCount, setoWinCount] = useState(0);
    const [xWinCount, setxWinCount] = useState(0);
    const [gameHistoryArray, setGameHistoryArray] = useState([]);

    const addToGameHistory=(game)=>
    {
      setGameHistoryArray([...gameHistoryArray,game])
      console.log(gameHistoryArray)
    }



    useEffect(() => {
      if(oWinCount>0 || xWinCount>0)
      {
        localStorage.setItem("X-wins",xWinCount)
        localStorage.setItem("O-wins",oWinCount)
      }
    }, [xWinCount,oWinCount]);

    useEffect(() => {
      if (localStorage.getItem("X-wins")!=null)
      {
        console.log(localStorage.getItem("X-wins"))
        console.log("at X")
        setxWinCount(localStorage.getItem("X-wins"))
      }
      if (localStorage.getItem("O-wins")!=null)
      {
        setoWinCount(localStorage.getItem("O-wins"))
      }
    }, []);

    const cleanScore = ()=>
    {
      setoWinCount(0)
      setxWinCount(0)
    }

  
    return (
      <scoreboard.Provider value={{oWinCount,setoWinCount,xWinCount,setxWinCount,cleanScore,addToGameHistory}}>
        {props.children}
      </scoreboard.Provider>
    );
  }
  export default ScoreboardProvider;


  

