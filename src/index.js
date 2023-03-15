import React, { useState, useEffect  } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import myMusic from './music1.mp3';

function Square(props){
    return (
      <button 
      className="square" 
      onClick={props.onClick} >
        {props.value}
      </button>
    );
  }


function Board() {

  const [squares,setSquare] = useState(Array(9).fill(null));
  const [xIsNext, setxIsNext] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const winner = whoIsTheWinner(squares);
  const [audio] = useState( new Audio(myMusic));
  const [currentTimeMusic, setCurrentTimeMusic] = useState(0);


  let status = winner ? 'Winner: ' + winner : isItTie() ? "It's a Tie!" :'Next player: ' + (xIsNext ? 'X' : 'O');

  useEffect(() => {

    if (isMusicPlaying) {
      audio.currentTime = currentTimeMusic;
      audio.play();

    } else {
     // currentTimeMusic =  audio.currentTime ;
     setCurrentTimeMusic(audio.currentTime );
      audio.pause();
    }
   
  }, [isMusicPlaying]);


const handlerMusic = ()=>{

  setIsMusicPlaying(!isMusicPlaying);
};
const handleClick = i =>{
  const nerSquares = squares.slice();
  if(winner||nerSquares[i])
  {
    return;
  }
  nerSquares[i] = xIsNext?'X':'O';
  setSquare(nerSquares);
  setxIsNext(!xIsNext);
};

const handlerNewGame =()=>{
  const newSquares =Array(9).fill(null);
  setSquare(newSquares);
  setxIsNext(true);
};


function isItTie(){
  for(let i=0; i<squares.length;i++)
  {
    if(squares[i] == null)
       return false;
}
return true;
}

 const renderSquare = (i) =>{
  return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

    return (
      <div>
        <div className="status">{status}</div>
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
        
       <button onClick= {handlerNewGame}>NEW GAME</button>
       <button className="musicButton" onClick={handlerMusic}>{isMusicPlaying ? "Turn Music OFF" : "Turn Music ON"}</button>
      </div>
    );
  }


function Game() {
   
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  
}

function whoIsTheWinner(squares){
  const checkWinner = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for( let i = 0 ; i<checkWinner.length; i++)
  {
  const [a, b, c] = checkWinner[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

const root = document.getElementById('root');
ReactDOM.render(<Game />, root);