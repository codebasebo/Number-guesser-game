import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from './Game';

describe('Game Component', () => {
    test('renders the game component', () => {
        render(<Game />);
        expect(screen.getByText(/Number Guesser Game/i)).toBeInTheDocument();
    });

    test('provides feedback for a guess', () => {
        render(<Game />);
        const input = screen.getByRole('spinbutton');
        const button = screen.getByText(/Guess/i);

        fireEvent.change(input, { target: { value: '50' } });
        fireEvent.click(button);

        expect(screen.getByText(/Too low/i)).toBeInTheDocument();
    });

    test('restarts the game', () => {
        render(<Game />);
        const restartButton = screen.getByText(/Restart/i);

        fireEvent.click(restartButton);

        expect(screen.getByText(/Guess the number between 1 and 100/i)).toBeInTheDocument();
    });

    test('validates input', () => {
        render(<Game />);
        const input = screen.getByRole('spinbutton');
        const button = screen.getByText(/Guess/i);

        fireEvent.change(input, { target: { value: '150' } });
        fireEvent.click(button);

        expect(screen.getByText(/Please enter a number between 1 and 100/i)).toBeInTheDocument();
    });
});
