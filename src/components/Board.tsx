import React, { useEffect } from 'react';
import { useAtomValue, useAtom } from 'jotai';
import { visibleColumnsAtom } from '../store/selectors/visibleColumns';
import { boardDataAtom, columnIndicesAtom, activeProfileAtom } from '../store/atoms/boardState';
import { Column } from './Column';
import { layoutMetricsAtom } from '../store/selectors/layoutMetrics';

export const Board: React.FC = () => {
  const columns = useAtomValue(visibleColumnsAtom);
  const boardData = useAtomValue(boardDataAtom);
  const { visibleColsCount } = useAtomValue(activeProfileAtom);
  const [indices, setIndices] = useAtom(columnIndicesAtom);
  const { colWidth } = useAtomValue(layoutMetricsAtom);

  useEffect(() => {
    if (boardData && boardData.columnas && indices.length !== visibleColsCount) {
      const initialIndices = Array.from({ length: visibleColsCount }, (_, i) => i);
      setIndices(initialIndices);
    }
  }, [boardData, visibleColsCount, setIndices, indices.length]);

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }}>
      <div
        className="board-grid"
        role="grid"
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
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
