// authMiddleware.js

const dotenv = require("dotenv");
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

dotenv.config();

const jwksUri = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;

const authMiddleware = (requireAuth = true) => {
  return (req, res, next) => {
    jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: jwksUri
      }),
      audience: `${process.env.APP_AUDIENCE}`,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256']
    })(req, res, (err) => {
      if (err && requireAuth) {
        
        return res.status(401).send('Unauthorized', err);
      }

      if (err && !requireAuth) {
        req.authenticated = false;
        
      } else {
        req.authenticated = true;
      }
      
      next();
    });
  };
};

module.exports = authMiddleware;
