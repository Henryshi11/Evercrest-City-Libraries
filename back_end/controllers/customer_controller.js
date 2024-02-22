const pool = require('../connection/datapool'); 

const customer_controller = {
    // Insert a new customer
    insertCustomer: async function(customerData) {
        try {
            const [rows] = await pool.query(
                'INSERT INTO Customer (FirstName, Surname, PhoneNo, Email, StreetNumber, Street, ZIPcode, DOB) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [customerData.FirstName, customerData.Surname, customerData.PhoneNo, customerData.Email, customerData.StreetNumber, customerData.Street, customerData.ZIPcode, customerData.DOB]
            );

            const newCustomer = new Customer(rows.insertId, ...Object.values(customerData));
            return newCustomer;
        } catch (error) {
            throw error;
        }
    },

    // Update an existing customer
    updateCustomer: async function(customerID, customerData) {
        try {
            const [rows] = await pool.query(
                'UPDATE Customer SET FirstName=?, Surname=?, PhoneNo=?, Email=?, StreetNumber=?, Street=?, ZIPcode=?, DOB=? WHERE CustomerID=?',
                [...Object.values(customerData), customerID]
            );
            return `Customer ${customerID} updated successfully. Affected rows: ${rows.affectedRows}`;
        } catch (error) {
            throw error;
        }
    },

    // Delete a customer
    deleteCustomer: async function(customerID) {
        try {
            const [rows] = await pool.query(
                'DELETE FROM Customer WHERE CustomerID = ?',
                [customerID]
            );
            return `Customer ${customerID} deleted successfully. Affected rows: ${rows.affectedRows}`;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = customer_controller;
