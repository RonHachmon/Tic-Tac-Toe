import React, { useState,useEffect } from 'react';


// First, we need to create a context
export const ScoreboardContext = React.createContext();

const ScoreboardProvider=(props)=> {
    const [oWinCount, setoWinCount] = useState(0);
    const [xWinCount, setxWinCount] = useState(0);
    const [gameHistoryArray, setGameHistoryArray] = useState([]);

    const addToGameHistory= async(game)=>
    {
      await sendGameToServer(game)

      setGameHistoryArray([...gameHistoryArray,game])
      console.log(gameHistoryArray)
    }

    
    const sendGameToServer= async (game)=>
    {
      try{
        const response = await fetch("http://localhost:4000/score", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(game)
        });
      }
      catch(error)
      {
      console.error(error);
      }

    }



    useEffect(() => {
      if(oWinCount>0 || xWinCount>0)
      {
        localStorage.setItem("X-wins",xWinCount)
        localStorage.setItem("O-wins",oWinCount)
      }
    }, [xWinCount,oWinCount]);


    // on load get history from server
    useEffect(() => {
      async function fetchData()
      {
        await loadWinnersArray()
      }
      fetchData()
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

    const loadWinnersArray = async ()=>
    {
      const response = await fetch('http://localhost:4000/score');
      const data = await response.text();
      console.log(data);

    }

     const cleanScore = async ()=>
    {
        setoWinCount(0)
        setxWinCount(0)
    }

  
    return (
      <ScoreboardContext.Provider value={{oWinCount,setoWinCount,xWinCount,setxWinCount,cleanScore,addToGameHistory}}>
        {props.children}
      </ScoreboardContext.Provider>
    );
  }
  export default ScoreboardProvider;


  

