const jwt = require('jsonwebtoken');

// Middleware to verify if user is logged in and check roles
const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            
            return res.status(401).json({ message: 'Access denied. No active session found' });
        }

        const token = authHeader.split(' ')[1];

        try {
            // Verify token signatures
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Check if user role matches allowed roles for this route
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Forbidden. You do not have permission' });
            }

            next();
        } catch (err) {
            
            res.status(401).json({ message: 'Your session has expired or is invalid' });
        }
    };
};

module.exports = authorize;
