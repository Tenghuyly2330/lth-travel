const prisma = require('../config/prisma');
const { deleteFromCloudinary } = require('../config/cloudinary');

// Get all tours
const getTours = async (req, res) => {
      try {
            const tours = await prisma.tour.findMany({
                  orderBy: { createdAt: 'desc' },
            });
            res.json(tours);
      } catch (error) {
            console.error('Error fetching tours:', error);
            res.status(500).json({ message: 'Failed to fetch tours', error: error.message });
      }
};

// Get single tour by ID or Slug
const getTourById = async (req, res) => {
      try {
            const { id } = req.params;

            let tour = await prisma.tour.findUnique({
                  where: { id },
            });

            if (!tour) {
                  tour = await prisma.tour.findUnique({
                        where: { slug: id },
                  });
            }

            if (!tour) {
                  return res.status(404).json({ message: 'Tour not found' });
            }

            res.json(tour);
      } catch (error) {
            console.error('Error fetching tour:', error);
            res.status(500).json({ message: 'Failed to fetch tour details', error: error.message });
      }
};

// Create new tour
const createTour = async (req, res) => {
      try {
            const { title, slug, location, country, description, duration, date, coverImage } = req.body;

            const newTour = await prisma.tour.create({
                  data: {
                        title,
                        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
                        location,
                        country,
                        description,
                        duration,
                        date: date || null,
                        coverImage,
                  },
            });

            res.status(201).json(newTour);
      } catch (error) {
            console.error('Error creating tour:', error);
            res.status(500).json({ message: 'Failed to create tour', error: error.message });
      }
};

// Update tour
const updateTour = async (req, res) => {
      try {
            const { id } = req.params;
            const { title, slug, location, country, description, duration, date, coverImage } = req.body;

            const existingTour = await prisma.tour.findUnique({ where: { id } });

            const updatedTour = await prisma.tour.update({
                  where: { id },
                  data: {
                        title,
                        slug: slug || undefined,
                        location,
                        country,
                        description,
                        duration,
                        date: date !== undefined ? date : undefined,
                        coverImage,
                  },
            });

            // If coverImage changed and old coverImage was on Cloudinary, delete old asset
            if (existingTour && existingTour.coverImage && coverImage && existingTour.coverImage !== coverImage) {
                  await deleteFromCloudinary(existingTour.coverImage);
            }

            res.json(updatedTour);
      } catch (error) {
            console.error('Error updating tour:', error);
            res.status(500).json({ message: 'Failed to update tour', error: error.message });
      }
};

// Delete tour
const deleteTour = async (req, res) => {
      try {
            const { id } = req.params;

            const tour = await prisma.tour.findUnique({ where: { id } });
            if (!tour) {
                  return res.status(404).json({ message: 'Tour not found' });
            }

            await prisma.tour.delete({ where: { id } });

            // Delete image from Cloudinary if stored there
            if (tour.coverImage) {
                  await deleteFromCloudinary(tour.coverImage);
            }

            res.json({ message: 'Tour and associated Cloudinary image deleted successfully' });
      } catch (error) {
            console.error('Error deleting tour:', error);
            res.status(500).json({ message: 'Failed to delete tour', error: error.message });
      }
};

module.exports = {
      getTours,
      getTourById,
      createTour,
      updateTour,
      deleteTour,
};
