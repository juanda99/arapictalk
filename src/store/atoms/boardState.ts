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
  visibleColsCount: 8,
  visibleRowsCount: 6,
  isSquare: false,
  spacing: 3,
  showColumnHeaders: true,
  sentenceBarColor: '#9ccc65',
  boardBackgroundColor: '#FFFFFF',
  showText: false,
  fontFamily: 'Open Sans',
  fontSize: 18,
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  textPosition: 'top',
  fontColor: '#000000',
  capitalLetters: false,
  secondaryTextEnabled: false,
  secondaryLanguage: 'en',
  cellBorders: true,
  borderColor: '#CCCCCC',
  borderWidth: 1,
  backgroundColor: '#FFFFFF',
  borderRadius: 8,
  fitzgeraldEnabled: false,
});
