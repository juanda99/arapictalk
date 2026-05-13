import React, { useCallback } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { sentenceElementsAtom, activeProfileAtom } from '../store/atoms/boardState';
import { getPictogramImageUrl } from '../services/arasaacApi';
import { useTranslation } from 'react-i18next';

export const SentenceBar: React.FC = () => {
  const { t } = useTranslation();
  const [elements, setElements] = useAtom(sentenceElementsAtom);
  const profile = useAtomValue(activeProfileAtom);
  const zoom = 1.0;

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
    backgroundColor: profile.backgroundColor,
    border: profile.cellBorders ? `${profile.borderWidth}px solid ${profile.borderColor}` : 'none',
    borderRadius: `${profile.borderRadius}px`,
    margin: `${profile.spacing}px auto`,
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    minHeight: '100px',
    width: `calc(${zoom * 100}% - ${profile.spacing * 2}px)`,
    transition: 'width 0.2s ease-in-out',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    overflowX: 'auto',
    position: 'relative',
    boxSizing: 'border-box'
  };

  const itemStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    border: profile.cellBorders ? `1px solid ${profile.borderColor}` : '1px solid #eee',
    borderRadius: `${profile.borderRadius}px`,
    height: '90px',
    width: '90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    cursor: 'pointer',
    flexShrink: 0,
    position: 'relative'
  };

  return (
    <div style={barStyle} className="sentence-bar-container">
      {elements.length === 0 ? (
        <span className="sentence-placeholder" style={{ width: '100%', textAlign: 'center', opacity: 0.5 }}>
          {t('sentencePlaceholder')}
        </span>
      ) : (
        <div className="sentence-items" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {elements.map((el) => {
            const currentId = el.pictoIds && el.currentPictoIndex !== undefined 
              ? el.pictoIds[el.currentPictoIndex] 
              : null;
            
            return (
              <div 
                key={el.id} 
                style={itemStyle}
                onClick={() => cycleVariation(el.id)}
                title={el.pictoIds && el.pictoIds.length > 1 ? "Haz clic para cambiar variación" : ""}
              >
                {currentId ? (
                  <img 
                    src={getPictogramImageUrl(currentId, 300)} 
                    alt={el.text} 
                    loading="lazy"
                    crossOrigin="anonymous"
                    style={{ maxHeight: '70%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <div className="sentence-no-image" />
                )}
                <span className="sentence-text" style={{ fontSize: '0.75rem', fontWeight: 'bold', marginTop: '2px' }}>
                  {el.text}
                </span>
                {el.pictoIds && el.pictoIds.length > 1 && (
                  <span className="variation-indicator">
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
