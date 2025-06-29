const Folder = require('../models/Folder');

exports.createFolder = async (req, res) => {
  try {
    const { name, projectId, parentFolderId } = req.body;

    // ✅ Create the folder
    const folder = await Folder.create({
      name,
      projectId,
      parentFolderId: parentFolderId || null,
      company: req.user.company,
    });

    // ✅ Update project: touch updatedAt so it's considered "recent"
    await Project.findByIdAndUpdate(projectId, {
      updatedAt: new Date(),
    });

    res.status(201).json(folder);
  } catch (err) {
    console.error('Folder creation error:', err);
    res.status(500).json({ message: 'Server error creating folder' });
  }
};

exports.getFoldersByProject = async (req, res) => {
  const { projectId } = req.params;

  const folders = await Folder.find({
    projectId,
    company: req.user.company,
  });

  res.json(folders);
};
