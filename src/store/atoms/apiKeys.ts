import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// We use atomWithStorage to persist the API key in localStorage
export const geminiApiKeyAtom = atomWithStorage<string>('gemini_api_key', '');

// Atom to track if we need to show the API key entry dialog
export const isApiKeyDialogOpenAtom = atom<boolean>(false);

// Atom to track the specific error message if the key is invalid
export const apiKeyErrorAtom = atom<string | null>(null);
