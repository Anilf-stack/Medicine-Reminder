// Route to fetch acknowledgment logs
router.get('/logs', authenticateAdmin, async (req, res) => {
    const { userId, date } = req.query; // Extract query parameters for filtering logs

    try {
        // Base query to fetch logs, allowing for dynamic filters
        let query = 'SELECT * FROM AcknowledgmentLogs WHERE 1=1';
        const params = []; // Parameters for the query

        if (userId) {
            query += ' AND user_id = ?'; // Add user filter if userId is provided
            params.push(userId);
        }

        if (date) {
            query += ' AND DATE(timestamp) = ?'; // Add date filter if date is provided
            params.push(date);
        }

        // Execute the query with parameters
        const [logs] = await pool.query(query, params);

        // Return the fetched logs
        res.json({ logs });
    } catch (error) {
        // Handle errors and return a 500 status code
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});
