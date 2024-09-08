# Rock-Paper-Scissors: The Ultimate Blockchain Experience

Welcome to Rock-Paper-Scissors with a blockchain twist! This enhanced version of the classic game not only ensures fairness and transparency with the Aptos blockchain but also introduces exciting new features for an engaging experience.

![Game Preview](https://github.com/retno2777/aptos-rock-paper-scissors/blob/main/src/readMeImage/Home.png)


## 🚀 Features

- **Endless Gameplay:** Keep the fun going with the ability to restart a new game immediately after the current one ends.
- **Score Tracking:** Play multiple rounds and keep track of wins and losses for both the player and the computer, all managed by our updated smart contract.
- **Interactive Frontend:** Forget about using block explorers—engage with the game through a sleek, user-friendly interface built with React. Our frontend integrates seamlessly with the Aptos blockchain, allowing players to interact with the game directly from the web app. The React-based UI ensures a smooth and responsive experience, making gameplay intuitive and enjoyable.
- **APT Token Wagering:** Bet APT tokens when starting a game. The winner takes the entire pot, adding an exciting stakes element to every round.

## 🛠 Tech Stack

- **Frontend:** React, with an intuitive UI for a smooth gameplay experience.
- **Backend:** Aptos Blockchain, handling game logic and security.
- **Blockchain SDK:** Aptos Labs Wallet Adapter for secure wallet integration.
- **Smart Contract:** Enhanced to support multiple rounds, scorekeeping, and APT token wagers.

## 🎮 How to Play

1. **Connect Your Wallet:** Ensure you have a Petra Wallet connected to the Testnet Network.
   ![Connect Wallet](https://github.com/retno2777/aptos-rock-paper-scissors/blob/main/src/readMeImage/Connect.png)
2. **Start a New Game:** Click the "Start Game" button to begin a round. You can now also wager APT tokens if desired.
   ![Start Game](https://github.com/retno2777/aptos-rock-paper-scissors/blob/main/src/readMeImage/Start.png)
3. **Make Your Move:** Choose Rock, Paper, or Scissors by clicking the respective button.
   ![Choose Move](https://github.com/retno2777/aptos-rock-paper-scissors/blob/main/src/readMeImage/Home.png)
4. **View Results:** The game will determine the winner based on classic rules, and the results, along with updated scores, will be recorded on the blockchain.
5. **Play Again:** Play again instantly with the "Play Again" button and continue to wager APT tokens if you wish.
   ![Final Screen](https://github.com/retno2777/aptos-rock-paper-scissors/blob/main/src/readMeImage/Result.png)

## 📊 Scorekeeping

- **Draw:** 2 point
- **Win:** 1 points
- **Lose:** 3 points

Scores are updated in real-time and tracked over multiple rounds.

## 💻 Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/vincentbmw/aptos-rock-paper-scissors.git

2. **Install dependencies:**
   ```bash
   cd aptos-rock-paper-scissors 
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Access the Game**: Open your browser and go to http://localhost:3000 to start playing!


### Key Additions:

- **Deploying Smart Contract Section:** Instructions for using Cloud Shell to deploy your smart contract, including cloning the repository, installing the Aptos CLI, and deploying the contract.
- **Consistent Formatting:** All instructions are formatted for clarity, ensuring ease of use for developers. 

Feel free to adjust the repository URLs or other specifics based on your actual setup and requirements.
