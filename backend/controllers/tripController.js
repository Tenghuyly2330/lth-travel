const prisma = require('../config/prisma');
const { deleteFromCloudinary } = require('../config/cloudinary');

// Get all trips
const getTrips = async (req, res) => {
      try {
            const trips = await prisma.trip.findMany({
                  orderBy: [
                        { date: { sort: 'desc', nulls: 'last' } },
                        { createdAt: 'desc' },
                  ],
            });
            res.json(trips);
      } catch (error) {
            console.error('Error fetching trips:', error);
            res.status(500).json({ message: 'Failed to fetch trips', error: error.message });
      }
};

const getTripById = async (req, res) => {
      try {
            const { id } = req.params;

            let trip = await prisma.trip.findUnique({
                  where: { id },
            });

            if (!trip) {
                  trip = await prisma.trip.findUnique({
                        where: { slug: id },
                  });
            }

            if (!trip) {
                  return res.status(404).json({ message: 'Trip not found' });
            }

            console.log(`[getTripById] ID/Slug: ${id} -> Members: "${trip.members}"`);
            res.json(trip);
      } catch (error) {
            console.error('Error fetching trip:', error);
            res.status(500).json({ message: 'Failed to fetch trip details', error: error.message });
      }
};

const createTrip = async (req, res) => {
      try {
            const { title, slug, location, country, description, duration, members, date, coverImage } = req.body;

            const newTrip = await prisma.trip.create({
                  data: {
                        title,
                        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
                        location,
                        country,
                        description,
                        duration,
                        members: members || null,
                        date: date || null,
                        coverImage,
                  },
            });

            res.status(201).json(newTrip);
      } catch (error) {
            console.error('Error creating trip:', error);
            res.status(500).json({ message: 'Failed to create trip', error: error.message });
      }
};

const updateTrip = async (req, res) => {
      try {
            const { id } = req.params;
            const { title, slug, location, country, description, duration, members, date, coverImage } = req.body;

            const existingTrip = await prisma.trip.findUnique({ where: { id } });
            if (!existingTrip) {
                  return res.status(404).json({ message: 'Trip not found' });
            }

            const updatedTrip = await prisma.trip.update({
                  where: { id },
                  data: {
                        title: title !== undefined ? title : existingTrip.title,
                        slug: slug || undefined,
                        location: location !== undefined ? location : existingTrip.location,
                        country: country !== undefined ? country : existingTrip.country,
                        description: description !== undefined ? description : existingTrip.description,
                        duration: duration !== undefined ? duration : existingTrip.duration,
                        members: members !== undefined ? members : existingTrip.members,
                        date: date !== undefined ? date : existingTrip.date,
                        coverImage: coverImage !== undefined ? coverImage : existingTrip.coverImage,
                  },
            });

            // If coverImage changed and old coverImage was on Cloudinary, delete old asset
            if (existingTrip && existingTrip.coverImage && coverImage && existingTrip.coverImage !== coverImage) {
                  await deleteFromCloudinary(existingTrip.coverImage);
            }

            res.json(updatedTrip);
      } catch (error) {
            console.error('Error updating trip:', error);
            res.status(500).json({ message: 'Failed to update trip', error: error.message });
      }
};

const deleteTrip = async (req, res) => {
      try {
            const { id } = req.params;

            const trip = await prisma.trip.findUnique({ where: { id } });
            if (!trip) {
                  return res.status(404).json({ message: 'Trip not found' });
            }

            await prisma.trip.delete({ where: { id } });

            // Delete image from Cloudinary if stored there
            if (trip.coverImage) {
                  await deleteFromCloudinary(trip.coverImage);
            }

            res.json({ message: 'Trip and associated Cloudinary image deleted successfully' });
      } catch (error) {
            console.error('Error deleting trip:', error);
            res.status(500).json({ message: 'Failed to delete trip', error: error.message });
      }
};

module.exports = {
      getTrips,
      getTripById,
      createTrip,
      updateTrip,
      deleteTrip,
};
