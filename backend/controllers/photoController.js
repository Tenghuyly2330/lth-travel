const prisma = require('../config/prisma');
const { deleteFromCloudinary } = require('../config/cloudinary');

// Get all photos
const getPhotos = async (req, res) => {
      try {
            const photos = await prisma.photo.findMany({
                  orderBy: [
                        { date: { sort: 'desc', nulls: 'last' } },
                        { createdAt: 'desc' },
                  ],
            });
            res.json(photos);
      } catch (error) {
            console.error('Error fetching photos:', error);
            res.status(500).json({ message: 'Failed to fetch photos', error: error.message });
      }
};

// Create new photo
const createPhoto = async (req, res) => {
      try {
            const { imageUrl, title, location, description, date } = req.body;
            const newPhoto = await prisma.photo.create({
                  data: {
                        imageUrl,
                        title,
                        location,
                        description,
                        date: date || null,
                  },
            });
            res.status(201).json(newPhoto);
      } catch (error) {
            console.error('Error creating photo:', error);
            res.status(500).json({ message: 'Failed to create photo', error: error.message });
      }
};

// Update photo
const updatePhoto = async (req, res) => {
      try {
            const { id } = req.params;
            const { imageUrl, title, location, description, date } = req.body;

            const existingPhoto = await prisma.photo.findUnique({ where: { id } });

            const updatedPhoto = await prisma.photo.update({
                  where: { id },
                  data: {
                        imageUrl,
                        title,
                        location,
                        description,
                        date: date !== undefined ? date : undefined,
                  },
            });

            // If imageUrl changed and old imageUrl was on Cloudinary, delete old asset
            if (existingPhoto && existingPhoto.imageUrl && imageUrl && existingPhoto.imageUrl !== imageUrl) {
                  await deleteFromCloudinary(existingPhoto.imageUrl);
            }

            res.json(updatedPhoto);
      } catch (error) {
            console.error('Error updating photo:', error);
            res.status(500).json({ message: 'Failed to update photo', error: error.message });
      }
};

// Delete photo
const deletePhoto = async (req, res) => {
      try {
            const { id } = req.params;

            const photo = await prisma.photo.findUnique({ where: { id } });
            if (!photo) {
                  return res.status(404).json({ message: 'Photo not found' });
            }

            await prisma.photo.delete({ where: { id } });

            // Delete image from Cloudinary if stored there
            if (photo.imageUrl) {
                  await deleteFromCloudinary(photo.imageUrl);
            }

            res.json({ message: 'Photo and associated Cloudinary image deleted successfully' });
      } catch (error) {
            console.error('Error deleting photo:', error);
            res.status(500).json({ message: 'Failed to delete photo', error: error.message });
      }
};

module.exports = {
      getPhotos,
      createPhoto,
      updatePhoto,
      deletePhoto,
};
