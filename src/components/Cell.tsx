import React, { useCallback } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { sentenceElementsAtom, activeProfileAtom } from '../store/atoms/boardState';
import { usePictogram, getPictogramImageUrl } from '../services/arasaacApi';

interface CellProps {
  keyword: string;
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

export const Cell: React.FC<CellProps> = React.memo(({ keyword, columnType }) => {
  const profile = useAtomValue(activeProfileAtom);
  const { data: pictograms, isLoading } = usePictogram(keyword);
  const setSentenceElements = useSetAtom(sentenceElementsAtom);

  const handleClick = useCallback(() => {
    setSentenceElements((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(), 
        text: keyword,
        pictoIds: pictograms && pictograms.length > 0 ? pictograms.map(p => p._id) : undefined,
        currentPictoIndex: pictograms && pictograms.length > 0 ? 0 : undefined,
      }
    ]);
  }, [keyword, pictograms, setSentenceElements]);

  const primaryPictogramId = pictograms && pictograms.length > 0 ? pictograms[0]._id : null;

  // Secondary text logic (translation)
  const { data: secondaryData } = useQuery({
    queryKey: ['pictogram', profile.secondaryLanguage, primaryPictogramId],
    queryFn: async () => {
      if (!profile.secondaryTextEnabled || !primaryPictogramId) return null;
      const res = await fetch(`https://api.arasaac.org/api/pictograms/${profile.secondaryLanguage}/${primaryPictogramId}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.keywords?.[0]?.keyword || null;
    },
    enabled: !!(profile.secondaryTextEnabled && primaryPictogramId)
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
    backgroundColor: !primaryPictogramId ? '#d32f2f' : getBackgroundColor(),
    border: profile.cellBorders ? `${profile.borderWidth}px solid ${getBorderColor()}` : 'none',
    borderRadius: `${profile.borderRadius}px`,
    display: 'flex',
    flexDirection: profile.textPosition === 'top' ? 'column-reverse' : (profile.textPosition === 'bottom' ? 'column' : 'column'),
    justifyContent: profile.textPosition === 'center' ? 'center' : 'space-between',
    padding: '0',
    height: '100%',
    width: '100%',
    position: 'relative'
  };

  const textStyle: React.CSSProperties = {
    fontSize: `${profile.fontSize}px`,
    color: profile.fontColor,
    fontFamily: profile.fontFamily,
    textTransform: profile.capitalLetters ? 'uppercase' : 'none',
    fontWeight: profile.fontWeight || 'bold',
    fontStyle: profile.fontStyle || 'normal',
    textDecoration: profile.textDecoration || 'none',
    textAlign: 'center',
    width: '100%',
    display: profile.showText ? 'block' : 'none',
    padding: '2px',
    lineHeight: 1.1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const secondaryTextStyle: React.CSSProperties = {
    ...textStyle,
    fontSize: `calc(${profile.fontSize}px * 0.75)`,
    opacity: 0.8,
    fontWeight: 'normal',
    marginTop: profile.textPosition === 'bottom' ? '-4px' : '0',
    marginBottom: profile.textPosition === 'top' ? '-4px' : '0',
  };

  if (profile.textPosition === 'center') {
    textStyle.position = 'absolute';
    textStyle.top = '50%';
    textStyle.left = '50%';
    textStyle.transform = 'translate(-50%, -50%)';
    textStyle.backgroundColor = 'rgba(255,255,255,0.7)';
    textStyle.borderRadius = '4px';
    textStyle.width = 'auto';
    textStyle.maxWidth = '90%';
  }

  return (
    <button className="cell" onClick={handleClick} style={{ margin: 0, padding: 0, border: 'none', background: 'none', cursor: 'pointer', width: '100%', height: '100%', display: 'block' }}>
      <div style={cellStyle}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
          {isLoading ? (
            <div className="skeleton-image" style={{ width: '100%', height: '100%', backgroundColor: '#eee' }} />
          ) : primaryPictogramId ? (
            <img 
              src={getPictogramImageUrl(primaryPictogramId, 300)} 
              alt={keyword} 
              loading="lazy"
              crossOrigin="anonymous"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4px' }}>
              <span style={{ 
                fontSize: `calc(${profile.fontSize}px * 1.5)`, 
                fontWeight: 'bold', 
                color: '#FFFFFF',
                fontFamily: profile.fontFamily,
                textTransform: profile.capitalLetters ? 'uppercase' : 'none',
                lineHeight: 1.1,
                wordBreak: 'break-word'
              }}>
                {keyword}
              </span>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          {primaryPictogramId && <span style={textStyle}>{keyword}</span>}
          {profile.secondaryTextEnabled && secondaryData && (
            <span style={secondaryTextStyle}>{secondaryData}</span>
          )}
        </div>
      </div>
    </button>
  );
});

Cell.displayName = 'Cell';
