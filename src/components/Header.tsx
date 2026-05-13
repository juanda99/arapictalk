import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import BugReportIcon from '@mui/icons-material/BugReport';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Header: React.FC = () => {
  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0} 
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: 'background.paper' 
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.main', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 32, height: 32, bgcolor: 'primary.main', borderRadius: 1, mr: 1.5 }} />
          AraPicTalk
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button startIcon={<LanguageIcon />} color="inherit">ES</Button>
          <IconButton color="inherit"><BugReportIcon /></IconButton>
          <IconButton color="inherit"><AccountCircleIcon /></IconButton>
          <Button variant="contained" color="primary" sx={{ ml: 1 }}>Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
