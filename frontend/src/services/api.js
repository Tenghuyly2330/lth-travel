import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
            'Content-Type': 'application/json',
      },
});

export const getTrips = async () => {
      try {
            const response = await api.get('/trips');
            return response.data;
      } catch (err) {
            console.warn('Primary API URL failed, attempting fallback to relative /api/trips...', err);
            try {
                  const fallbackRes = await axios.get('/api/trips');
                  return fallbackRes.data;
            } catch (fallbackErr) {
                  throw err;
            }
      }
};

export const getTripById = async (idOrSlug) => {
      try {
            const response = await api.get(`/trips/${idOrSlug}`);
            return response.data;
      } catch (err) {
            console.warn(`Primary API URL failed for trip ${idOrSlug}, attempting fallback...`, err);
            try {
                  const fallbackRes = await axios.get(`/api/trips/${idOrSlug}`);
                  return fallbackRes.data;
            } catch (fallbackErr) {
                  throw err;
            }
      }
};

export const getPhotos = async () => {
      try {
            const response = await api.get('/photos');
            return response.data;
      } catch (err) {
            console.warn('Primary API URL failed for photos, attempting fallback...', err);
            try {
                  const fallbackRes = await axios.get('/api/photos');
                  return fallbackRes.data;
            } catch (fallbackErr) {
                  throw err;
            }
      }
};

export default api;
