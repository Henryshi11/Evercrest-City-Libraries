const pool = require('../connection/datapool'); 

const reservation_controller = {
    // Insert a new reservation
    insertReservation: async function(reservationData) {
        try {
            const [rows] = await pool.query(
                'INSERT INTO Reservation (DueDate, Time, Date, IsReturned, Quantity, CustomerID, MediaID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [reservationData.DueDate, reservationData.Time, reservationData.Date, 0, reservationData.Quantity, reservationData.CustomerID, reservationData.MediaID]
            );

            const newReservation = new Reservation(rows.insertId, ...Object.values(reservationData));
            return newReservation;
        } catch (error) {
            throw error;
        }
    },

    // Update an existing reservation
    updateReservation: async function(reservationID, reservationData) {
        try {
            const [rows] = await pool.query(
                'UPDATE Reservation SET DueDate=?, Time=?, Date=?, IsReturned=?, Quantity=?, CustomerID=?, MediaID=? WHERE ReservationID=?',
                [...Object.values(reservationData), reservationID]
            );
            return `Reservation ${reservationID} updated successfully. Affected rows: ${rows.affectedRows}`;
        } catch (error) {
            throw error;
        }
    },

    // Delete a reservation
    deleteReservation: async function(reservationID) {
        try {
            const [rows] = await pool.query(
                'DELETE FROM Reservation WHERE ReservationID = ?',
                [reservationID]
            );
            return `Reservation ${reservationID} deleted successfully. Affected rows: ${rows.affectedRows}`;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = reservation_controller;
