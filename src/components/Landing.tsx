import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetAtom } from 'jotai';
import { boardDataAtom, geminiSystemPromptAtom } from '../store/atoms/boardState';
import { generateBoardData } from '../services/geminiApi';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useAtomValue } from 'jotai';

export const Landing: React.FC = () => {
  const { t } = useTranslation();
  const setBoardData = useSetAtom(boardDataAtom);
  const systemPrompt = useAtomValue(geminiSystemPromptAtom);
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
      const data = await generateBoardData(input, systemPrompt);
      setBoardData(data);
    } catch (err) {
      console.error('Error generating board:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al generar el tablero');
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
          <Alert severity="error" sx={{ borderRadius: 2 }}>
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
      </Box>
      
      <Typography variant="body2" sx={{ mt: 4, opacity: 0.5 }}>
        Impulsado por Gemini AI y ARASAAC
      </Typography>
    </Box>
  );
};

