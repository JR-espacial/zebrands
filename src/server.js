const express = require('express');
const authMiddleware = require('./middleware/authMiddleware');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const logRoutes = require('./routes/queryLogRoutes');
const cors = require('cors');



const app = express();
app.use(express.json());

app.use(cors());




const PORT = process.env.PORT || 3000;

// Routes
app.use('/products', productRoutes);
app.use('/admins', adminRoutes);
app.use('/queryLogs', logRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the API');

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