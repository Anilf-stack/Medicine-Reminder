import bcrypt from 'bcrypt'; // For hashing and comparing passwords
import jwt from 'jsonwebtoken'; // For generating JWT tokens
import pool from '../config/db.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Register a new user
export const register = async (req, res) => {
    const { name, email, password, role } = req.body; // Extract user data from the request body

    console.log(req.body); // Debugging: Log incoming request body

    try {
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user data into the database
        const [result] = await pool.query(
            'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role || 'patient'] // Default role is 'patient'
        );

        // Respond with a success message and the newly created user's ID
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' }); // Handle errors
    }
};

// User login
export const login = async (req, res) => {
    const { email, password } = req.body; // Extract login data from the request body

    try {
        // Query the database for the user by email
        const [users] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
        const user = users[0]; // Extract the first user from the result

        // Check if the user exists and the password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' }); // Return 401 if invalid
        }

        // Generate a JWT token for the user
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Respond with the token and user details
        res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login user' }); // Handle errors
    }
};
