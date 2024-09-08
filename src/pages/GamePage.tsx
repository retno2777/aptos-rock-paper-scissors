import React from 'react';
import GameButton from '../components/GameButton'; 
import '../components/css/GameButton.css';
import Footer from '../pages/Footer'; // Import the Footer component

const GamePage: React.FC = () => {
    return (
        <div className="GamePage-container">
            <h1>Aptos Rock-Paper-Scissors</h1>
            <GameButton/>
            <Footer />
        </div>
    );
};

export default GamePage;
