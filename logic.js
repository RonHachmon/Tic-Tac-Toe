let currentPlayer = "X";
const cells=document.getElementsByClassName("cell");

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

window.onload=function(){
  for (const cell of cells) {    
    cell.onclick =e=>{handleClick(e)}
  }
}

function handleClick(event) {
  const cell = event.target;
  if (cell.innerHTML === "") {
    drawCharacter(cell);
    updateBoard(cell);
  }
}

function drawCharacter(cell) 
{
  cell.innerHTML=currentPlayer
}


function updateBoard(cell) {
  const cell_id = cell.id;
  const parts = cell_id.split("-");
  const row = parseInt(parts[1]);
  const col = parseInt(parts[3]);
  board[row][col] = currentPlayer;
  if(checkWin(currentPlayer))
  {
    presentWinner(currentPlayer)
  }
  else
  {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
  }

}

  // Check for win
  function checkWin(player) {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (board[row][0] === player && board[row][1] === player && board[row][2] === player) {
        return true;
      }
    }
    // Check column
    for (let col = 0; col < 3; col++) {
      if (board[0][col] === player && board[1][col] === player && board[2][col] === player) {
        return true;
      }
    }
    // Check diagonals
    if (board[0][0] === player && board[1][1] === player&& board[2][2] === player) {
      return board[0][0];
    }
    if (board[2][0] === player && board[1][1] === player && board[2][0] === player) {
      return board[2][0];
    }
    return false
  }

  function presentWinner(playerChar)
  {

    Swal.fire({
      icon: 'success',
      title: 'Winner',
     text: `Player ${playerChar} won`,
    });
  }
  function reset()
  {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          board[row][col]=""
      }
    }

    resetGUIBoar()
    currentPlayer = "X";
  }
  function resetGUIBoar(){
    
    for (const cell of cells) {
      cell.innerHTML = "";
    }

  }













