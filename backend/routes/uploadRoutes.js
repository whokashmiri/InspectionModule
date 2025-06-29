const express = require('express');
const { uploadPhoto } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/photo', protect, uploadPhoto);

module.exports = router;
