import React from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to navigate between routes
import { startGame } from '../service/Service'; // Import the startGame service from your service file

const StartGameButton: React.FC = () => {
    const { connected, account, signAndSubmitTransaction } = useWallet(); // Get wallet connection info
    const navigate = useNavigate(); // Initialize navigate for route changes

    // Function to handle starting the game
    const handleStartGame = async () => {
        // Check if wallet is connected and account exists
        if (!connected || !account) {
            alert('Please connect your wallet first.');
            return;
        }

        try {
            // Check if the signAndSubmitTransaction function is available
            if (!signAndSubmitTransaction) {
                throw new Error('signAndSubmitTransaction is not available');
            }
            
            // Use the account address to start the game
            await startGame(account.address, signAndSubmitTransaction);
            
            // Navigate to the game page after successfully starting the game
            navigate('/game');
        } catch (error) {
            // Handle and display any errors that occur during the process
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            alert(`Failed to start game: ${errorMessage}`);
        }
    };

    return (
        // Button to start the game, disabled if the wallet is not connected
        <button className="start-game-button" onClick={handleStartGame} disabled={!connected}>
            Start Game
        </button>
    );
};

export default StartGameButton;
