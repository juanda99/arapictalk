import React, { useState, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { geminiApiKeyAtom, isApiKeyDialogOpenAtom, apiKeyErrorAtom } from '../store/atoms/apiKeys';
import { themeModeAtom } from '../store/atoms/uiState';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  IconButton,
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const ApiKeyDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useAtom(isApiKeyDialogOpenAtom);
  const [apiKey, setApiKey] = useAtom(geminiApiKeyAtom);
  const error = useAtomValue(apiKeyErrorAtom);
  const themeMode = useAtomValue(themeModeAtom);
  const [inputValue, setInputValue] = useState(apiKey);
  
  // Sync inputValue with stored apiKey when dialog opens
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInputValue(apiKey);
    }
  }, [isOpen, apiKey]);

  const handleSave = () => {
    setApiKey(inputValue);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            bgcolor: themeMode === 'dark' ? '#1a1c1e' : 'background.paper',
            backgroundImage: 'none',
            boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
          },
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '12px',
            bgcolor: 'primary.main',
            color: 'white',
          }}
        >
          <KeyIcon />
        </Box>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          Configurar Gemini API Key
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pt: 1 }}>
        <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.6 }}>
          Para usar las funciones de IA de AraPicTalk, necesitas una API Key de Google Gemini. 
          Puedes obtener una de forma gratuita en el portal de desarrolladores de Google.
        </Typography>

        {error === 'API_KEY_LEAKED' && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              API Key Reportada como Filtrada
            </Typography>
            <Typography variant="caption">
              Tu clave actual ha sido invalidada por seguridad. Por favor, genera una nueva clave en el portal de Google y actualízala aquí.
            </Typography>
          </Alert>
        )}

        <TextField
          fullWidth
          label="Google Gemini API Key"
          variant="outlined"
          type="password"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="AIzaSy..."
          autoFocus
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

        <Box sx={{ mt: 3, p: 2, bgcolor: themeMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main', fontWeight: 600 }}>
            <OpenInNewIcon sx={{ fontSize: 16 }} />
            <Link 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Obtén tu API Key gratuita aquí
            </Link>
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button 
          onClick={handleClose} 
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          disabled={!inputValue.trim()}
          sx={{ 
            borderRadius: 2, 
            px: 4, 
            textTransform: 'none', 
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};
