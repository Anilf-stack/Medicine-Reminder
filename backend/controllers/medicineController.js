import pool from '../config/db.js';

// Add Medicine
export const addMedicine = async (req, res) => {
    const { name, dosage, schedule_time } = req.body;
    const userId = req.user.userId;
    try {
        const [result] = await pool.query(
            'INSERT INTO Medicine (user_id, name, dosage, schedule_time) VALUES (?, ?, ?, ?)',
            [userId, name, dosage, schedule_time]
        );
        res.status(201).json({ message: 'Medicine added successfully', medicineId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add medicine' });
    }
};

// Get Medicines
export const getMedicines = async (req, res) => {
    const userId = req.user.userId; // Extract user ID from authenticated request
    try {
        const [medicines] = await pool.query(
            'SELECT id, name, dosage, schedule_time FROM Medicine WHERE user_id = ?',
            [userId]
        );

        if (medicines.length === 0) {
            return res.status(404).json({ message: 'No medicines found for the user' });
        }

        res.status(200).json(medicines);
    } catch (error) {
        console.error('Error fetching medicines:', error);
        res.status(500).json({ error: 'Failed to fetch medicines' });
    }
};

// Update Medicine
export const updateMedicine = async (req, res) => {
    const { name, dosage, schedule_time } = req.body;
    const userId = req.user.userId;
    const medicineId = req.params.id; // Extract medicine ID from the URL parameter

    try {
        // Update the medicine details
        const [result] = await pool.query(
            'UPDATE Medicine SET name = ?, dosage = ?, schedule_time = ? WHERE id = ? AND user_id = ?',
            [name, dosage, schedule_time, medicineId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Medicine not found or unauthorized action' });
        }

        res.status(200).json({ message: 'Medicine updated successfully' });
    } catch (error) {
        console.error('Error updating medicine:', error);
        res.status(500).json({ error: 'Failed to update medicine' });
    }
};

// Delete Medicine
export const deleteMedicine = async (req, res) => {
    const medicineId = req.params.id; // Extract medicine ID from the URL parameter
    const userId = req.user.userId;

    try {
        // Delete the medicine by its ID and user ID
        const [result] = await pool.query(
            'DELETE FROM Medicine WHERE id = ? AND user_id = ?',
            [medicineId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Medicine not found or unauthorized action' });
        }

        res.status(200).json({ message: 'Medicine deleted successfully' });
    } catch (error) {
        console.error('Error deleting medicine:', error);
        res.status(500).json({ error: 'Failed to delete medicine' });
    }
};
