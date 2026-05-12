import { atom } from 'jotai';
import { boardDataAtom, hiddenColumnsAtom, activeProfileAtom, columnIndicesAtom } from '../atoms/boardState';
import type { ColumnData } from '../../core/types';

export const visibleColumnsAtom = atom<ColumnData[]>((get) => {
  const boardData = get(boardDataAtom);
  const hidden = get(hiddenColumnsAtom);
  const columnIndices = get(columnIndicesAtom);
  const { visibleColsCount } = get(activeProfileAtom);

  if (!boardData || !boardData.columnas) return [];

  // 1. Filtrar las columnas ocultas
  const availableColumns = boardData.columnas.filter(col => !hidden.has(col.tipo));
  
  if (availableColumns.length === 0) return [];

  // Si no hay índices establecidos (o no coinciden en cantidad), devolvemos las primeras disponibles
  if (columnIndices.length !== visibleColsCount) {
    return availableColumns.slice(0, visibleColsCount);
  }

  // 2. Mapear los índices a los objetos de columna
  return columnIndices.map(idx => {
    const realIndex = idx % availableColumns.length;
    return availableColumns[realIndex];
  });
});
