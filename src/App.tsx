import React, { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { boardDataAtom } from './store/atoms/boardState';
import { Landing } from './components/Landing';
import { Board } from './components/Board';
import { SentenceBar } from './components/SentenceBar';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import Box from '@mui/material/Box';

const LandscapeGuard = ({ children }: { children: React.ReactNode }) => {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isPortrait) {
    return (
      <div style={{ display: 'flex', height: '100dvh', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
        <h2>Por favor, gira el dispositivo. La aplicación AAC está diseñada para usarse en horizontal.</h2>
      </div>
    );
  }

  return <>{children}</>;
};

function App() {
  const boardData = useAtomValue(boardDataAtom);

  return (
    <LandscapeGuard>
      {!boardData ? (
        <Landing />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', bgcolor: 'background.default', overflow: 'hidden' }}>
          <Header />
          <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <Sidebar />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div className="sentence-bar">
                <SentenceBar />
              </div>
              <Box component="main" sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <Board />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </LandscapeGuard>
  );
}

export default App;
