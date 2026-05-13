import { useEffect } from 'react';
import { FONT_LIST } from '../constants/fonts';

export const FontLoader: React.FC = () => {
    useEffect(() => {
        const customFonts = ['Atkinson-Hyperlegible', 'Escolar', 'Massallera', 'Memima', 'OpenDyslexic', 'Pipomayu'];
        const googleFonts = FONT_LIST.filter(f => !customFonts.includes(f) && f !== 'Inter' && f !== 'Arial' && f !== 'sans-serif' && f !== 'serif' && f !== 'monospace');

        if (googleFonts.length === 0) return;

        const linkIdBase = 'google-fonts-link';
        if (document.getElementById(`${linkIdBase}-0`)) return; // Already injected

        const chunkSize = 30;
        for (let i = 0; i < googleFonts.length; i += chunkSize) {
            const chunk = googleFonts.slice(i, i + chunkSize);
            const link = document.createElement('link');
            link.id = `${linkIdBase}-${i / chunkSize}`;
            link.rel = 'stylesheet';

            const families = chunk.map(f => `family=${f.replace(/ /g, '+')}`).join('&');
            link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;

            document.head.appendChild(link);
        }
    }, []);

    return null;
}
