const express = require('express');
const middleware = require('./middleware/auth');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const logRoutes = require('./routes/queryLogRoutes');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

app.use(cors());




const PORT = process.env.PORT || 3000;

// Routes
app.use('/products', productRoutes);
app.use('/admins', adminRoutes);
app.use('/queryLogs', logRoutes);


app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.get('/protected', middleware.auth, (req, res) => {
//   res.send('This is a protected route');
// });



app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});