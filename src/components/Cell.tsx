import React, { useCallback } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { sentenceElementsAtom, activeProfileAtom } from '../store/atoms/boardState';
import { usePictogram, getPictogramImageUrl } from '../services/arasaacApi';

interface CellProps {
  keyword: string;
}

export const Cell: React.FC<CellProps> = React.memo(({ keyword }) => {
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

  const cellStyle: React.CSSProperties = {
    backgroundColor: profile.backgroundColor,
    border: profile.cellBorders ? `${profile.borderWidth}px solid ${profile.borderColor}` : 'none',
    borderRadius: `${profile.borderRadius}px`,
    display: 'flex',
    flexDirection: profile.textPosition === 'top' ? 'column-reverse' : (profile.textPosition === 'bottom' ? 'column' : 'column'),
    justifyContent: profile.textPosition === 'center' ? 'center' : 'space-between',
    padding: '4px',
    height: '100%',
    width: '100%',
    position: 'relative'
  };

  const textStyle: React.CSSProperties = {
    fontSize: `${profile.fontSize}px`,
    color: profile.fontColor,
    fontFamily: profile.fontFamily,
    textTransform: profile.capitalLetters ? 'uppercase' : 'none',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    display: profile.showText ? 'block' : 'none',
    padding: '2px'
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
    <button className="cell" onClick={handleClick} style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer', width: '100%', height: '100%' }}>
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
            <div className="no-image-placeholder" style={{ width: '100%', height: '100%', backgroundColor: '#f9f9f9' }} />
          )}
        </div>
        <span style={textStyle}>{keyword}</span>
      </div>
    </button>
  );
});

Cell.displayName = 'Cell';
