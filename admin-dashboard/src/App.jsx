import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { getMe, getTrips, createTrip, updateTrip, deleteTrip, getPhotos, createPhoto, updatePhoto, deletePhoto } from './api/api';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Toast from './components/Toast';
import TripModal from './components/modals/TripModal';
import PhotoModal from './components/modals/PhotoModal';
import ConfirmDeleteModal from './components/modals/ConfirmDeleteModal';
import LoginView from './pages/LoginView';
import DashboardHome from './pages/DashboardHome';
import PackagesPage from './pages/PackagesPage';
import GalleryPage from './pages/GalleryPage';

function DashboardLayout({ user, onLogout }) {
  const location = useLocation();
  const [trips, setTrips] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Trip Modal state
  const [tripModalOpen, setTripModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [tripForm, setTripForm] = useState({
    title: '', location: '', country: '', duration: '', members: '', date: '', coverImage: '', description: ''
  });
  const [savingTrip, setSavingTrip] = useState(false);
  const [deleteTripTarget, setDeleteTripTarget] = useState(null);

  // Photo Modal state
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [photoForm, setPhotoForm] = useState({
    title: '', location: '', date: '', imageUrl: '', description: ''
  });
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [deletePhotoTarget, setDeletePhotoTarget] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 4000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [tripsRes, photosRes] = await Promise.all([getTrips(), getPhotos()]);
      setTrips(tripsRes.data || []);
      setPhotos(photosRes.data || []);
    } catch (err) {
      console.error('Data fetch error', err);
      showToast('Failed to load data. Please check your connection.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Trip Handlers
  const openCreateTrip = () => {
    setEditingTrip(null);
    setTripForm({ title: '', location: '', country: '', duration: '', members: '', date: '', coverImage: '', description: '' });
    setTripModalOpen(true);
  };

  const openEditTrip = (trip) => {
    setEditingTrip(trip);
    setTripForm({
      title: trip.title || '',
      location: trip.location || '',
      country: trip.country || '',
      duration: trip.duration || '',
      members: trip.members || '',
      date: trip.date || '',
      coverImage: trip.coverImage || '',
      description: trip.description || ''
    });
    setTripModalOpen(true);
  };

  const handleSaveTrip = async (e) => {
    e.preventDefault();
    setSavingTrip(true);
    try {
      if (editingTrip) {
        await updateTrip(editingTrip.id, tripForm);
        showToast('Trip updated successfully!');
      } else {
        await createTrip(tripForm);
        showToast('New trip created successfully!');
      }
      setTripModalOpen(false);
      fetchData();
    } catch (err) {
      showToast('Error saving trip: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setSavingTrip(false);
    }
  };

  const handleDeleteTrip = async () => {
    if (!deleteTripTarget) return;
    try {
      await deleteTrip(deleteTripTarget.id);
      showToast('Trip deleted successfully!');
      setDeleteTripTarget(null);
      fetchData();
    } catch (err) {
      showToast('Failed to delete trip: ' + (err.response?.data?.message || err.message), 'error');
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
      showToast('Error saving photo: ' + (err.response?.data?.message || err.message), 'error');
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
      showToast('Failed to delete photo: ' + (err.response?.data?.message || err.message), 'error');
    }
  };

  const filteredTrips = trips.filter(t =>
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
        tripsCount={trips.length}
        photosCount={photos.length}
      />
      <div className="md:ml-[220px] flex-1 flex flex-col min-h-screen">
        <Topbar
          title={getPageTitle()}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <Toast message={toast.message} type={toast.type} />

        <Routes>
          <Route
            path="/"
            element={
              <DashboardHome
                trips={trips}
                photos={photos}
                loading={loading}
                openCreateTrip={openCreateTrip}
                openEditTrip={openEditTrip}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardHome
                trips={trips}
                photos={photos}
                loading={loading}
                openCreateTrip={openCreateTrip}
                openEditTrip={openEditTrip}
              />
            }
          />
          <Route
            path="/packages"
            element={
              <PackagesPage
                trips={filteredTrips}
                loading={loading}
                openCreateTrip={openCreateTrip}
                openEditTrip={openEditTrip}
                confirmDeleteTrip={setDeleteTripTarget}
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

      <TripModal
        isOpen={tripModalOpen}
        onClose={() => setTripModalOpen(false)}
        onSubmit={handleSaveTrip}
        editingTrip={editingTrip}
        tripForm={tripForm}
        setTripForm={setTripForm}
        saving={savingTrip}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(deleteTripTarget)}
        onClose={() => setDeleteTripTarget(null)}
        onConfirm={handleDeleteTrip}
        title="Delete Trip Package"
        itemName={deleteTripTarget?.title || ''}
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
