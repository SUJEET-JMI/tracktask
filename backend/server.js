const express = require('express');
const cors = require('cors');
const { syncModels } = require('./models');
const config = require('./config/config');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const start = async () => {
  try {
    await syncModels();
    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

start();
