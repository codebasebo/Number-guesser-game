import React, { useState } from 'react';
import { generateRandomNumber } from '../utils/generateRandomNumber';

const Game: React.FC = () => {
    const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
    const [guess, setGuess] = useState<number | null>(null);
    const [feedback, setFeedback] = useState('');
    const [attempts, setAttempts] = useState(10);
    const [difficulty, setDifficulty] = useState('easy');

    const getAttempts = () => {
        switch (difficulty) {
            case 'easy':
                return 10;
            case 'medium':
                return 7;
            case 'hard':
                return 5;
            default:
                return 10;
        }
    };

    const handleGuess = () => {
        if (guess === null || guess < 1 || guess > 100) {
            setFeedback('Please enter a number between 1 and 100');
            return;
        }
        if (guess < secretNumber) {
            setFeedback('Too low!');
        } else if (guess > secretNumber) {
            setFeedback('Too high!');
        } else {
            setFeedback('Correct! You win!');
        }
        setAttempts(attempts - 1);
    };

    const handleRestart = () => {
        setSecretNumber(generateRandomNumber());
        setGuess(null);
        setFeedback('');
        setAttempts(getAttempts());
    };

    return (
        <div>
            <h1>Number Guesser Game</h1>
            <label>
                Difficulty:
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </label>
            <p>Guess the number between 1 and 100</p>
            <input
                type="number"
                value={guess ?? ''}
                onChange={(e) => setGuess(Number(e.target.value))}
            />
            <button onClick={handleGuess}>Guess</button>
            <p>{feedback}</p>
            <p>Attempts remaining: {attempts}</p>
            {attempts === 0 && <p>You lose! The number was {secretNumber}</p>}
            <button onClick={handleRestart}>Restart</button>
        </div>
    );
};

export default Game;
