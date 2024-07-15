const express = require('express');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const logRoutes = require('./routes/queryLogRoutes');
const cors = require('cors');

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

module.exports = app;