const Company = require('../models/Company');
const User = require('../models/User');
const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { name, assignedUsers } = req.body;


    const project = await Project.create({
      name,
      company: req.user.company,
      createdBy: req.user._id,
      assignedUsers: assignedUsers,
    });

    res.status(201).json({ project });
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ message: 'Server error during project creation' });
  }
};


exports.getProjectsForCompany = async (req, res) => {
  try {
    const userId = req.user.id;
    const companyId = req.user.company;

    const [projects, user, company] = await Promise.all([
      Project.find({ company: companyId }).populate('createdBy', 'fullName'),
      User.findById(userId),
      Company.findById(companyId),
    ]);

    if (!user || !company) {
      return res.status(404).json({ message: 'User or Company not found' });
    }

    const role = user.roles.includes('admin') ? 'admin' : user.roles[0] || 'viewer';

    res.json({
      projects,
      company: company.name,
      role,
    });
  } catch (err) {
    console.error('Get projects error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getUserProjects = async (req, res) => {
  const projects = await Project.find({
    assignedUsers: req.user._id,
    company: req.user.company,
  });

  res.json(projects);
};


// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    await Project.findByIdAndDelete(projectId);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ message: 'Server error during deletion' });
  }
};

// Mark a project as favorite
exports.markProjectFavorite = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    project.isFavorite = !project.isFavorite;
    await project.save();

    res.json({ message: 'Project favorite status updated', project });
  } catch (err) {
    console.error('Error updating favorite status:', err);
    res.status(500).json({ message: 'Server error updating favorite status' });
  }
};

// Mark a project as done
exports.markProjectDone = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    project.isDone = true;
    project.doneAt = new Date();
    await project.save();

    res.json({ message: 'Project marked as done', project });
  } catch (err) {
    console.error('Error marking project done:', err);
    res.status(500).json({ message: 'Server error marking done' });
  }
};