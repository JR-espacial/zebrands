const express = require('express');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const logRoutes = require('./routes/queryLogRoutes');
const cors = require('cors');
const userService = require('./services/userService');

const app = express();
app.use(express.json());

app.use(cors());

// Routes
app.use('/products', productRoutes);
app.use('/admins', adminRoutes);
app.use('/queryLogs', logRoutes);


// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.post('/getToken', async (req, res) => {
  const token = await userService.getApiToken(`${process.env.APP_AUDIENCE}`);

  if(!token) {
    return res.status(500).send('Unable to acquire token');
  }

  // Return the Bearer token
  res.status(200).send({
    status: 'success',
    data: token,
    message: 'Token obtained successfully.'
  });
});

module.exports = app;