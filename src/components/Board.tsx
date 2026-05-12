import React, { useEffect } from 'react';
import { useAtomValue, useAtom } from 'jotai';
import { visibleColumnsAtom } from '../store/selectors/visibleColumns';
import { boardDataAtom, columnIndicesAtom, activeProfileAtom } from '../store/atoms/boardState';
import { zoomLevelAtom, isSidebarOpenAtom } from '../store/atoms/uiState';
import { Column } from './Column';

export const Board: React.FC = () => {
  const columns = useAtomValue(visibleColumnsAtom);
  const boardData = useAtomValue(boardDataAtom);
  const { visibleColsCount } = useAtomValue(activeProfileAtom);
  const [indices, setIndices] = useAtom(columnIndicesAtom);
  const zoom = useAtomValue(zoomLevelAtom);
  const isSidebarOpen = useAtomValue(isSidebarOpenAtom);

  useEffect(() => {
    if (boardData && boardData.columnas && indices.length !== visibleColsCount) {
      // Inicializar con los primeros N índices
      const initialIndices = Array.from({ length: visibleColsCount }, (_, i) => i);
      setIndices(initialIndices);
    }
  }, [boardData, visibleColsCount, setIndices, indices.length]);

  // Calcular ancho de columna una sola vez para todas
  const panelWidth = isSidebarOpen ? (window.innerWidth >= 1200 ? 352 : 300) : 0;
  const sidebarWidth = 72 + panelWidth;
  const availableWidth = (window.innerWidth - sidebarWidth) * zoom;
  const colWidth = Math.floor(availableWidth / visibleColsCount);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      width: '100%', 
      height: '100%',
      overflow: 'hidden'
    }}>
      <div 
        className="board-grid" 
        role="grid" 
        style={{ 
          width: `${zoom * 100}%`,
          transition: 'width 0.2s ease-in-out'
        }}
      >
        {columns.map((col, idx) => (
          <Column 
            key={`${col.tipo}-${idx}`} 
            data={col} 
            slotIndex={idx} 
            colWidth={colWidth}
          />
        ))}
      </div>
    </div>
  );
};
