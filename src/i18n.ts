import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      "appTitle": "AraPicTalk",
      "dynamicInputPlaceholder": "¿Qué vamos a hacer? (ej. Voy a ir al supermercado)",
      "generateBoard": "Generar Tablero",
      "loading": "Cargando...",
      "rotateDevice": "Por favor, gira el dispositivo. La aplicación AAC está diseñada para usarse en horizontal.",
      "sentencePlaceholder": "Fila superior: Frase",
    }
  },
  en: {
    translation: {
      "appTitle": "AraPicTalk",
      "dynamicInputPlaceholder": "What are we going to do? (e.g. Go to the supermarket)",
      "generateBoard": "Generate Board",
      "loading": "Loading...",
      "rotateDevice": "Please rotate your device. The AAC app is designed for landscape use.",
      "sentencePlaceholder": "Top row: Sentence",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // idioma por defecto
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React ya escapa de por sí
    }
  });

export default i18n;
