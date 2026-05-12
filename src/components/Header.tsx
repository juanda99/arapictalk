import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import BugReportIcon from '@mui/icons-material/BugReport';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { useSetAtom, useAtom } from 'jotai';
import { isSidebarOpenAtom, zoomLevelAtom } from '../store/atoms/uiState';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const setSidebarOpen = useSetAtom(isSidebarOpenAtom);
  const [zoom, setZoom] = useAtom(zoomLevelAtom);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleZoomReset = () => setZoom(1.0);

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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 3 }}>
          <Tooltip title="Alejar">
            <IconButton onClick={handleZoomOut} size="small" sx={{ color: 'white' }}>
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
          <Box sx={{ minWidth: '45px', textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: '0.9rem' }}>
            {Math.round(zoom * 100)}%
          </Box>
          <Tooltip title="Acercar">
            <IconButton onClick={handleZoomIn} size="small" sx={{ color: 'white' }}>
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Tamaño completo">
            <IconButton onClick={handleZoomReset} size="small" sx={{ color: 'white', ml: 0.5 }}>
              <AspectRatioIcon />
            </IconButton>
          </Tooltip>
        </Box>

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
