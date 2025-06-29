// Folder.js

const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  parentFolderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }, // ✅ fixed
}, { timestamps: true });

module.exports = mongoose.model('Folder', folderSchema);
