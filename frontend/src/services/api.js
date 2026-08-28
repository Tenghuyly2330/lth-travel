import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
            'Content-Type': 'application/json',
      },
});

export const getTours = async () => {
      const response = await api.get('/tours');
      return response.data;
};

export const getTourById = async (idOrSlug) => {
      const response = await api.get(`/tours/${idOrSlug}`);
      return response.data;
};

export const getPhotos = async () => {
      const response = await api.get('/photos');
      return response.data;
};

export default api;
