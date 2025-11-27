import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import WelcomeModal from './components/WelcomeModal';
import LandingPage from './components/LandingPage';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Afficher la landing page pendant 2.5 secondes
    const timer = setTimeout(() => {
      setShowLanding(false);
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleWelcomeComplete = () => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  };

  // Afficher la landing page pendant le chargement
  if (showLanding) {
    return <LandingPage />;
  }

  return (
    <Provider store={store}>
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        {!username ? (
          <WelcomeModal onComplete={handleWelcomeComplete} />
        ) : (
          <Router>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/board" element={<Board />} />
              <Route path="/board/:tacticId" element={<Board />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        )}
      </div>
    </Provider>
  );
};

export default App;
