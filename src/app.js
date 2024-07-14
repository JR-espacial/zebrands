const express = require('express');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const logRoutes = require('./routes/queryLogRoutes');
const cors = require('cors');

const { auth,requiresAuth } = require('express-openid-connect');

const config = require('./utils/authConfig');

const app = express();
app.use(express.json());

app.use(cors());


app.use(auth(config));

// Routes
app.use('/products', productRoutes);
app.use('/admins', adminRoutes);
app.use('/queryLogs', logRoutes);


// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  const isAutheticated = req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'

  res.status(200).json({
    status: 'success',
    data: isAutheticated,
    message: isAutheticated
  });

});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = app;