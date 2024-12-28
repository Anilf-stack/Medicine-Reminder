import pool from '../config/db.js';

// Fetch acknowledgment logs
export const getLogs = async (req, res) => {
    const { userId, date } = req.query; // Extract userId and date from query params

    try {
        let query = 'SELECT * FROM AcknowledgmentLogs WHERE 1=1'; // Dynamic query building
        const params = [];

        if (userId) {
            query += ' AND user_id = ?';
            params.push(userId);
        }

        if (date) {
            query += ' AND DATE(timestamp) = ?';
            params.push(date);
        }

        const [logs] = await pool.query(query, params);
        res.status(200).json({ logs });
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
};

export const logAcknowledgment = async (req, res) => {
    console.log("Incoming request body:", req.body);
    console.log("User ID from token:", req.user?.userId);

    const { medicine_id, status } = req.body; // Extract from request body
    const userId = req.user?.userId; // Extract authenticated user's ID

    if (!medicine_id) {
        return res.status(400).json({ error: "Medicine ID is required" });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO AcknowledgmentLogs (user_id, medicine_id, status) VALUES (?, ?, ?)',
            [userId, medicine_id, status || 'Acknowledged']
        );
        res.status(201).json({ message: "Acknowledgment logged", logId: result.insertId });
    } catch (error) {
        console.error("Error logging acknowledgment:", error);
        res.status(500).json({ error: "Failed to log acknowledgment" });
    }
};
