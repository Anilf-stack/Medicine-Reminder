import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import medicineRoutes from './routes/medicine.js';
import logRoutes from './routes/logs.js';

// Configure environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/medicine', medicineRoutes);
app.use('/logs', logRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
