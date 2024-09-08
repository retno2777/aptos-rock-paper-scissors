import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import StartGamePages from './pages/StartGamePages';
import GamePage from './pages/GamePage';
import WalletSelectionPage from './pages/LoginWallet';

function App() {
  const { connected } = useWallet();

  return (
    <Router>
      <div className="App">
        {/* Display routes based on wallet connection */}
        <Routes>
          {/* Route for wallet selection */}
          {!connected && (
            <Route path="/" element={<WalletSelectionPage />} />
          )}
          {/* Routes for other pages */}
          {connected && (
            <>
              <Route path="/welcome" element={<StartGamePages /> } />
              <Route path="/game" element={<GamePage />} />
              <Route path="/" element={<Navigate to="/welcome" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
