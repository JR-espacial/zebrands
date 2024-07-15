
const dotenv = require("dotenv");

dotenv.config();

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

const jwksUri = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;

console.log(jwksUri);

const authMiddleware = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: jwksUri
  }),
  audience: `${process.env.APP_AUDIENCE}`,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

module.exports = authMiddleware;