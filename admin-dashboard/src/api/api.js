import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
      baseURL: API_BASE,
});

// Auth
export const loginAdmin = (email, password) =>
      api.post('/auth/login', { email, password });

export const getMe = (token) =>
      api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });

// Trips API
export const getTrips = () => api.get('/trips');
export const createTrip = (data) => api.post('/trips', data);
export const updateTrip = (id, data) => api.put(`/trips/${id}`, data);
export const deleteTrip = (id) => api.delete(`/trips/${id}`);

// Photos API
export const getPhotos = () => api.get('/photos');
export const createPhoto = (data) => api.post('/photos', data);
export const updatePhoto = (id, data) => api.put(`/photos/${id}`, data);
export const deletePhoto = (id) => api.delete(`/photos/${id}`);

// Image Upload API (Cloudinary)
export const uploadImage = (file, folder = 'lth-travel/trips') => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);
      return api.post('/upload', formData, {
            headers: {
                  'Content-Type': 'multipart/form-data',
            },
      });
};
