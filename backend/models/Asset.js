// Asset.js
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  company: { type: String, ref:"Company", required: true },

  photos: [String], // Cloudinary URLs
  textDescription: String,
  voiceToText: String, // Transcription of voice
  voiceNoteUrl: String, // ✅ Cloudinary voice file URL

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
