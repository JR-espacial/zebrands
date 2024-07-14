

// Middleware function to check authentication status
function authMiddleware(req, res, next) {
    // Check if the user is authenticated
    if (!req.oidc.isAuthenticated()) {
        return res.status(401).json({
            status: 'error',
            data: null,
            message: 'Unauthorized request go to /login'
        });
    }
    // If authenticated, proceed to the next middleware or route handler
    next();
}

module.exports = authMiddleware;