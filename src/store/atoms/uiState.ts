import { atom } from 'jotai';

export const isSidebarOpenAtom = atom<boolean>(false);
export const themeModeAtom = atom<'light' | 'dark'>('light');

export const windowSizeAtom = atom({
  width: window.innerWidth,
  height: window.innerHeight,
});

// Height of the right-side panel (SentenceBar + Board), measured via ResizeObserver in App.tsx.
// This is the ONLY source of truth for vertical layout calculations.
// It depends only on the viewport + sidebar — no circular dependency.
export const boardAreaHeightAtom = atom<number>(window.innerHeight);
