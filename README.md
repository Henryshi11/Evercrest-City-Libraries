# Evercrest-City-Libraries

## Prerequisites
make sure you have Node.js installed on your system. You can visit the [Node.js official website](https://nodejs.org/) for installation instructions.

Install the required dependencies:

 `readline`, `mysql`, and `mysql2` 

## Database Setup

Ensure your MySQL server is running. You will need to create the necessary database and tables by executing SQL scripts in the following order:

1. `library_db.sql` - This script creates the database and its schema.
2. `library_sequence.sql` - This script sets up any necessary sequences for the database.
3. `data_insert.sql` - This script populates the database with initial data.


Configuring the Application
Edit the project's datapool to include your database connection details:

javascript
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'library',
    password: 'password'
});
## Running the Application
node main.js


