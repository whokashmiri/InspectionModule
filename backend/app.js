const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const companyRoutes = require('./routes/companyRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/folders', require('./routes/folderRoutes'));
app.use('/api/assets', require('./routes/assetRoutes'));
app.use('/api/companies', companyRoutes);





app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
