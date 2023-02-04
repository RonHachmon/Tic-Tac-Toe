import './App.css';
import Board from './components/Board';

import ScoreboardProvider from './components/Scoreboard';

function App() {
  return (
    <ScoreboardProvider>
    <Board></Board>
    </ScoreboardProvider>
  );
}

export default App;
