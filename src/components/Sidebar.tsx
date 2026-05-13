import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { isSidebarOpenAtom, themeModeAtom } from '../store/atoms/uiState';
import { activeProfileAtom } from '../store/atoms/boardState';
import type { UserProfile } from '../core/types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import TuneIcon from '@mui/icons-material/Tune';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import FormatAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import FormatAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import FormatAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ImageIcon from '@mui/icons-material/Image';
import ShareIcon from '@mui/icons-material/Share';
import BugReportIcon from '@mui/icons-material/BugReport';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { themeModeAtom } from '../store/atoms/uiState';
import { FONT_LIST } from '../constants/fonts';
import { FontOption } from './FontOption';
import languages from '../constants/languages';

const FITZGERALD_COLORS = [
  { name: 'Personas', color: '#FFF59D' },
  { name: 'Lugares', color: '#C8E6C9' },
  { name: 'Acciones', color: '#BBDEFB' },
  { name: 'Objetos', color: '#FFE0B2' },
  { name: 'Descriptores', color: '#E1BEE7' },
  { name: 'Social', color: '#F8BBD0' },
  { name: 'Tiempo', color: '#D7CCC8' },
];


export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useAtom(isSidebarOpenAtom);
  const [profile, setProfile] = useAtom(activeProfileAtom);
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);
  const [sidebarMode, setSidebarMode] = useState<'settings' | 'library' | 'local' | 'templates'>('settings');
  const [tabIndex, setTabIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>('text');

  // Export Menu State
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);
  const openExportMenu = Boolean(exportAnchorEl);

  const updateProfile = (key: keyof UserProfile, value: unknown) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleNavClick = (mode: 'settings' | 'library' | 'local' | 'templates') => {
    if (sidebarMode === mode && isOpen) {
      setIsOpen(false);
    } else {
      setSidebarMode(mode);
      setIsOpen(true);
    }
  };

  const handleAccordionChange = (section: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedSection(isExpanded ? section : null);
  };

  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', zIndex: 1200, position: 'relative' }}>
      
      {/* Navigation Rail (Thin Left Bar) */}
      <Box 
        sx={{ 
          width: '72px', 
          bgcolor: 'background.paper', 
          borderRight: 1, 
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 3,
          flexShrink: 0,
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          
          {/* Ajustes */}
          <Box
            onClick={() => handleNavClick('settings')}
            sx={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
              cursor: 'pointer', color: 'text.secondary', p: '0.5rem',
              bgcolor: (isOpen && sidebarMode === 'settings') ? 'background.default' : 'transparent',
              borderTop: 1, borderBottom: 1,
              borderColor: (isOpen && sidebarMode === 'settings') ? 'divider' : 'transparent',
              borderLeft: (isOpen && sidebarMode === 'settings') ? '3px solid #1976d2' : '3px solid transparent',
              boxShadow: (theme) => (isOpen && sidebarMode === 'settings') ? `1px 0 0 ${theme.palette.background.default}` : 'none',
              transition: 'all 0.2s',
              position: 'relative', zIndex: (isOpen && sidebarMode === 'settings') ? 2 : 1,
            }}
            title="Ajustes"
          >
            <TuneIcon style={{ fontSize: '2rem', marginBottom: '4px', color: '#03a9f4' }} />
            <span style={{ fontSize: '10px', fontWeight: 600 }}>Ajustes</span>
          </Box>


          {/* Mis Imágenes */}
          <Box
            onClick={() => handleNavClick('local')}
            sx={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
              cursor: 'pointer', color: 'text.secondary', p: '0.5rem',
              bgcolor: (isOpen && sidebarMode === 'local') ? 'background.default' : 'transparent',
              borderTop: 1, borderBottom: 1,
              borderColor: (isOpen && sidebarMode === 'local') ? 'divider' : 'transparent',
              borderLeft: (isOpen && sidebarMode === 'local') ? '3px solid #ff9800' : '3px solid transparent',
              boxShadow: (theme) => (isOpen && sidebarMode === 'local') ? `1px 0 0 ${theme.palette.background.default}` : 'none',
              transition: 'all 0.2s',
              position: 'relative', zIndex: (isOpen && sidebarMode === 'local') ? 2 : 1,
            }}
            title="Mis Imágenes"
          >
            <PhotoLibraryIcon style={{ fontSize: '2rem', marginBottom: '4px', color: '#ff9800' }} />
            <span style={{ fontSize: '10px', fontWeight: 600, textAlign: 'center' }}>Mis Imágenes</span>
          </Box>

          {/* Exportar */}
          <Box
            onClick={handleExportClick}
            sx={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
              cursor: 'pointer', color: '#2196f3', p: '0.5rem',
              transition: 'background-color 0.2s',
              '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.04)' }
            }}
            title="Exportar"
          >
            <PictureAsPdfIcon style={{ fontSize: '2rem', marginBottom: '4px' }} />
            <span style={{ fontSize: '10px', fontWeight: 600 }}>Exportar</span>
          </Box>

          <Menu
            anchorEl={exportAnchorEl}
            open={openExportMenu}
            onClose={handleExportClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            sx={{ 
              '& .MuiPaper-root': {
                minWidth: '180px',
                ml: 1,
                boxShadow: 4
              }
            }}
          >
            <MenuItem onClick={handleExportClose}>
              <PictureAsPdfIcon sx={{ mr: 2, color: 'error.main' }} />
              <Typography variant="body2">Exportar a PDF</Typography>
            </MenuItem>
            <MenuItem onClick={handleExportClose}>
              <ImageIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="body2">Exportar como Imagen</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleExportClose}>
              <ShareIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <Typography variant="body2">Compartir enlace</Typography>
            </MenuItem>
          </Menu>
        </div>

        {/* History Controls */}
        <div style={{
          marginTop: 'auto', paddingBottom: '2rem', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '1rem', width: '100%'
        }}>
          <Tooltip title="Deshacer" placement="right">
            <span>
              <IconButton size="medium" disabled color="primary" sx={{ bgcolor: 'rgba(0,0,0,0.04)' }}>
                <UndoIcon fontSize="medium" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Rehacer" placement="right">
            <span>
              <IconButton size="medium" disabled color="primary" sx={{ bgcolor: 'rgba(0,0,0,0.04)' }}>
                <RedoIcon fontSize="medium" />
              </IconButton>
            </span>
          </Tooltip>
          <Divider sx={{ width: '40px', my: 1 }} />


          {/* Utility Icons */}
          <Tooltip title="Reiniciar" placement="right">
            <IconButton size="small" color="error">
              <RestartAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={themeMode === 'light' ? "Modo oscuro" : "Modo claro"} placement="right">
            <IconButton onClick={() => setThemeMode((prev: 'light' | 'dark') => prev === 'light' ? 'dark' : 'light')} size="small" color="inherit">
              {themeMode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Informar de un error" placement="right">
            <IconButton size="small" color="inherit">
              <BugReportIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Idioma" placement="right">
            <IconButton size="small" color="inherit">
              <LanguageIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Perfil" placement="right">
            <IconButton size="small" color="inherit">
              <AccountCircleIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </Box>

      {/* Expandable Panel */}
      <Box 
        sx={{ 
          width: isOpen ? { xs: 'calc(100vw - 72px)', sm: '300px', lg: '352px' } : 0, 
          overflow: 'hidden', 
          transition: 'width 0.3s ease',
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          borderRight: isOpen ? 1 : 0,
          borderColor: 'divider',
          boxShadow: 8,
          position: 'relative'
        }}
      >
        {/* Common Header for all modes */}
        {isOpen && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: 1, 
            borderColor: 'divider',
            minHeight: '40px',
            bgcolor: 'background.paper'
          }}>
            {sidebarMode === 'settings' ? (
              <Tabs
                value={tabIndex}
                onChange={(_, val) => setTabIndex(val)}
                variant="fullWidth"
                sx={{ minHeight: '40px', flex: 1 }}
              >
                <Tab label="Documento" sx={{ minHeight: '40px', py: 0, textTransform: 'none', fontWeight: 'bold' }} />
                <Tab label="Global" sx={{ minHeight: '40px', py: 0, textTransform: 'none', fontWeight: 'bold' }} />
              </Tabs>
            ) : (
              <Typography variant="subtitle2" sx={{ px: 2, fontWeight: 'bold', color: 'text.secondary', textTransform: 'uppercase' }}>
                {sidebarMode === 'library' ? 'Pictogramas' : 
                 sidebarMode === 'local' ? 'Mis Imágenes' : 
                 sidebarMode === 'templates' ? 'Actividades' : ''}
              </Typography>
            )}
            <IconButton 
              size="small" 
              onClick={() => setIsOpen(false)} 
              sx={{ mr: 1, color: 'text.secondary' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        {sidebarMode === 'settings' && (
          <>
            {/* Documento Tab Content */}
            <Box sx={{ overflowY: 'auto', flex: 1, display: tabIndex === 0 ? 'flex' : 'none', flexDirection: 'column', gap: 3, p: 2 }}>
              <Box>
                <Typography gutterBottom variant="body2" sx={{ fontWeight: 500 }}>
                  Filas <strong>{profile.visibleRowsCount}</strong>
                </Typography>
                <Slider
                  size="small"
                  value={profile.visibleRowsCount}
                  onChange={(_, val) => updateProfile('visibleRowsCount', val)}
                  step={1}
                  marks
                  min={1}
                  max={15}
                />
              </Box>

              <Box>
                <Typography gutterBottom variant="body2" sx={{ fontWeight: 500 }}>
                  Columnas <strong>{profile.visibleColsCount}</strong>
                </Typography>
                <Slider
                  size="small"
                  value={profile.visibleColsCount}
                  onChange={(_, val) => updateProfile('visibleColsCount', val)}
                  step={1}
                  marks
                  min={1}
                  max={15}
                />
              </Box>

              <Box sx={{ mt: -1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={profile.isSquare}
                      onChange={(e) => updateProfile('isSquare', e.target.checked)}
                    />
                  }
                  label={<Typography variant="body2" sx={{ fontWeight: 500 }}>Celdas cuadradas</Typography>}
                />
              </Box>

              <Alert severity="info" variant="outlined" sx={{ borderStyle: 'dashed', mt: 0 }}>
                <Typography variant="caption" sx={{ display: 'block', lineHeight: 1.2 }}>
                  El tamaño de las celdas se ajusta automáticamente para llenar la página.
                </Typography>
              </Alert>

              <Box>
                <Typography gutterBottom variant="body2" sx={{ fontWeight: 500 }}>
                  Espaciado (mm) <strong>{profile.spacing}</strong>
                </Typography>
                <Slider
                  size="small"
                  value={profile.spacing}
                  onChange={(_, val) => updateProfile('spacing', val)}
                  step={1}
                  min={0}
                  max={10}
                />
              </Box>
            </Box>

            {/* Global Tab Content */}
            <Box sx={{ overflowY: 'auto', flex: 1, display: tabIndex === 1 ? 'flex' : 'none', flexDirection: 'column', pb: 4 }}>
              <Box sx={{ m: 2, p: 2, bgcolor: '#e8f5e9', borderRadius: '8px', borderLeft: '4px solid #4caf50' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 0.5 }}>
                  Ajustes globales
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  Estos ajustes afectan a todo el tablero a menos que se cambie una celda individualmente.
                </Typography>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 'bold', mt: 1, display: 'block' }}>
                  Afectando a: Todo el proyecto
                </Typography>
              </Box>

              {/* Section 1: Texto */}
              <Accordion 
                expanded={expandedSection === 'text'} 
                onChange={handleAccordionChange('text')}
                elevation={0} 
                sx={{ bgcolor: 'transparent', '&:before': { display: 'none' }, borderBottom: '1px solid', borderColor: 'divider' }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontSize: '0.9rem', color: '#1976d2', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Texto
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={profile.showText}
                        onChange={(e) => updateProfile('showText', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={<Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Mostrar texto en celdas</Typography>}
                  />

                  {profile.showText && (
                    <>
                      <Box>
                        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1 }}>Fuente</Typography>
                        <Autocomplete
                          size="small"
                          options={FONT_LIST}
                          value={profile.fontFamily}
                          onChange={(_, val) => updateProfile('fontFamily', val || 'Open Sans')}
                          renderOption={(props, option) => (
                            <FontOption key={option} props={props} option={option} />
                          )}
                          renderInput={(params) => <TextField {...params} size="small" />}
                        />
                      </Box>

                      <Box>
                        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1 }}>
                          Tamaño de fuente: {profile.fontSize}px
                        </Typography>
                        <Slider
                          size="small"
                          value={profile.fontSize}
                          min={8}
                          max={50}
                          onChange={(_, val) => updateProfile('fontSize', val)}
                        />
                      </Box>

                      <Box>
                        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1 }}>Estilo de fuente</Typography>
                        <Box sx={{ display: 'flex', border: '1px solid', borderColor: 'divider', borderRadius: '6px', overflow: 'hidden', width: 'fit-content' }}>
                          <IconButton 
                            onClick={() => updateProfile('fontWeight', profile.fontWeight === 'bold' ? 'normal' : 'bold')}
                            sx={{ 
                              borderRadius: 0, p: 1, 
                              bgcolor: profile.fontWeight === 'bold' ? 'action.selected' : 'transparent',
                              color: profile.fontWeight === 'bold' ? 'primary.main' : 'text.secondary'
                            }}
                          >
                            <FormatBoldIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            onClick={() => updateProfile('fontStyle', profile.fontStyle === 'italic' ? 'normal' : 'italic')}
                            sx={{ 
                              borderRadius: 0, p: 1, borderLeft: '1px solid', borderRight: '1px solid', borderColor: 'divider',
                              bgcolor: profile.fontStyle === 'italic' ? 'action.selected' : 'transparent',
                              color: profile.fontStyle === 'italic' ? 'primary.main' : 'text.secondary'
                            }}
                          >
                            <FormatItalicIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            onClick={() => updateProfile('textDecoration', profile.textDecoration === 'underline' ? 'none' : 'underline')}
                            sx={{ 
                              borderRadius: 0, p: 1,
                              bgcolor: profile.textDecoration === 'underline' ? 'action.selected' : 'transparent',
                              color: profile.textDecoration === 'underline' ? 'primary.main' : 'text.secondary'
                            }}
                          >
                            <FormatUnderlinedIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>

                      <Box>
                        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1 }}>Posición del texto</Typography>
                        <Box sx={{ display: 'flex', border: '1px solid', borderColor: 'divider', borderRadius: '6px', overflow: 'hidden', width: 'fit-content' }}>
                          <Tooltip title="Arriba">
                            <IconButton
                              onClick={() => updateProfile('textPosition', 'top')}
                              sx={{ 
                                borderRadius: 0,
                                bgcolor: profile.textPosition === 'top' ? 'action.selected' : 'transparent',
                                color: profile.textPosition === 'top' ? 'primary.main' : 'text.secondary',
                              }}
                            >
                              <FormatAlignTopIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Centro">
                            <IconButton
                              onClick={() => updateProfile('textPosition', 'center')}
                              sx={{ 
                                borderRadius: 0,
                                bgcolor: profile.textPosition === 'center' ? 'action.selected' : 'transparent',
                                color: profile.textPosition === 'center' ? 'primary.main' : 'text.secondary',
                              }}
                            >
                              <FormatAlignCenterIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Abajo">
                            <IconButton
                              onClick={() => updateProfile('textPosition', 'bottom')}
                              sx={{ 
                                borderRadius: 0,
                                bgcolor: profile.textPosition === 'bottom' ? 'action.selected' : 'transparent',
                                color: profile.textPosition === 'bottom' ? 'primary.main' : 'text.secondary',
                              }}
                            >
                              <FormatAlignBottomIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 1 }} />

                      <Box>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={!!profile.secondaryTextEnabled}
                              onChange={(e) => updateProfile('secondaryTextEnabled', e.target.checked)}
                              color="primary"
                              size="small"
                            />
                          }
                          label={<Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Texto adicional</Typography>}
                        />

                        {profile.secondaryTextEnabled && (
                          <Box sx={{ pl: 2, mt: 1, display: 'flex', flexDirection: 'column', gap: 1, borderLeft: '2px solid', borderColor: 'primary.light' }}>
                            <Box>
                              <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>Idioma:</Typography>
                              <Autocomplete
                                size="small"
                                options={languages}
                                getOptionLabel={(option) => option.label}
                                value={languages.find(l => l.code === (profile.secondaryLanguage || 'en')) || languages[1]}
                                onChange={(_, val) => updateProfile('secondaryLanguage', val?.code || 'en')}
                                renderInput={(params) => <TextField {...params} size="small" />}
                              />
                            </Box>
                          </Box>
                        )}
                      </Box>

                      <Box>
                        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1 }}>Color de fuente</Typography>
                        <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap', mb: 1 }}>
                          <Box
                            onClick={() => updateProfile('fontColor', '#000000')}
                            sx={{ width: '22px', height: '22px', backgroundColor: '#000000', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                          />
                          {FITZGERALD_COLORS.map((c) => (
                            <Box
                              key={c.name}
                              onClick={() => updateProfile('fontColor', c.color)}
                              sx={{ width: '22px', height: '22px', backgroundColor: c.color, border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                            />
                          ))}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <input
                            type="color"
                            value={profile.fontColor}
                            onChange={(e) => updateProfile('fontColor', e.target.value)}
                            style={{ width: '32px', height: '32px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
                          />
                          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{profile.fontColor.toUpperCase()}</Typography>
                        </Box>
                      </Box>

                      <FormControlLabel
                        control={
                          <Switch
                            checked={profile.capitalLetters}
                            onChange={(e) => updateProfile('capitalLetters', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={<Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Mayúsculas</Typography>}
                      />
                    </>
                  )}
                </AccordionDetails>
              </Accordion>

              {/* Section 2: Estilo */}
              <Accordion 
                expanded={expandedSection === 'style'} 
                onChange={handleAccordionChange('style')}
                elevation={0} 
                sx={{ bgcolor: 'transparent', '&:before': { display: 'none' }, borderBottom: '1px solid', borderColor: 'divider' }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontSize: '0.9rem', color: '#1976d2', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Estilo
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', mt: 1 }}>
                    
                    {/* Borders */}
                    <Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={profile.cellBorders}
                            onChange={(e) => updateProfile('cellBorders', e.target.checked)}
                            color="primary"
                            size="small"
                          />
                        }
                        label={<Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Habilitar bordes</Typography>}
                      />

                      {profile.cellBorders && (
                        <Box sx={{ pl: 3, mt: 1, borderLeft: '2px solid', borderColor: 'primary.light', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                checked={profile.borderColor === 'fitzgerald'}
                                onChange={(e) => updateProfile('borderColor', e.target.checked ? 'fitzgerald' : '#CCCCCC')}
                              />
                            }
                            label={<Typography sx={{ fontSize: '0.8rem' }}>Usar <Link href="#" onClick={(e) => e.preventDefault()} sx={{ fontWeight: 'bold' }}>clave Fitzgerald</Link></Typography>}
                          />

                          <Box sx={{ 
                            display: 'flex', flexDirection: 'column', gap: '1.2rem',
                            opacity: profile.borderColor === 'fitzgerald' ? 0.5 : 1,
                            pointerEvents: profile.borderColor === 'fitzgerald' ? 'none' : 'auto'
                          }}>
                            <Box>
                              <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                {FITZGERALD_COLORS.map((c) => (
                                  <Box
                                    key={`border-${c.name}`}
                                    onClick={() => updateProfile('borderColor', c.color)}
                                    sx={{ width: '22px', height: '22px', backgroundColor: c.color, border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', '&:hover': { transform: 'scale(1.1)' } }}
                                  />
                                ))}
                              </Box>
                            </Box>

                            <Box>
                              <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>Color personalizado:</Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <input
                                  type="color"
                                  value={profile.borderColor === 'fitzgerald' ? '#CCCCCC' : profile.borderColor}
                                  onChange={(e) => updateProfile('borderColor', e.target.value)}
                                  style={{ width: '32px', height: '32px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
                                />
                                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                                  {(profile.borderColor === 'fitzgerald' ? '#CCCCCC' : profile.borderColor).toUpperCase()}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          <Box>
                            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>Grosor del borde: {profile.borderWidth}px</Typography>
                            <Slider
                              size="small"
                              value={profile.borderWidth}
                              min={1}
                              max={12}
                              onChange={(_, val) => updateProfile('borderWidth', val)}
                            />
                          </Box>
                        </Box>
                      )}
                    </Box>

                    {/* Background */}
                    <Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={!!profile.backgroundColor && profile.backgroundColor !== 'transparent'}
                            onChange={(e) => updateProfile('backgroundColor', e.target.checked ? '#FFFFFF' : 'transparent')}
                            color="primary"
                            size="small"
                          />
                        }
                        label={<Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Habilitar color de fondo</Typography>}
                      />

                      {profile.backgroundColor && profile.backgroundColor !== 'transparent' && (
                        <Box sx={{ pl: 3, mt: 1, borderLeft: '2px solid', borderColor: 'primary.light', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                checked={profile.fitzgeraldEnabled}
                                onChange={(e) => updateProfile('fitzgeraldEnabled', e.target.checked)}
                              />
                            }
                            label={<Typography sx={{ fontSize: '0.8rem' }}>Usar <Link href="#" onClick={(e) => e.preventDefault()} sx={{ fontWeight: 'bold' }}>clave Fitzgerald</Link></Typography>}
                          />

                          <Box sx={{ 
                            display: 'flex', flexDirection: 'column', gap: '1.2rem',
                            opacity: profile.fitzgeraldEnabled ? 0.5 : 1,
                            pointerEvents: profile.fitzgeraldEnabled ? 'none' : 'auto'
                          }}>
                            <Box>
                              <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                {FITZGERALD_COLORS.map((c) => (
                                  <Box
                                    key={`bg-${c.name}`}
                                    onClick={() => updateProfile('backgroundColor', c.color)}
                                    sx={{ width: '22px', height: '22px', backgroundColor: c.color, border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', '&:hover': { transform: 'scale(1.1)' } }}
                                  />
                                ))}
                              </Box>
                            </Box>

                            <Box>
                              <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>Color personalizado:</Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <input
                                  type="color"
                                  value={profile.fitzgeraldEnabled ? '#FFFFFF' : profile.backgroundColor}
                                  onChange={(e) => updateProfile('backgroundColor', e.target.value)}
                                  style={{ width: '32px', height: '32px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
                                />
                                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                                  {(profile.fitzgeraldEnabled ? '#FFFFFF' : profile.backgroundColor).toUpperCase()}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Box>

                    {/* Rounded corners */}
                    <Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={profile.borderRadius > 0}
                            onChange={(e) => updateProfile('borderRadius', e.target.checked ? 8 : 0)}
                            color="primary"
                            size="small"
                          />
                        }
                        label={<Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Esquinas redondeadas</Typography>}
                      />
                      {profile.borderRadius > 0 && (
                        <Box sx={{ pl: 3, mt: 1 }}>
                          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>Radio: {profile.borderRadius}px</Typography>
                          <Slider
                            size="small"
                            value={profile.borderRadius}
                            min={0}
                            max={40}
                            onChange={(_, val) => updateProfile('borderRadius', val)}
                          />
                        </Box>
                      )}
                    </Box>

                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </>
        )}

        {sidebarMode !== 'settings' && (
          <Box sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Sección en desarrollo...
            </Typography>
          </Box>
        )}

        {isOpen && (
           <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 16, 
              left: 16, 
              right: 16, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1 
            }}
          >
            <Divider sx={{ mb: 1 }} />
            <Typography variant="caption" align="center" color="text.disabled">
              AraPicTalk v0.1.0
            </Typography>
          </Box>
        )}
      </Box>

    </Box>
  );
};
