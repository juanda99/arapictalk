import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { BoardData, SentenceElement, UserProfile } from '../../core/types';

export const boardDataAtom = atom<BoardData | null>(null);

export const DEFAULT_GEMINI_PROMPT = `OBJETIVO: Generar tableros de comunicación interactivos para CAA en formato JSON estructurado, optimizados estructural y morfológicamente para la base de datos de pictogramas de ARASAAC.

REGLAS DE ORO DE MORFOLOGÍA Y DISEÑO (ESTRICTAS):
* ETIQUETAS LIMPIAS (PROHIBIDO ARTÍCULOS): No incluyas jamás artículos definidos o indefinidos (el, la, los, las, un, una) antes de los sustantivos. Escribe directamente el nombre base (ej. "REY MELCHOR", "CESTA").
* BREVEDAD Y LÍMITE DE PALABRAS: Máximo 2 palabras por celda para el vocabulario general. En columnas específicas de Monumentos, Escenarios Históricos o Instituciones Oficiales se permiten hasta 4 palabras para asegurar que el término coincida exactamente con el registro de ARASAAC (ej. "CASTILLO PAPA LUNA").
* MORFOLOGÍA ESTÁNDAR: Prioriza el uso del singular para los sustantivos (salvo que el concepto sea intrínsecamente plural, como "PRISMÁTICOS"). Los verbos deben aparecer siempre en infinitivo y los adjetivos/descriptores en masculino singular.
* SIN ABSTRACCIONES: Todo el vocabulario debe ser concreto, directo y fácilmente representable mediante un pictograma visual. Evita metáforas o giros lingüísticos.
* CONSISTENCIA SEMÁNTICA: No dejes celdas vacías bajo ningún concepto. Si una columna dispone de menos vocabulario natural, complétala hasta equiparar el tamaño del resto usando términos de refuerzo semántico coherentes.

ESTRUCTURA DE COLUMNAS (REGLAS DE DINAMISMO Y ORDEN):
Indica en el JSON si una columna es dinámica (esDinamica: true) o fija (esDinamica: false).
1. PERSONAS (Fija): Sujetos y pronombres (Yo, tú, papá...).
2. PROFESIONALES (Dinámica): Roles específicos del contexto.
3. PERSONAJES (Dinámica): Nombres propios en MAYÚSCULAS (ej. ELSA, MELCHOR...).
4. VERBOS NÚCLEO (Fija): Acciones de alta frecuencia (Querer, Ir, Ver...).
5. VERBOS ESPECÍFICOS (Dinámica): Acciones temáticas de la actividad.
6. OBJETOS (Dinámica): Elementos tangibles.
7. CATEGORÍAS ESPECÍFICAS (Dinámica): (Ropa, Alimentos, etc.).
8. LUGARES (Fija/Dinámica): Espacios físicos.
9. FICCIÓN (Dinámica): Escenarios de trama.
10. MONUMENTOS (Dinámica): MAYÚSCULAS obligatorias (ej. TORRE EIFFEL).
11. COMIDAS (Dinámica).
12. BEBIDAS (Dinámica).
13. DESCRIPTORES (Fija): Adjetivos y estados.
14. SOCIAL (Fija): Frases de cortesía y ayuda indispensable.

REGLAS DE ORO:
* VOLUMEN: Genera al menos 12-15 palabras por cada columna, ordenadas de mayor a menor importancia/frecuencia.
* ORDEN: Mantén el orden numérico de arriba en el array del JSON.
* UNICIDAD: Prohibido repetir nombres de columna o términos entre ellas.

LÓGICA DE DETECCIÓN:
* Viaje/Ciudad: Activa LUGARES, MONUMENTOS (MAYÚSCULAS), COMIDAS y BEBIDAS.
* Ficción: Activa PERSONAJES (MAYÚSCULAS) y LOCALIZACIONES DE FICCIÓN.`;

export const geminiSystemPromptAtom = atomWithStorage<string>('gemini_system_prompt', DEFAULT_GEMINI_PROMPT);

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
