const Asset = require('../models/Asset');

exports.createAsset = async (req, res) => {
  const {
    name,
    folderId,
    projectId,
    photos,
    textDescription,
    voiceToText,
  } = req.body;

  const asset = await Asset.create({
    name,
    folderId,
    projectId,
    company: req.user.company,
    photos,
    textDescription,
    voiceToText,
    createdBy: req.user._id,
  });

  res.status(201).json(asset);
};

exports.getAssetsByFolder = async (req, res) => {
  const { folderId } = req.params;

  const assets = await Asset.find({
    folderId,
    company: req.user.company,
  });

  res.json(assets);
};

exports.syncOfflineAssets = async (req, res) => {
  const { assets } = req.body;

  if (!Array.isArray(assets)) return res.status(400).json({ message: 'Invalid data' });

  const results = [];

  for (let item of assets) {
    const created = await Asset.create({
      ...item,
      company: req.user.company,
      createdBy: req.user._id,
    });
    results.push(created);
  }

  res.status(201).json({ message: 'Synced', assets: results });
};
