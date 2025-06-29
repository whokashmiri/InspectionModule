const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createFolder, getFoldersByProject } = require('../controllers/folderController');

const router = express.Router();

router.post('/', protect, createFolder);
router.get('/project/:projectId', protect, getFoldersByProject);

module.exports = router;
