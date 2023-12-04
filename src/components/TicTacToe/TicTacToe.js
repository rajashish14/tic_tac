import React, { useState } from 'react';
import './TicTacToe.css';


const TicTacToe = () => {
  const initialSquareValues = Array(9).fill('');
  const [selectedOption, setSelectedOption] = useState(''); // State to track the selected option
  const [squareValues, setSquareValues] = useState(initialSquareValues); // State to track values in squares
  const [winner, setWinner] = useState(null); // State to track the winner
  const [isGameTie, setIsGameTie] = useState(false); // State to track if the game is a tie

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleClick = (index) => {
    if (winner || isGameTie) {
      alert('Game Over. Please start a new game.');
      return;
    }

    if (selectedOption === '') {
      alert('Please select an option (X or 0) before marking the squares.');
      return;
    }

    const newSquareValues = [...squareValues];
    if (newSquareValues[index] === '') {
      newSquareValues[index] = selectedOption;
      setSquareValues(newSquareValues);

      // Check for the winner immediately after setting the square value
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (
          newSquareValues[a] !== '' &&
          newSquareValues[a] === newSquareValues[b] &&
          newSquareValues[a] === newSquareValues[c]
        ) {
          setWinner(newSquareValues[a]);
          return;
        }
      }
      // Check for a tie
      if (!newSquareValues.includes('')) {
        setIsGameTie(true);
      }
    } else {
      alert('This square is already filled. Please choose an empty square.');
    }
  };

  const restartGame = () => {
    setSelectedOption('');
    setSquareValues(initialSquareValues);
    setWinner(null);
    setIsGameTie(false);
  };

  return (
    <div className='container'>
      <h1 className='title'>Tic Tac Toe Game</h1>
      <div className="playground">
        {squareValues.map((value, index) => (
          <div
            className="square"
            key={`sq${index + 1}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      <h2>Select any one</h2>
      <div className="option">
        <h1 className='opt1' onClick={() => handleOptionSelect('X')}>X</h1>
        <h1 className='opt2' onClick={() => handleOptionSelect('0')}>0</h1>
      </div>
      <div className="button">
        <button onClick={restartGame}>Restart</button>
      </div>
      {isGameTie && <div className="winner"><p>It's a Tie!</p></div>}
      {winner && !isGameTie && (
        <div className="winner">
          <p>{`Player ${winner} wins!`}</p>
        </div>
      )}
    </div>
  );
}

export default TicTacToe;
