const pool = require('../connection/datapool'); // Make sure this path is correct

// Function to insert a customer, using the existing data pool
async function insertCustomer(customerData) {
    try {
        const sql = 'INSERT INTO Customer (FirstName, Surname, PhoneNo, Email, StreetNumber, Street, ZIPcode, DOB) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [rows] = await pool.query(sql, customerData);
        console.log('Customer inserted successfully:', rows);
    } catch (error) {
        console.error('Error inserting customer:', error);
    }
}

// Example customer data
const exampleCustomerData = [
    'BBBB', // FirstName
    'Doe', // Surname
    '1234567890', // PhoneNo
    'BBBBB.doe@example.com', // Email
    '123', // StreetNumber
    'Main St', // Street
    'T3K3P3', // ZIPcode
    '1980-01-01' // DOB
];

insertCustomer(exampleCustomerData).then(() => {
    console.log('Insert completed.');
}).catch(err => {
    console.error('Error during insert operation:', err);
});
