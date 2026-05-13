import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = 'https://api.arasaac.org/api/pictograms';

export interface Pictogram {
  _id: number;
  keywords: { keyword: string; meaning: string }[];
  schematic: boolean;
  sex: boolean;
  violence: boolean;
  hair: boolean;
  skin: boolean;
  aac: boolean;
  aacColor: boolean;
  active: boolean;
  downloads: number;
  categories: string[];
  synsets: string[];
  tags: string[];
  lastUpdated: string;
}

export const getPictoById = async (id: number, locale = 'es'): Promise<Pictogram> => {
  const { data } = await axios.get(`${API_BASE_URL}/${locale}/${id}`);
  return data;
};

export const searchPictos = async (query: string, locale = 'es'): Promise<Pictogram[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/${locale}/search/${query}`);
  return data;
};

export const getPictoUrl = (id: number): string => {
  return `https://static.arasaac.org/pictograms/${id}/${id}_300.png`;
};

export const getPictogramImageUrl = (id: number | string, size = 300) => {
  return `https://static.arasaac.org/pictograms/${id}/${id}_${size}.png`;
};

export const usePictogram = (keyword: string, locale = 'es') => {
  return useQuery({
    queryKey: ['pictograms', keyword, locale],
    queryFn: () => searchPictos(keyword, locale),
    enabled: !!keyword,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const arasaacApi = {
  getPictoById,
  searchPictos,
  getPictoUrl,
  getPictogramImageUrl
};
