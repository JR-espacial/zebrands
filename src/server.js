const express = require('express');
const middleware = require('./middleware/auth');

const app = express();




const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.get('/protected', middleware.auth, (req, res) => {
//   res.send('This is a protected route');
// });



app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});