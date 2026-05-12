export interface SentenceElement {
  id: string;
  text: string;
  pictoIds?: number[];
  currentPictoIndex?: number;
}

export interface ColumnData {
  tipo: string;
  contenido: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  // Documento
  visibleColsCount: number;
  visibleRowsCount: number;
  isSquare: boolean;
  spacing: number;
  // Global - Texto
  showText: boolean;
  fontFamily: string;
  fontSize: number;
  textPosition: 'top' | 'center' | 'bottom';
  fontColor: string;
  capitalLetters: boolean;
  // Global - Estilo
  cellBorders: boolean;
  borderColor: string;
  borderWidth: number;
  backgroundColor: string;
  borderRadius: number;
}

export interface BoardData {
  actividad: string;
  formato: string;
  columnas: ColumnData[];
}
