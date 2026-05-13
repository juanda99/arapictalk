import React from 'react';
import { useAtomValue } from 'jotai';
import { activeProfileAtom } from '../store/atoms/boardState';
import { useQuery } from '@tanstack/react-query';
import { arasaacApi } from '../services/arasaacApi';

interface CellProps {
  text: string;
  pictoId?: number;
  columnType?: string;
}

const FITZGERALD_COLORS: Record<string, string> = {
  'Personas': '#FFF59D',
  'Lugares': '#C8E6C9',
  'Acciones': '#BBDEFB',
  'Objetos': '#FFE0B2',
  'Descriptores': '#E1BEE7',
  'Social': '#F8BBD0',
  'Tiempo': '#D7CCC8',
};

export const Cell: React.FC<CellProps> = ({ text, pictoId, columnType }) => {
  const profile = useAtomValue(activeProfileAtom);

  // Query para obtener traducciones si el texto secundario está activo
  const { data: translation } = useQuery({
    queryKey: ['picto-translation', pictoId, profile.secondaryLanguage],
    queryFn: () => arasaacApi.getPictoById(pictoId!, profile.secondaryLanguage),
    enabled: !!(profile.secondaryTextEnabled && pictoId && profile.secondaryLanguage),
    staleTime: Infinity,
  });

  // Fitzgerald coloring logic
  const getBackgroundColor = () => {
    if (profile.fitzgeraldEnabled && columnType && FITZGERALD_COLORS[columnType]) {
      return FITZGERALD_COLORS[columnType];
    }
    return profile.backgroundColor;
  };

  const getBorderColor = () => {
    if (profile.borderColor === 'fitzgerald' && columnType && FITZGERALD_COLORS[columnType]) {
      return FITZGERALD_COLORS[columnType];
    }
    return profile.borderColor;
  };

  const cellStyle: React.CSSProperties = {
    backgroundColor: getBackgroundColor(),
    border: profile.cellBorders ? `${profile.borderWidth}px solid ${getBorderColor()}` : 'none',
    borderRadius: `${profile.borderRadius}px`,
    display: 'flex',
    flexDirection: profile.textPosition === 'top' ? 'column-reverse' : (profile.textPosition === 'bottom' ? 'column' : 'column'),
    justifyContent: profile.textPosition === 'center' ? 'center' : 'space-between',
    alignItems: 'center',
    padding: '4px',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    gap: '2px',
    position: 'relative',
    overflow: 'hidden'
  };

  const textStyle: React.CSSProperties = {
    fontFamily: profile.fontFamily,
    fontSize: `${profile.fontSize}px`,
    fontWeight: profile.fontWeight as any || 'normal',
    fontStyle: profile.fontStyle || 'normal',
    textDecoration: profile.textDecoration || 'none',
    color: profile.fontColor,
    textAlign: 'center',
    width: '100%',
    wordBreak: 'break-word',
    textTransform: profile.capitalLetters ? 'uppercase' : 'none',
    lineHeight: 1.1,
    zIndex: 2
  };

  const secondaryTextStyle: React.CSSProperties = {
    ...textStyle,
    fontSize: `${Math.max(profile.fontSize * 0.7, 8)}px`,
    opacity: 0.7,
    marginTop: profile.textPosition === 'bottom' ? '0' : '2px',
    marginBottom: profile.textPosition === 'top' ? '0' : '2px',
  };

  return (
    <div className="cell" style={cellStyle}>
      {profile.showText && (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
          <div style={textStyle}>{text}</div>
          {profile.secondaryTextEnabled && translation && (
            <div style={secondaryTextStyle}>{translation.name}</div>
          )}
        </div>
      )}
      
      {pictoId && (
        <img 
          src={arasaacApi.getPictoUrl(pictoId)} 
          alt={text}
          style={{ 
            maxWidth: '100%', 
            maxHeight: profile.showText ? '70%' : '90%', 
            objectFit: 'contain',
            flex: 1
          }} 
        />
      )}
    </div>
  );
};
