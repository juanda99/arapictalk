import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useAtomValue, useAtom } from 'jotai';
import { Cell } from './Cell';
import type { ColumnData } from '../core/types';
import { activeProfileAtom, boardDataAtom, columnIndicesAtom } from '../store/atoms/boardState';
import IconButton from '@mui/material/IconButton';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  data: ColumnData;
  slotIndex: number;
  colWidth: number;
}

export const Column: React.FC<Props> = ({ data, slotIndex, colWidth }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const profile = useAtomValue(activeProfileAtom);
  const boardData = useAtomValue(boardDataAtom);
  const [indices, setIndices] = useAtom(columnIndicesAtom);

  const handleCycle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!boardData) return;
    
    const totalCols = boardData.columnas.length;
    if (totalCols <= profile.visibleColsCount) return;

    const newIndices = [...indices];
    let nextIdx = (newIndices[slotIndex] + 1) % totalCols;
    
    // Buscar el siguiente índice que no esté siendo usado por otro slot
    while (newIndices.includes(nextIdx)) {
      nextIdx = (nextIdx + 1) % totalCols;
    }
    
    newIndices[slotIndex] = nextIdx;
    setIndices(newIndices);
  };
  
  const headerHeight = 48; // Altura reducida para la cabecera
  const availableHeight = window.innerHeight - 64 - 120;
  
  // Altura de las celdas (si no es cuadrado, se reparte el espacio sobrante de la cabecera)
  const estimatedHeight = Math.floor(profile.isSquare 
    ? colWidth 
    : (availableHeight - headerHeight) / profile.visibleRowsCount);

  const rowVirtualizer = useVirtualizer({
    count: data.contenido.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedHeight,
    overscan: 4, 
  });

  // Forzar re-medición si cambia el tamaño estimado (ej: al añadir columnas en modo cuadrado)
  React.useEffect(() => {
    rowVirtualizer.measure();
  }, [estimatedHeight, rowVirtualizer]);

  const headerCellStyle: React.CSSProperties = {
    backgroundColor: '#fafafa', 
    border: profile.cellBorders ? `${profile.borderWidth}px solid ${profile.borderColor}` : 'none',
    borderBottom: '2px solid #eee',
    borderRadius: `${profile.borderRadius}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  };

  const headerTextStyle: React.CSSProperties = {
    fontSize: `calc(${profile.fontSize}px * 0.8)`,
    color: '#666',
    fontFamily: profile.fontFamily,
    textTransform: profile.capitalLetters ? 'uppercase' : 'none',
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: '0.5px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.1',
    wordBreak: 'break-word'
  };

  return (
    <div 
      className="column" 
      style={{ 
        width: `${colWidth}px`,
        minWidth: `${colWidth}px`,
        maxWidth: `${colWidth}px`,
        display: 'flex', 
        flexDirection: 'column' 
      }}
    >
      {/* Cabecera renderizada con altura fija */}
      <div className="cell-wrapper" style={{ height: `${headerHeight}px`, padding: `${profile.spacing}px`, flexShrink: 0 }}>
        <div style={headerCellStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%', justifyContent: 'center', padding: '0 4px' }}>
            <Tooltip title={data.tipo}>
              <span style={{ ...headerTextStyle, flex: 1 }}>
                {data.tipo}
              </span>
            </Tooltip>
            {boardData && boardData.columnas.length > profile.visibleColsCount && (
              <IconButton 
                size="small" 
                onClick={handleCycle} 
                sx={{ 
                  p: 0.2, 
                  color: 'primary.main',
                  bgcolor: 'rgba(139, 195, 74, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(139, 195, 74, 0.2)',
                  },
                  borderRadius: '4px',
                  flexShrink: 0
                }}
              >
                <SwapHorizIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            )}
          </div>
        </div>
      </div>
      
      {/* Contenido scrolleable */}
      <div ref={parentRef} className="scroll-area">
        <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative', width: '100%' }}>
          {rowVirtualizer.getVirtualItems().map(virtualRow => (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                padding: `${profile.spacing}px`,
              }}
              className="cell-wrapper"
            >
              <Cell keyword={data.contenido[virtualRow.index]} columnType={data.tipo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

