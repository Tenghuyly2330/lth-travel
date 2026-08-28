import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { getMe, getTours, createTour, updateTour, deleteTour, getPhotos, createPhoto, updatePhoto, deletePhoto } from './api/api';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Toast from './components/Toast';
import TourModal from './components/modals/TourModal';
import PhotoModal from './components/modals/PhotoModal';
import ConfirmDeleteModal from './components/modals/ConfirmDeleteModal';
import LoginView from './pages/LoginView';
import DashboardHome from './pages/DashboardHome';
import PackagesPage from './pages/PackagesPage';
import GalleryPage from './pages/GalleryPage';

function DashboardLayout({ user, onLogout }) {
  const location = useLocation();
  const [tours, setTours] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState('');

  // Tour Modal state
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [tourForm, setTourForm] = useState({
    title: '', location: '', country: '', duration: '', date: '', coverImage: '', description: ''
  });
  const [savingTour, setSavingTour] = useState(false);
  const [deleteTourTarget, setDeleteTourTarget] = useState(null);

  // Photo Modal state
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [photoForm, setPhotoForm] = useState({
    title: '', location: '', date: '', imageUrl: '', description: ''
  });
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [deletePhotoTarget, setDeletePhotoTarget] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [toursRes, photosRes] = await Promise.all([getTours(), getPhotos()]);
      setTours(toursRes.data || []);
      setPhotos(photosRes.data || []);
    } catch (err) {
      console.error('Data fetch error', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Tour Handlers
  const openCreateTour = () => {
    setEditingTour(null);
    setTourForm({ title: '', location: '', country: '', duration: '', date: '', coverImage: '', description: '' });
    setTourModalOpen(true);
  };

  const openEditTour = (tour) => {
    setEditingTour(tour);
    setTourForm({
      title: tour.title || '',
      location: tour.location || '',
      country: tour.country || '',
      duration: tour.duration || '',
      date: tour.date || '',
      coverImage: tour.coverImage || '',
      description: tour.description || ''
    });
    setTourModalOpen(true);
  };

  const handleSaveTour = async (e) => {
    e.preventDefault();
    setSavingTour(true);
    try {
      if (editingTour) {
        await updateTour(editingTour.id, tourForm);
        showToast('Tour updated successfully!');
      } else {
        await createTour(tourForm);
        showToast('New tour created successfully!');
      }
      setTourModalOpen(false);
      fetchData();
    } catch (err) {
      alert('Error saving tour: ' + (err.response?.data?.message || err.message));
    } finally {
      setSavingTour(false);
    }
  };

  const handleDeleteTour = async () => {
    if (!deleteTourTarget) return;
    try {
      await deleteTour(deleteTourTarget.id);
      showToast('Tour deleted successfully!');
      setDeleteTourTarget(null);
      fetchData();
    } catch (err) {
      alert('Failed to delete tour: ' + (err.response?.data?.message || err.message));
    }
  };

  // Photo Handlers
  const openCreatePhoto = () => {
    setEditingPhoto(null);
    setPhotoForm({ title: '', location: '', date: '', imageUrl: '', description: '' });
    setPhotoModalOpen(true);
  };

  const openEditPhoto = (photo) => {
    setEditingPhoto(photo);
    setPhotoForm({
      title: photo.title || '',
      location: photo.location || '',
      date: photo.date || '',
      imageUrl: photo.imageUrl || '',
      description: photo.description || ''
    });
    setPhotoModalOpen(true);
  };

  const handleSavePhoto = async (e) => {
    e.preventDefault();
    setSavingPhoto(true);
    try {
      if (editingPhoto) {
        await updatePhoto(editingPhoto.id, photoForm);
        showToast('Photo updated successfully!');
      } else {
        await createPhoto(photoForm);
        showToast('New photo added successfully!');
      }
      setPhotoModalOpen(false);
      fetchData();
    } catch (err) {
      alert('Error saving photo: ' + (err.response?.data?.message || err.message));
    } finally {
      setSavingPhoto(false);
    }
  };

  const handleDeletePhoto = async () => {
    if (!deletePhotoTarget) return;
    try {
      await deletePhoto(deletePhotoTarget.id);
      showToast('Photo deleted successfully!');
      setDeletePhotoTarget(null);
      fetchData();
    } catch (err) {
      alert('Failed to delete photo: ' + (err.response?.data?.message || err.message));
    }
  };

  const filteredTours = tours.filter(t =>
    t.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPhotos = photos.filter(p =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPageTitle = () => {
    if (location.pathname === '/packages') return 'Packages';
    if (location.pathname === '/gallery') return 'Gallery';
    return 'Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAF9] font-sans text-slate-900">
      <Sidebar
        user={user}
        onLogout={onLogout}
        toursCount={tours.length}
        photosCount={photos.length}
      />
      <div className="md:ml-[220px] flex-1 flex flex-col min-h-screen">
        <Topbar
          title={getPageTitle()}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <Toast message={toast} />

        <Routes>
          <Route
            path="/"
            element={
              <DashboardHome
                tours={tours}
                photos={photos}
                loading={loading}
                openCreateTour={openCreateTour}
                openEditTour={openEditTour}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardHome
                tours={tours}
                photos={photos}
                loading={loading}
                openCreateTour={openCreateTour}
                openEditTour={openEditTour}
              />
            }
          />
          <Route
            path="/packages"
            element={
              <PackagesPage
                tours={filteredTours}
                loading={loading}
                openCreateTour={openCreateTour}
                openEditTour={openEditTour}
                confirmDeleteTour={setDeleteTourTarget}
              />
            }
          />
          <Route
            path="/gallery"
            element={
              <GalleryPage
                photos={filteredPhotos}
                loading={loading}
                openCreatePhoto={openCreatePhoto}
                openEditPhoto={openEditPhoto}
                confirmDeletePhoto={setDeletePhotoTarget}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <TourModal
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
        onSubmit={handleSaveTour}
        editingTour={editingTour}
        tourForm={tourForm}
        setTourForm={setTourForm}
        saving={savingTour}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(deleteTourTarget)}
        onClose={() => setDeleteTourTarget(null)}
        onConfirm={handleDeleteTour}
        title="Delete Tour Package"
        itemName={deleteTourTarget?.title || ''}
      />

      <PhotoModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        onSubmit={handleSavePhoto}
        editingPhoto={editingPhoto}
        photoForm={photoForm}
        setPhotoForm={setPhotoForm}
        saving={savingPhoto}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(deletePhotoTarget)}
        onClose={() => setDeletePhotoTarget(null)}
        onConfirm={handleDeletePhoto}
        title="Delete Photo"
        itemName={deletePhotoTarget?.title || 'this photo'}
      />
    </div>
  );
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token && !user) {
      getMe(token)
        .then(r => setUser(r.data))
        .catch(() => { localStorage.removeItem('admin_token'); setToken(''); });
    }
  }, [token]);

  const handleLogin = (tok, u) => { setToken(tok); setUser(u); };
  const handleLogout = () => { localStorage.removeItem('admin_token'); setToken(''); setUser(null); };

  if (!token) return <LoginView onLogin={handleLogin} />;

  return (
    <BrowserRouter>
      <DashboardLayout user={user} onLogout={handleLogout} />
    </BrowserRouter>
  );
}
