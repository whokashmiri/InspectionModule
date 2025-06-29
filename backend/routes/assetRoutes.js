const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createAsset, getAssetsByFolder } = require('../controllers/assetController');
const { syncOfflineAssets } = require('../controllers/assetController');

const router = express.Router();

router.post('/', protect, createAsset);
router.get('/folder/:folderId', protect, getAssetsByFolder);
router.post('/sync', protect, syncOfflineAssets);


module.exports = router;
