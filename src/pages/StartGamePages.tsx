import React from 'react';
import '../components/css/StartGame.css'; // Import CSS for the page
import StartGameButton from '../components/StartGameButton'; // Import the Start Game button
import Footer from '../pages/Footer'; // Import the Footer component
const StartGamePages: React.FC = () => {

  return (
    <div>
      <div className="GameStart-container">
        <p className="game-description">
          Welcome to Aptos Rock-Paper-Scissors! Get ready to face your computer opponent in this exciting game.
          Click the button below to start playing.
        </p>
        <StartGameButton />
      </div>
      <Footer />
    </div>
  );
};

export default StartGamePages;
