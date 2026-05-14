import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import { useAtomValue } from 'jotai';
import { windowSizeAtom } from '../store/atoms/uiState';

export const OrientationOverlay: React.FC = () => {
  const { width, height } = useAtomValue(windowSizeAtom);
  
  // Only show overlay if it's likely a mobile device (width < 600 or height < 600)
  // AND we are in portrait (height > width)
  const isMobile = width < 600 || height < 600;
  const isPortrait = height > width;
  
  if (!isMobile || !isPortrait) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: '#8bc34a',
        color: 'white',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
      }}
    >
      <ScreenRotationIcon sx={{ fontSize: 80, mb: 4, animation: 'rotate 2s infinite ease-in-out' }} />
      <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
        Gira tu dispositivo
      </Typography>
      <Typography variant="h6">
        Para una mejor experiencia con el tablero, usa el modo apaisado (horizontal).
      </Typography>

      <style>
        {`
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(90deg); }
            50% { transform: rotate(90deg); }
            75% { transform: rotate(0deg); }
            100% { transform: rotate(0deg); }
          }
        `}
      </style>
    </Box>
  );
};
