import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BugReportIcon from '@mui/icons-material/BugReport';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export const Header: React.FC = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        flexShrink: 0, 
        boxShadow: 'none', 
        bgcolor: '#8bc34a', 
        color: 'white',
        borderBottom: 1, 
        borderColor: 'rgba(0,0,0,0.1)' 
      }}
    >
      <Toolbar disableGutters sx={{ px: 2, minHeight: '64px' }}>
        
        <Box
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            gap: 1.5,
            height: '40px'
          }}
        >
          <img 
            src="https://arapictalk.arasaac.org/logo_AraPicTalk_texto_blanco%20v2.png" 
            alt="AraPicTalk" 
            style={{ height: '100%', objectFit: 'contain' }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Informar de un error">
            <IconButton size="large" sx={{ color: 'white' }}>
              <BugReportIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Idioma">
            <IconButton size="large" sx={{ color: 'white' }}>
              <LanguageIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Perfil">
            <IconButton size="large" sx={{ color: 'white' }}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        </Box>

      </Toolbar>
    </AppBar>
  );
};
