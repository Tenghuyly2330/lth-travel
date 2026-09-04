const express = require('express');
const multer = require('multer');
const { uploadToCloudinary } = require('../config/cloudinary');

const router = express.Router();

// Memory storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({
      storage,
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
      fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                  cb(null, true);
            } else {
                  cb(new Error('Only image files are allowed!'), false);
            }
      },
});

// POST /api/upload
router.post('/', upload.single('image'), async (req, res) => {
      try {
            if (!req.file) {
                  return res.status(400).json({ message: 'No image file provided' });
            }

            const folder = req.body.folder || 'lth-travel/trips'; // 'lth-travel/trips' or 'lth-travel/gallery'
            const result = await uploadToCloudinary(req.file.buffer, folder);

            res.status(200).json({
                  message: 'Image uploaded successfully to Cloudinary',
                  url: result.url,
                  public_id: result.public_id,
            });
      } catch (error) {
            console.error('Image upload endpoint error:', error);
            res.status(500).json({
                  message: 'Failed to upload image to Cloudinary',
                  error: error.message,
            });
      }
});

module.exports = router;
