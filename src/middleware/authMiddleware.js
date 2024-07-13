// middleware/authMiddleware.js

const { auth } = require('express-oauth2-jwt-bearer');
const dotenv = require('dotenv');

//env variables

dotenv.config();

const domain = process.env.AUTH0_DOMAIN; 


const jwtCheck = auth({
  audience: `${process.env.AUTH0_AUDIENCE}`|| 'https://api.example.com',
  issuerBaseURL: `${process.env.AUTH0_DOMAIN}` || 'https://example.auth0.com',
  tokenSigningAlg: 'RS256'
});

module.exports = jwtCheck;
