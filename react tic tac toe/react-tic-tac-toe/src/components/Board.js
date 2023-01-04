import Square from "./Square";
import TicTacToeLogic from "./TicTacToeLogic";
import { useState } from "react";
function Board () {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [isX, setIsX] = useState(true);
    const [oWinCount, setoWinCount] = useState(0);
    const [xWinCount, setxWinCount] = useState(0);
    const [status, setStatus] = useState("");

  
    const handleClick = (i) => {
      if (TicTacToeLogic(squares) || squares[i]) {
        return
      }

      squares[i] = isX ? 'X' : 'O'
      setSquares(squares)
      checkWinner()
      setIsX(!isX)
    }


    const checkWinner = ()=>{
      const winner = TicTacToeLogic(squares)      
      if (winner) {
        setStatus(`Winner: ${winner}`)
        if (winner=="X")
        {
          setxWinCount(xWinCount+1)
        }
        else
        {
          setoWinCount(oWinCount+1)
        }
      } else {
        setStatus('Next player: ' + (isX ? 'X' : 'O'))
      }
    }
  

    
    const handleRestart = () => {
      setIsX(true)
      setSquares(Array(9).fill(null))
    }
  
    const renderSquare = (i) => {
      return <Square value={squares[i]} onClick={() => handleClick(i)} />
    }
    
    return (
      <div className="board">
        <h2>Tic Tac Toe :O</h2>
        <div className="status-board">
        <h1 id="player-stat">X wins:{xWinCount}  </h1>
        <h1 id="player-stat"> O wins:{oWinCount}</h1>
        </div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <div className="status">{status}</div>
        <button className="restart" onClick={handleRestart}>Restart Game!</button>
      </div>
    )
  }
  

  export default Board;