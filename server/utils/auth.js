const jwt = require('jsonwebtoken');

const authMiddleware = ({ req }) => {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If the token exists, verify it
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim(); // Remove "Bearer" from the string
    }

    if (!token) {
        return { user: null };
    }

    try {
        // Decode and verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { user: decoded };
    } catch (err) {
        console.error('Invalid token:', err);
        return { user: null };
    }
};

module.exports = { authMiddleware };