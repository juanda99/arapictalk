import React from 'react';
import { useAtomValue, useAtom } from 'jotai';
import { Cell } from './Cell';
import type { ColumnData } from '../core/types';
import { activeProfileAtom, boardDataAtom, columnIndicesAtom } from '../store/atoms/boardState';
import IconButton from '@mui/material/IconButton';
import CachedIcon from '@mui/icons-material/Cached';
import { layoutMetricsAtom } from '../store/selectors/layoutMetrics';

interface Props {
  data: ColumnData;
  slotIndex: number;
  colWidth: number;
}

export const Column: React.FC<Props> = ({ data, slotIndex }) => {
  const profile = useAtomValue(activeProfileAtom);
  const boardData = useAtomValue(boardDataAtom);
  const [indices, setIndices] = useAtom(columnIndicesAtom);
  const { rowHeight, headerBarHeight } = useAtomValue(layoutMetricsAtom);

  const handleCycle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!boardData) return;
    const totalCols = boardData.columnas.length;
    if (totalCols <= profile.visibleColsCount) return;
    const newIndices = [...indices];
    let nextIdx = (newIndices[slotIndex] + 1) % totalCols;
    while (newIndices.includes(nextIdx)) nextIdx = (nextIdx + 1) % totalCols;
    newIndices[slotIndex] = nextIdx;
    setIndices(newIndices);
  };

  const sp = profile.spacing;
  const canCycle = !!(boardData && boardData.columnas.length > profile.visibleColsCount);

  return (
    <div
      style={{
        width: `${100 / profile.visibleColsCount}%`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: `${sp / 2}px`,
        paddingRight: `${sp / 2}px`,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* ── Compact category separator bar (FIXED) ── */}
      {profile.showColumnHeaders && (
        <div
          style={{
            height: `${headerBarHeight}px`,
            marginTop: `${sp}px`,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            paddingLeft: '6px',
            paddingRight: '6px',
            borderRadius: `${profile.borderRadius}px`,
            backgroundColor: '#8bc34a',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              fontSize: `calc(${profile.fontSize}px * 0.75)`,
              color: '#fff',
              fontFamily: profile.fontFamily,
              textTransform: profile.capitalLetters ? 'uppercase' : 'none',
              fontWeight: 700,
              textAlign: 'center',
              flex: 1,
              lineHeight: 1.15,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word',
            }}
            title={data.tipo}
          >
            {data.tipo}
          </span>
          {canCycle && (
            <IconButton
              size="small"
              onClick={handleCycle}
              sx={{ 
                p: 0.4, 
                flexShrink: 0, 
                bgcolor: 'white', 
                color: '#8bc34a',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                '&:hover': { bgcolor: '#ffffff', color: '#7cb342', transform: 'scale(1.1)' },
                width: '26px',
                height: '26px',
                transition: 'all 0.2s'
              }}
            >
              <CachedIcon sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          )}
        </div>
      )}

      {/* ── Content rows (SCROLLABLE) ── */}
      <div 
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          overflowX: 'hidden', 
          scrollbarWidth: 'none',
          paddingBottom: `${sp}px` // Add bottom padding to balance the spacing
        }}
      >
        {data.contenido.map((keyword, i) => (
          <div
            key={`${keyword}-${i}`}
            style={{ height: `${rowHeight}px`, marginTop: `${sp}px`, flexShrink: 0, width: '100%' }}
          >
            <Cell keyword={keyword} columnType={data.tipo} />
          </div>
        ))}
      </div>
    </div>
  );
};
