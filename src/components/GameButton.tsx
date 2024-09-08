import React, { useState, useEffect } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import { setPlayerMove, randomlySetComputerMove, finalizeGameResults, getComputerMove, getGameResults, getPlayerScore, resetGame, getComputerScore } from '../service/Service';
import RockIcon from '../assets/rock.png';
import PaperIcon from '../assets/paper.png';
import ScissorsIcon from '../assets/scissors.png';
enum MoveValue {
    ROCK = 1,
    PAPER = 2,
    SCISSORS = 3
}

const GameButton: React.FC = () => {
    const { account, signAndSubmitTransaction } = useWallet();
    const navigate = useNavigate();
    const { disconnect } = useWallet();
    const [playerMove, setPlayerMoveState] = useState<MoveValue | null>(null);
    const [computerMove, setComputerMoveState] = useState<MoveValue | null>(null);
    const [gameResult, setGameResult] = useState<string | null>(null);
    const [playerScore, setPlayerScore] = useState<number | null>(null);
    const [computerScore, setComputerScore] = useState<number | null>(null); // State for computer score
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [resultsVisible, setResultsVisible] = useState<boolean>(false);

    const handleDisconnect = async () => {
        if (!account || !signAndSubmitTransaction) {
            alert('Please connect your wallet first.');
            return;
        }
        try {
            // Check if disconnect function is available
            if (disconnect) {
                // Call disconnect and wait for it to complete
                await resetGame(account.address, signAndSubmitTransaction);
                await disconnect();
                // Navigate after successful disconnection
                navigate('/');
            } else {
                console.error('Disconnect function is not available.');
            }
        } catch (error) {
            console.error('An error occurred while disconnecting:', error);
        }
    };

    useEffect(() => {
        if (account) {
            const fetchResults = async () => {
                try {
                    if (gameStarted) {
                        const fetchedGameResults = await getGameResults(account.address);
                        const fetchedPlayerScore = await getPlayerScore(account.address);
                        const fetchedComputerScore = await getComputerScore(account.address); // Fetch computer score

                        const resultString = formatGameResults(fetchedGameResults as MoveValue);
                        setGameResult(resultString);
                        setResultsVisible(true); // Show results
                        setPlayerScore(fetchedPlayerScore || 0); // Ensure playerScore is at least 0
                        setComputerScore(fetchedComputerScore || 0); // Ensure computerScore is at least 0
                    }
                } catch (error) {
                    console.error("Error fetching game results:", error);
                }
            };

            fetchResults();
        }
    }, [account, gameStarted]);

    const formatGameResults = (gameResults: number): string => {
        switch (gameResults) {
            case 1:
                return 'Player Wins';
            case 2:
                return 'Draw';
            case 3:
                return 'Computer Wins';
            default:
                return 'Unknown result';
        }
    };

    const handlePlayerMove = async (move: MoveValue) => {
        if (!account || !signAndSubmitTransaction) {
            alert('Please connect your wallet first.');
            return;
        }

        try {
            await setPlayerMove(account.address, move, signAndSubmitTransaction);
            await randomlySetComputerMove(account.address, signAndSubmitTransaction);
            await finalizeGameResults(account.address, signAndSubmitTransaction);

            // Refresh results
            const fetchedComputerMove = await getComputerMove(account.address);
            const fetchedGameResults = await getGameResults(account.address);
            const fetchedPlayerScore = await getPlayerScore(account.address);
            const fetchedComputerScore = await getComputerScore(account.address); // Fetch computer score

            setPlayerMoveState(move);
            setComputerMoveState(fetchedComputerMove);

            const resultString = formatGameResults(fetchedGameResults as MoveValue);
            setGameResult(resultString);
            setPlayerScore(fetchedPlayerScore || 0);
            setComputerScore(fetchedComputerScore || 0); // Update computer score
            setResultsVisible(true); // Show results after game ends
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            alert(`Failed to process move: ${errorMessage}`);
        }
    };

    const handleRestartGame = async () => {
        if (!account || !signAndSubmitTransaction) {
            alert('Please connect your wallet first.');
            return;
        }

        try {
            await resetGame(account.address, signAndSubmitTransaction);

            setGameStarted(false);
            setPlayerMoveState(null);
            setComputerMoveState(null);
            setGameResult(null);
            setPlayerScore(0); // Reset player score to 0
            setComputerScore(0); // Reset computer score to 0
            setResultsVisible(false); // Hide results

            navigate('/welcome');
        } catch (error) {
            console.error("Error resetting the game:", error);
            alert("Failed to reset the game. Please try again.");
        }
    };
    const getMoveIcon = (playerMove: MoveValue) => {
        const moveIcons: { [key in MoveValue]: string } = {
            [MoveValue.ROCK]: RockIcon,
            [MoveValue.PAPER]: PaperIcon,
            [MoveValue.SCISSORS]: ScissorsIcon
        };

        const iconSrc = moveIcons[playerMove];

        return (
            <img src={iconSrc} alt={MoveValue[playerMove]} className="icon" />
        );
    };
    const handlePlayAgain = () => {
        setResultsVisible(false); // Hide game result and reset game
        setPlayerMoveState(null);
        setComputerMoveState(null);
        setGameResult(null);
    };
    return (
        <div className="GamePage-container">
            {!gameStarted ? (
                <div>
                    <div className="GamePlay-container">
                        <div className="player-score">
                            <p>Player Score: {playerScore !== null ? playerScore : 0}</p>
                        </div>

                        <div className="game-center">
                            {!resultsVisible ? (
                                <div className="button-container">
                                    <p>Choose Your Move :</p>
                                    <div
                                        className="button rock"
                                        onClick={() => handlePlayerMove(MoveValue.ROCK)}
                                    >
                                        <img src={RockIcon} alt="Rock" className="icon" />
                                    </div>
                                    <div
                                        className="button paper"
                                        onClick={() => handlePlayerMove(MoveValue.PAPER)}
                                    >
                                        <img src={PaperIcon} alt="Paper" className="icon" />
                                    </div>
                                    <div
                                        className="button scissors"
                                        onClick={() => handlePlayerMove(MoveValue.SCISSORS)}
                                    >
                                        <img src={ScissorsIcon} alt="Scissors" className="icon" />
                                    </div>
                                </div>
                            ) : (
                                playerMove !== null && computerMove !== null && (
                                    <div className='game-result'>
                                        <div className='game-result-item'>
                                            <p>Player Move:</p>
                                            {getMoveIcon(playerMove)}
                                        </div>
                                        <div className='game-result-item'>
                                            <p>Result: {gameResult}</p>
                                            <button onClick={handlePlayAgain} className='play-again'>Play Again</button> {/* Added button */}
                                        </div>
                                        <div className='game-result-item'>
                                            <p>Computer Move:</p>
                                            {getMoveIcon(computerMove)}
                                        </div>
                                    </div>

                                )
                            )}

                        </div>

                        <div className="computer-score">
                            <p>Computer Score: {computerScore !== null ? computerScore : 0}</p>
                        </div>
                    </div>
                    <div className='bottombutton'>
                        <button onClick={handleRestartGame}>Restart Game</button>
                        <button onClick={handleDisconnect}>Disconnected</button>
                    </div>
                </div>


            ) : (
                <p>Game has not started yet.</p>
            )}
        </div>
    );
};

export default GameButton;
