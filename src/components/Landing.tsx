import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtomValue, useSetAtom } from 'jotai';
import { boardDataAtom, geminiSystemPromptAtom } from '../store/atoms/boardState';
import { geminiApiKeyAtom, isApiKeyDialogOpenAtom, apiKeyErrorAtom } from '../store/atoms/apiKeys';
import { generateBoardData } from '../services/geminiApi';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export const Landing: React.FC = () => {
  const { t } = useTranslation();
  const setBoardData = useSetAtom(boardDataAtom);
  const systemPrompt = useAtomValue(geminiSystemPromptAtom);
  const geminiApiKey = useAtomValue(geminiApiKeyAtom);
  const setIsApiKeyDialogOpen = useSetAtom(isApiKeyDialogOpenAtom);
  const setApiKeyError = useSetAtom(apiKeyErrorAtom);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsGenerating(true);
    setError(null);

    // Request fullscreen on user gesture
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const docEl = document.documentElement as any;
    const requestFullscreen = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
    if (requestFullscreen) {
      requestFullscreen.call(docEl).catch(() => {
        // Silently fail if blocked
      });
    }
    
    try {
      const data = await generateBoardData(input, systemPrompt, geminiApiKey);
      setBoardData(data);
    } catch (err) {
      console.error('Error generating board:', err);
      
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('API_KEY_MISSING') || msg.includes('API_KEY_LEAKED') || msg.includes('leaked')) {
        setApiKeyError(msg.includes('LEAKED') || msg.includes('leaked') ? 'API_KEY_LEAKED' : 'API_KEY_MISSING');
        setIsApiKeyDialogOpen(true);
        setError(msg.includes('LEAKED') || msg.includes('leaked') ? 'Clave API filtrada o inválida' : 'Falta la clave API de Gemini');
      } else {
        setError(err instanceof Error ? err.message : 'Error desconocido al generar el tablero');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100%', 
        padding: '2rem',
        textAlign: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, color: 'primary.main', mb: 4 }}>
        {t('appTitle')}
      </Typography>

      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem', 
          width: '100%', 
          maxWidth: '600px',
          p: 4,
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, opacity: 0.8 }}>
          ¿Sobre qué quieres hablar hoy?
        </Typography>

        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('dynamicInputPlaceholder')}
          disabled={isGenerating}
          variant="outlined"
          autoFocus
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
        />

        {error && (
          <Alert 
            severity="error" 
            sx={{ borderRadius: 2, textAlign: 'left' }}
            action={
              (error.includes('API') || error.includes('clave')) && (
                <Button color="inherit" size="small" onClick={() => setIsApiKeyDialogOpen(true)}>
                  CONFIGURAR
                </Button>
              )
            }
          >
            {error}
          </Alert>
        )}

        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          disabled={isGenerating || !input.trim()}
          startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : null}
          sx={{ 
            py: 1.5, 
            fontSize: '1.1rem', 
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: 700,
            boxShadow: '0 4px 14px rgba(76, 175, 80, 0.3)'
          }}
        >
          {isGenerating ? t('loading') : t('generateBoard')}
        </Button>

        {!geminiApiKey && (
          <Button
            variant="text"
            onClick={() => setIsApiKeyDialogOpen(true)}
            sx={{ textTransform: 'none', fontWeight: 600, mt: -1 }}
          >
            Configurar API Key de Gemini
          </Button>
        )}
      </Box>
      
      <Typography variant="body2" sx={{ mt: 4, opacity: 0.5 }}>
        Impulsado por Gemini AI y ARASAAC
      </Typography>
    </Box>
  );
};

