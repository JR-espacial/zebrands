const express = require('express');
const authMiddleware = require('./middleware/authMiddleware');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const logRoutes = require('./routes/queryLogRoutes');
const cors = require('cors');

const { auth,requiresAuth } = require('express-openid-connect');

const app = express();
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 3000;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'j0pdOIv3FIyLyyPaJPFnVtytaytjEunJ',
  issuerBaseURL: 'https://dev-157l1t2ewxfpwx6j.us.auth0.com'
};


app.use(auth(config));

// Routes
app.use('/products', productRoutes);
app.use('/admins', adminRoutes);
app.use('/queryLogs', logRoutes);


// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});




app.get('/protected', authMiddleware, (req, res) => {
  // Access authenticated user info
  console.log('Authenticated User:', req.auth);
  console.log('Authenticated User:', req.auth.payload);

  // Return protected resource
  res.json({
    message: 'Hello from a protected endpoint! You need to be authenticated to see this.'
  });
});


app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});