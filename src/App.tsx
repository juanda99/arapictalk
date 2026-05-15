import React, { useEffect, useRef, useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { boardDataAtom, activeProfileAtom } from './store/atoms/boardState';
import { windowSizeAtom, boardAreaHeightAtom, themeModeAtom, isFullscreenAtom } from './store/atoms/uiState';
import { Landing } from './components/Landing';
import { Board } from './components/Board';
import { SentenceBar } from './components/SentenceBar';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { FontLoader } from './components/FontLoader';
import { OrientationOverlay } from './components/OrientationOverlay';
import Box from '@mui/material/Box';

function App() {
  const boardData = useAtomValue(boardDataAtom);
  const profile = useAtomValue(activeProfileAtom);
  const themeMode = useAtomValue(themeModeAtom);
  const setWindowSize = useSetAtom(windowSizeAtom);
  const setBoardAreaHeight = useSetAtom(boardAreaHeightAtom);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const isFullscreen = useAtomValue(isFullscreenAtom);
  const setIsFullscreen = useSetAtom(isFullscreenAtom);

  // Track window size for colWidth calculation
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    setIsFullscreen(!!document.fullscreenElement);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [setWindowSize, setIsFullscreen]);

  // Auto-fullscreen attempt on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 600 || window.innerHeight < 600;
    if (boardData && isMobile) {
      const attemptFullscreen = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const docEl = document.documentElement as any;
        const requestFullscreen = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
        if (requestFullscreen && !document.fullscreenElement) {
          requestFullscreen.call(docEl).catch(() => {});
        }
        // Remove listeners after first interaction
        window.removeEventListener('click', attemptFullscreen);
        window.removeEventListener('touchstart', attemptFullscreen);
      };

      window.addEventListener('click', attemptFullscreen);
      window.addEventListener('touchstart', attemptFullscreen);
      
      return () => {
        window.removeEventListener('click', attemptFullscreen);
        window.removeEventListener('touchstart', attemptFullscreen);
      };
    }
  }, [boardData]);

  // Measure the right panel height via ResizeObserver — the ONLY source of truth
  // for vertical layout. Does NOT depend on rowHeight, so no circular dependency.
  const observeRightPanel = useCallback((el: HTMLDivElement | null) => {
    (rightPanelRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setBoardAreaHeight(entry.contentRect.height);
      }
    });
    ro.observe(el);
    setBoardAreaHeight(el.getBoundingClientRect().height);

    return () => ro.disconnect();
  }, [setBoardAreaHeight]);

  return (
    <>
      <FontLoader />
      {!boardData ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100dvh', width: '100vw' }}>
          <Header />
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <Landing />
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100dvh', width: '100vw', bgcolor: profile.boardBackgroundColor || (themeMode === 'dark' ? '#1a1c1e' : '#FFFFFF'), overflow: 'hidden' }}>
          <OrientationOverlay />
          {!isFullscreen && <Sidebar />}
          {/* Right panel: its height is the source of truth for layout calculations */}
          <Box
            ref={observeRightPanel}
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}
          >
            <SentenceBar />
            <Box component="main" sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <Board />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default App;
