import React, { useRef } from 'react';
import { useAtomValue } from 'jotai';
import { useVirtualizer } from '@tanstack/react-virtual';
import { activeProfileAtom } from '../store/atoms/boardState';
import { Cell } from './Cell';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ColumnData } from '../core/types';

interface ColumnProps {
  data: ColumnData;
  colWidth: number;
  availableHeight: number;
}

export const Column: React.FC<ColumnProps> = ({ data, colWidth, availableHeight }) => {
  const profile = useAtomValue(activeProfileAtom);
  const parentRef = useRef<HTMLDivElement>(null);

  const headerHeight = 40;
  
  // Altura de las celdas (si no es cuadrado, se reparte el espacio sobrante de la cabecera)
  const estimatedHeight = Math.floor(profile.isSquare 
    ? colWidth 
    : (availableHeight - headerHeight) / profile.visibleRowsCount);

  const rowVirtualizer = useVirtualizer({
    count: data.contenido.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedHeight,
    overscan: 2,
  });

  return (
    <div className="column" style={{ '--col-count': profile.visibleColsCount } as any}>
      {/* Header de la columna */}
      <Box sx={{ 
        height: `${headerHeight}px`, 
        bgcolor: 'background.paper', 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 1,
        boxSizing: 'border-box'
      }}>
        <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary', textTransform: 'uppercase' }}>
          {data.tipo}
        </Typography>
      </Box>

      {/* Area de scroll con virtualización */}
      <div 
        ref={parentRef}
        className="scroll-area"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const item = data.contenido[virtualRow.index];
            const pictoId = parseInt(item); // En este ejemplo el contenido es el ID del picto

            return (
              <div
                key={virtualRow.key}
                className="cell-wrapper"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  padding: `${profile.spacing}px`,
                }}
              >
                <Cell 
                  text={`Picto ${pictoId}`} 
                  pictoId={pictoId} 
                  columnType={data.tipo}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
