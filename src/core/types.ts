export interface SentenceElement {
  id: string;
  text: string;
  pictoIds?: number[];
  currentPictoIndex?: number;
}

export interface ColumnData {
  tipo: string;
  contenido: string[];
  esDinamica: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  // Documento
  visibleColsCount: number;
  visibleRowsCount: number;
  isSquare: boolean;
  spacing: number;
  showColumnHeaders?: boolean;
  sentenceBarColor?: string;
  boardBackgroundColor?: string;
  // Global - Texto
  showText: boolean;
  fontFamily: string;
  fontSize: number;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textPosition: 'top' | 'center' | 'bottom';
  fontColor: string;
  capitalLetters: boolean;
  secondaryTextEnabled?: boolean;
  secondaryLanguage?: string;
  // Global - Estilo
  cellBorders: boolean;
  borderColor: string;
  borderWidth: number;
  backgroundColor: string;
  borderRadius: number;
  fitzgeraldEnabled?: boolean;
}

export interface BoardData {
  actividad: string;
  formato: string;
  columnas: ColumnData[];
}
