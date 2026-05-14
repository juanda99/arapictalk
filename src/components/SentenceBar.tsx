import React, { useCallback } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { sentenceElementsAtom, activeProfileAtom } from '../store/atoms/boardState';
import { themeModeAtom } from '../store/atoms/uiState';
import { getPictogramImageUrl } from '../services/arasaacApi';
import { useTranslation } from 'react-i18next';
import { layoutMetricsAtom } from '../store/selectors/layoutMetrics';

export const SentenceBar: React.FC = () => {
  const { t } = useTranslation();
  const [elements, setElements] = useAtom(sentenceElementsAtom);
  const profile = useAtomValue(activeProfileAtom);
  const themeMode = useAtomValue(themeModeAtom);
  const { rowHeight, extraSentenceBarHeight } = useAtomValue(layoutMetricsAtom);

  const cycleVariation = useCallback((idToCycle: string) => {
    setElements((prev) => 
      prev.map((el) => {
        if (el.id === idToCycle && el.pictoIds && el.pictoIds.length > 1) {
          const nextIndex = (el.currentPictoIndex! + 1) % el.pictoIds.length;
          return { ...el, currentPictoIndex: nextIndex };
        }
        return el;
      })
    );
  }, [setElements]);

  const barStyle: React.CSSProperties = {
    backgroundColor: themeMode === 'dark' ? '#25282b' : profile.backgroundColor,
    border: 'none',
    borderRadius: `0 0 ${profile.borderRadius}px ${profile.borderRadius}px`,
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    height: `${rowHeight + extraSentenceBarHeight + profile.spacing}px`,
    paddingTop: `${profile.spacing}px`,
    paddingLeft: `${profile.spacing / 2}px`,
    paddingRight: `${profile.spacing / 2}px`,
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    overflowX: 'auto',
    position: 'relative',
    boxSizing: 'border-box',
    flexShrink: 0
  };

  const itemStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    border: profile.cellBorders ? `1px solid ${profile.borderColor}` : '1px solid #eee',
    borderRadius: `${profile.borderRadius}px`,
    height: '100%',
    width: `${rowHeight}px`, // Keep width based on standard rowHeight
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4px 2px',
    cursor: 'pointer',
    flexShrink: 0,
    position: 'relative',
    boxSizing: 'border-box'
  };

  return (
    <div style={barStyle} className="sentence-bar-container">
      {elements.length === 0 ? (
        <span className="sentence-placeholder" style={{ width: '100%', textAlign: 'center', opacity: 0.5, fontSize: '1.2rem' }}>
          {t('sentencePlaceholder')}
        </span>
      ) : (
        <div className="sentence-items" style={{ display: 'flex', gap: `${profile.spacing}px`, height: '100%', alignItems: 'center' }}>
          {elements.map((el) => {
            const currentId = el.pictoIds && el.currentPictoIndex !== undefined 
              ? el.pictoIds[el.currentPictoIndex] 
              : null;
            
            return (
              <div 
                key={el.id} 
                style={itemStyle}
                onClick={() => cycleVariation(el.id)}
              >
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', overflow: 'hidden' }}>
                  {currentId ? (
                    <img 
                      src={getPictogramImageUrl(currentId, 300)} 
                      alt={el.text} 
                      loading="lazy"
                      crossOrigin="anonymous"
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <div className="sentence-no-image" />
                  )}
                </div>
                
                <span className="sentence-text" style={{ 
                  fontSize: '0.6rem', 
                  fontWeight: 'bold', 
                  textAlign: 'center',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  marginTop: '2px'
                }}>
                  {el.text}
                </span>

                {el.pictoIds && el.pictoIds.length > 1 && (
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    fontSize: '0.5rem',
                    padding: '1px 3px',
                    borderRadius: '4px',
                    pointerEvents: 'none'
                  }}>
                    {el.currentPictoIndex! + 1}/{el.pictoIds.length}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
