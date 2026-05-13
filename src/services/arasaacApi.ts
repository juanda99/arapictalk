import { atom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

interface ArasaacPictogram {
  _id: number;
  keywords: Array<{ keyword: string }>;
}

export const getPictogramImageUrl = (id: number | string, resolution = 300) => {
  return `https://static.arasaac.org/pictograms/${id}/${id}_${resolution}.png`;
};

export const fetchPictogramData = async (keyword: string, language: string): Promise<ArasaacPictogram[] | null> => {
  if (!keyword) return null;
  
  try {
    const res = await fetch(`https://api.arasaac.org/api/pictograms/${language}/search/${encodeURIComponent(keyword)}`);
    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error('Error al conectar con la API de Arasaac');
    }
    const data: ArasaacPictogram[] = await res.json();
    return data;
  } catch (error) {
    console.error(`Error buscando pictograma para "${keyword}":`, error);
    return null;
  }
};

export const getPictoById = async (id: number, language: string) => {
  const res = await fetch(`https://api.arasaac.org/api/pictograms/${language}/${id}`);
  if (!res.ok) return null;
  return res.json();
};

export const arasaacApi = {
  getPictoUrl: getPictogramImageUrl,
  searchPictos: fetchPictogramData,
  getPictoById,
};

export const usePictogram = (keyword: string) => {
  const { i18n } = useTranslation();
  const language = i18n.language || 'es';

  return useQuery({
    queryKey: ['pictogram', language, keyword],
    queryFn: () => fetchPictogramData(keyword, language),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });
};
