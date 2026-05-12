import { atom } from 'jotai';
import type { BoardData, SentenceElement, UserProfile } from '../../core/types';

export const boardDataAtom = atom<BoardData | null>(null);

export const hiddenColumnsAtom = atom<Set<string>>(new Set<string>());

export const sentenceElementsAtom = atom<SentenceElement[]>([]);

export const carouselStartIndexAtom = atom<number>(0);

// Almacena los índices de las columnas mostradas en cada ranura
export const columnIndicesAtom = atom<number[]>([]);

export const activeProfileAtom = atom<UserProfile>({
  id: 'default',
  name: 'Usuario Principal',
  visibleColsCount: 6,
  visibleRowsCount: 4,
  isSquare: true,
  spacing: 4,
  showText: true,
  fontFamily: 'OpenSans',
  fontSize: 18,
  textPosition: 'top',
  fontColor: '#000000',
  capitalLetters: false,
  cellBorders: true,
  borderColor: '#CCCCCC',
  borderWidth: 1,
  backgroundColor: '#FFFFFF',
  borderRadius: 8,
});
