import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Middleware to authenticate users
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) return res.status(401).json({ error: 'Unauthorized' }); // Return 401 if no token is found

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
        req.user = decoded; // Attach decoded token payload to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(403).json({ error: 'Forbidden' }); // Return 403 if the token is invalid or expired
    }
};

// Export the middleware
export default authenticate;
