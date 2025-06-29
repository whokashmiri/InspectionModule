const cloudinary = require('../utils/cloudinary');

exports.uploadPhoto = async (req, res) => {
  const { base64 } = req.body;
  try {
    const uploadRes = await cloudinary.uploader.upload(base64, {
      folder: 'assets_photos',
    });
    res.json({ url: uploadRes.secure_url });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};
