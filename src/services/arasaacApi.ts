import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

interface ArasaacPictogram {
  _id: number;
  keywords: Array<{ keyword: string }>;
  // Otros campos omitidos para simplificar
}

export const getPictogramImageUrl = (id: number, resolution = 300) => {
  return `https://static.arasaac.org/pictograms/${id}/${id}_${resolution}.png`;
};

export const fetchPictogramData = async (keyword: string, language: string): Promise<ArasaacPictogram[] | null> => {
  if (!keyword) return null;
  
  try {
    const res = await fetch(`https://api.arasaac.org/api/pictograms/${language}/search/${encodeURIComponent(keyword)}`);
    if (!res.ok) {
      if (res.status === 404) return []; // No encontrado devuelve array vacío
      throw new Error('Error al conectar con la API de Arasaac');
    }
    const data: ArasaacPictogram[] = await res.json();
    return data; // Devolvemos todas las variaciones
  } catch (error) {
    console.error(`Error buscando pictograma para "${keyword}":`, error);
    return null;
  }
};

export const usePictogram = (keyword: string) => {
  const { i18n } = useTranslation();
  const language = i18n.language || 'es';

  return useQuery({
    queryKey: ['pictogram', language, keyword],
    queryFn: () => fetchPictogramData(keyword, language),
    staleTime: 1000 * 60 * 60 * 24, // Cacheamos 24 horas, las imágenes de arasaac cambian raramente
    retry: 1, // Reintento rápido
  });
};
