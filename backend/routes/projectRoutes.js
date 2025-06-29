const express = require('express');
const {
  createProject,
  getUserProjects,
  getProjectsForCompany,
  deleteProject,
  markProjectFavorite,
  markProjectDone,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Get all projects for logged-in user
router.get('/', protect, getUserProjects);

// ✅ Get all projects for a specific company (admin use)
// router.get('/company/:companyId', protect, getProjectsForCompany);
router.get('/company/:companyId', protect, getProjectsForCompany);


// ✅ Create new project (with assigned users)
router.post('/', protect, createProject);

// ✅ Mark project as favorite
router.patch('/:projectId/favorite', protect, markProjectFavorite);

// ✅ Mark project as done
router.patch('/:projectId/done', protect, markProjectDone);

// ✅ Delete project
router.delete('/:projectId', protect, deleteProject);

module.exports = router;
