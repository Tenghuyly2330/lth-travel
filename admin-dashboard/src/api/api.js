import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const api = axios.create({
      baseURL: API_BASE,
});

// Auth
export const loginAdmin = (email, password) =>
      api.post('/auth/login', { email, password });

export const getMe = (token) =>
      api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });

// Tours API
export const getTours = () => api.get('/tours');
export const createTour = (data) => api.post('/tours', data);
export const updateTour = (id, data) => api.put(`/tours/${id}`, data);
export const deleteTour = (id) => api.delete(`/tours/${id}`);

// Photos API
export const getPhotos = () => api.get('/photos');
export const createPhoto = (data) => api.post('/photos', data);
export const updatePhoto = (id, data) => api.put(`/photos/${id}`, data);
export const deletePhoto = (id) => api.delete(`/photos/${id}`);

// Image Upload API (Cloudinary)
export const uploadImage = (file, folder = 'tours') => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);
      return api.post('/upload', formData, {
            headers: {
                  'Content-Type': 'multipart/form-data',
            },
      });
};
