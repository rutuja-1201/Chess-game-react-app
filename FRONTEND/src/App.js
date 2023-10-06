import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import JoinRoom from './onboard/joinroom';
import { ColorContext } from './context/colorcontext';
import Onboard from './onboard/onboard';
import JoinGame from './onboard/joingame';
import ChessGame from './ui/chessgame';

function App() {
  const [didRedirect, setDidRedirect] = React.useState(false);
  const [userName, setUserName] = React.useState('');

  const playerDidRedirect = React.useCallback(() => {
    setDidRedirect(true);
  }, []);

  const playerDidNotRedirect = React.useCallback(() => {
    setDidRedirect(false);
  }, []);

  return (
    <ColorContext.Provider
      value={{
        didRedirect: didRedirect,
        playerDidRedirect: playerDidRedirect,
        playerDidNotRedirect: playerDidNotRedirect,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Onboard setUserName={setUserName} />} />
          <Route
            path="/game/:gameid"
            element={
              didRedirect ? (
                <React.Fragment>
                 
                  <JoinGame userName={userName} isCreator={true} />
                  <ChessGame myUserName={userName} />
                </React.Fragment>
              ) : (
                <JoinRoom />
              )
            }
          />
        
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ColorContext.Provider>
  );
}

export default App;
