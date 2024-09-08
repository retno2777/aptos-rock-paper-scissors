import { AptosClient } from "aptos";

const aptosClient = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1');
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const startGame = (accountAddress: string, signAndSubmitTransaction: Function) => {
  return signAndSubmitTransaction({
    sender: accountAddress,
    data: {
      function: `0x3e070dca2fdbfbb8cb33b6abeb4b60a4c08b260a61d3b30f402ae1b50bacc9e9::RockPaperScissors::start_game`,
      type_arguments: [],
      functionArguments: [],
    },
  })
  .then((response: any) => {
    return aptosClient.waitForTransaction(response.hash)
      .then(() => delay(1000));
  })
  .catch((error: unknown) => {
    console.error("Error starting game:", error);
    throw error;
  });
};

const setPlayerMove = async (accountAddress: string, move: number, signAndSubmitTransaction: Function) => {
  try {
    const response = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `0x3e070dca2fdbfbb8cb33b6abeb4b60a4c08b260a61d3b30f402ae1b50bacc9e9::RockPaperScissors::set_player_move`,
        typeArguments: [],
        functionArguments: [move],
      },
    });

    await aptosClient.waitForTransaction(response.hash);
    await delay(1000);
  } catch (error) {
    console.error("Error setting player move:", error);
    throw error;
  }
};

const randomlySetComputerMove = async (accountAddress: string, signAndSubmitTransaction: Function) => {
  try {
    const response = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `0x3e070dca2fdbfbb8cb33b6abeb4b60a4c08b260a61d3b30f402ae1b50bacc9e9::RockPaperScissors::randomly_set_computer_move`,
        typeArguments: [],
        functionArguments: [],
      },
    });

    await aptosClient.waitForTransaction(response.hash);
    await delay(1000);
  } catch (error) {
    console.error("Error setting computer move:", error);
    throw error;
  }
};

const finalizeGameResults = async (accountAddress: string, signAndSubmitTransaction: Function) => {
  try {
    const response = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `0x3e070dca2fdbfbb8cb33b6abeb4b60a4c08b260a61d3b30f402ae1b50bacc9e9::RockPaperScissors::finalize_game_results`,
        typeArguments: [],
        functionArguments: [],
      },
    });

    await aptosClient.waitForTransaction(response.hash);
    await delay(1000);
  } catch (error) {
    console.error("Error finalizing game results:", error);
    throw error;
  }
};

const getComputerMove = async (accountAddress: string) => {
  try {
    const result = await aptosClient.view({
      function: `0x3e070dca2fdbfbb8cb33b6abeb4b60a4c08b260a61d3b30f402ae1b50bacc9e9::RockPaperScissors::get_computer_move`,
      type_arguments: [],
      arguments: [accountAddress],
    });
    return parseInt(result[0].toString());
  } catch (error) {
    console.error("Error getting computer move:", error);
    throw error;
  }
};

const getGameResults = async (accountAddress: string) => {
  try {
    const result = await aptosClient.view({
      function: `0x3e070dca2fdbfbb8cb33b6abeb4b60a4c08b260a61d3b30f402ae1b50bacc9e9::RockPaperScissors::get_game_results`,
      type_arguments: [],
      arguments: [accountAddress],
    });
    return result[0];
  } catch (error) {
    console.error("Error getting game results:", error);
    throw error;
  }
};

const getComputerScore = async (accountAddress: string) => {
  try {
    const result = await aptosClient.view({
      function: `0x3e070dca2fdbfbb8cb33b6abeb4b60a4c08b260a61d3b30f402ae1b50bacc9e9::RockPaperScissors::get_computer_score`,
      type_arguments: [],
      arguments: [accountAddress],
    });
    return parseInt(result[0].toString());
  } catch (error) {
    console.error("Error getting player score:", error);
    throw error;
  }
};

const getPlayerScore = async (accountAddress: string) => {
  try {
    const result = await aptosClient.view({
      function: `0x3e070dca2fdbfbb8cb33b6abeb4b60a4c08b260a61d3b30f402ae1b50bacc9e9::RockPaperScissors::get_player_score`,
      type_arguments: [],
      arguments: [accountAddress],
    });
    return parseInt(result[0].toString());
  } catch (error) {
    console.error("Error getting player score:", error);
    throw error;
  }
};

const resetGame = async (accountAddress: string, signAndSubmitTransaction: Function) => {
  try {
    // Create the transaction to reset the game
    const response = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `0x3e070dca2fdbfbb8cb33b6abeb4b60a4c08b260a61d3b30f402ae1b50bacc9e9::RockPaperScissors::reset_game`,
        typeArguments: [],
        functionArguments: [],
      },
    });

    // Wait for the transaction to be confirmed
    await aptosClient.waitForTransaction(response.hash);
    await delay(1000); // Optional delay to ensure the reset is processed
  } catch (error) {
    console.error("Error resetting game:", error);
    throw error;
  }
};

export {
    startGame,
    setPlayerMove,
    randomlySetComputerMove,
    finalizeGameResults,
    getGameResults,
    getComputerMove,
    getPlayerScore,
    getComputerScore,
    resetGame
};
