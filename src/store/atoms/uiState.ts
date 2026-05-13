import { atom } from 'jotai';

export const isSidebarOpenAtom = atom<boolean>(false);
export const themeModeAtom = atom<'light' | 'dark'>('light');
