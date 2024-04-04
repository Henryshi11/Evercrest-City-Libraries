const pool = require('../connection/datapool');

const reservation_controller = {
    // Insert a new reservation
    insertReservation: async function (reservationData) {
        try {
            const [rows] = await pool.query(
                'INSERT INTO Reservation (DueDate, Time, Date, IsReturned, Quantity, CustomerID, MediaID) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [reservationData.DueDate, reservationData.Time, reservationData.Date, 0, reservationData.Quantity, reservationData.CustomerID, reservationData.MediaID]
            );

        } catch (error) {
            throw error;
        }
    },


    // Search reservations by customerID or mediaID
    searchReservations: async function ({ customerID, mediaID }) {
        try {
            let query = 'SELECT * FROM Reservation WHERE ';
            let queryParams = [];

            if (customerID) {
                query += 'CustomerID = ?';
                queryParams.push(customerID);
            }
            if (mediaID) {
                if (queryParams.length) query += ' AND ';
                query += 'MediaID = ?';
                queryParams.push(mediaID);
            }

            const [rows] = await pool.query(query, queryParams);
            return rows;
        } catch (error) {
            throw error;
        }
    },
    
    // Update an existing reservation
    updateReservation: async function (reservationID, reservationData) {
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
    deleteReservation: async function (reservationID) {
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
