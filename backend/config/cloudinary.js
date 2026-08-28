const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
      cloud_name: process.env.CLOUNDINARY_NAME || process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUNDINARY_API_KEY || process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUNDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer directly to Cloudinary into a specified folder ('tours' or 'photos')
 * @param {Buffer} fileBuffer 
 * @param {string} folder 
 * @returns {Promise<{url: string, public_id: string}>}
 */
const uploadToCloudinary = (fileBuffer, folder = 'tours') => {
      return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                  {
                        folder: folder,
                        resource_type: 'auto',
                  },
                  (error, result) => {
                        if (error) {
                              console.error('Cloudinary upload error:', error);
                              return reject(error);
                        }
                        resolve({
                              url: result.secure_url,
                              public_id: result.public_id,
                        });
                  }
            );
            uploadStream.end(fileBuffer);
      });
};

/**
 * Extracts public_id (including folder path) from a Cloudinary image URL
 * @param {string} url 
 * @returns {string|null}
 */
const extractPublicIdFromUrl = (url) => {
      if (!url || typeof url !== 'string') return null;
      if (!url.includes('cloudinary.com')) return null;

      try {
            const uploadIndex = url.indexOf('/upload/');
            if (uploadIndex === -1) return null;

            let pathAfterUpload = url.substring(uploadIndex + '/upload/'.length);

            // Strip version prefix if present (e.g., v1724744400/)
            pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, '');

            // Strip file extension
            const lastDotIndex = pathAfterUpload.lastIndexOf('.');
            if (lastDotIndex !== -1) {
                  pathAfterUpload = pathAfterUpload.substring(0, lastDotIndex);
            }

            return pathAfterUpload; // e.g. "tours/sample_id" or "photos/sample_id"
      } catch (err) {
            console.error('Error parsing Cloudinary public_id from URL:', err);
            return null;
      }
};

/**
 * Deletes an image from Cloudinary given its Cloudinary URL
 * @param {string} url 
 * @returns {Promise<any>}
 */
const deleteFromCloudinary = async (url) => {
      const publicId = extractPublicIdFromUrl(url);
      if (!publicId) return false;

      try {
            const result = await cloudinary.uploader.destroy(publicId);
            console.log(`Cloudinary media removed (${publicId}):`, result);
            return result;
      } catch (error) {
            console.error(`Failed to remove Cloudinary media (${publicId}):`, error);
            return false;
      }
};

module.exports = {
      cloudinary,
      uploadToCloudinary,
      extractPublicIdFromUrl,
      deleteFromCloudinary,
};
