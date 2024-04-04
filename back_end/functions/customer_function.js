const customerController = require('../controllers/customer_controller');


function customerMenu(rl, mainMenu) {
    console.log("\nCustomer Management:");
    console.log("1. Add Customer");
    console.log("2. Update Customer Information");
    console.log("3. Search Customer");
    console.log("4. Delete Customer");
    console.log("5. Return to Main Menu");
    rl.question("Please choose an option: ", function (answer) {
        switch (answer) {
            case '1':
                addCustomer(rl, mainMenu);
                break;
            case '2':
                updateCustomer(rl, mainMenu);
                break;
            case '3':
                searchCustomer(rl, mainMenu);
                break;
            case '4':
                deleteCustomer(rl, mainMenu);
                break;
            case '5':
                mainMenu(rl, mainMenu);
                break;
            default:
                console.log("Invalid option, please choose again!");
                customerMenu();
                break;
        }
    });
}



function addCustomer(rl, mainMenu) {
    console.log("\n--- Add a new customer ---");
    // Collect customer details
    rl.question("First Name: ", (firstName) => {
        rl.question("Surname: ", (surname) => {
            rl.question("Phone Number: ", (phoneNo) => {
                rl.question("Email: ", (email) => {
                    rl.question("Street Number: ", (streetNumber) => {
                        rl.question("Street: ", (street) => {
                            rl.question("ZIP Code: ", (zipCode) => {
                                rl.question("Date of Birth (YYYY-MM-DD): ", (dob) => {
                                    const customerData = {
                                        FirstName: firstName,
                                        Surname: surname,
                                        PhoneNo: phoneNo,
                                        Email: email,
                                        StreetNumber: streetNumber,
                                        Street: street,
                                        ZIPcode: zipCode,
                                        DOB: dob
                                    };
                                    customerController.insertCustomer(customerData)
                                        .then(() => {
                                            console.log("Customer added successfully.");
                                            customerMenu(rl, mainMenu);
                                        })
                                        .catch((error) => {
                                            console.error("An error occurred:", error);
                                            customerMenu(rl, mainMenu);
                                        });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function updateCustomer(rl, mainMenu) {
    console.log("\n--- Update a customer ---");
    rl.question("Customer ID: ", (customerId) => {
        console.log("Enter new details for the customer (leave blank to keep current value):");

        rl.question("New First Name: ", (firstName) => {
            rl.question("New Surname: ", (surname) => {
                rl.question("New Phone Number: ", (phoneNo) => {
                    rl.question("New Email: ", (email) => {
                        rl.question("New Street Number: ", (streetNumber) => {
                            rl.question("New Street: ", (street) => {
                                rl.question("New ZIP Code: ", (zipCode) => {
                                    rl.question("New Date of Birth (YYYY-MM-DD): ", (dob) => {
                                        const customerData = {
                                            FirstName: firstName,
                                            Surname: surname,
                                            PhoneNo: phoneNo,
                                            Email: email,
                                            StreetNumber: streetNumber,
                                            Street: street,
                                            ZIPcode: zipCode,
                                            DOB: dob
                                        };
                                        // Clean up empty entries
                                        Object.keys(customerData).forEach(key => customerData[key] === '' && delete customerData[key]);
                                        
                                        customerController.updateCustomer(customerId, customerData)
                                            .then(() => {
                                                console.log("Customer updated successfully.");
                                                customerMenu(rl, mainMenu);
                                            })
                                            .catch((error) => {
                                                console.error("An error occurred:", error);
                                                customerMenu(rl, mainMenu);
                                            });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function searchCustomer(rl, mainMenu) {
    console.log("\n--- Search for a customer ---");
    rl.question("Enter search keyword (name): ", (keyword) => {
        customerController.searchCustomerByName(keyword)
            .then((customers) => {
                if (customers.length === 0) {
                    console.log("No customers found with the given keyword.");
                } else {
                    console.log("Search Results:");
                    customers.forEach((customer) => {
                        console.log(`Customer ID: ${customer.CustomerID}`);
                        console.log(`Name: ${customer.FirstName} ${customer.Surname}`);
                        console.log(`Phone Number: ${customer.PhoneNo}`);
                        console.log(`Email: ${customer.Email}`);
                        console.log(`Address: ${customer.StreetNumber} ${customer.Street}, ZIP: ${customer.ZIPcode}`);
                        console.log(`Date of Birth: ${customer.DOB}`);
                        console.log('-----------------------------------');
                    });
                }
                customerMenu(rl, mainMenu);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
                customerMenu();
            });
    });
}

function deleteCustomer(rl, mainMenu) {
    console.log("\n--- Delete a customer ---");
    rl.question("Customer ID to delete: ", (customerId) => {
        customerController.deleteCustomer(customerId)
            .then(() => {
                console.log("Customer deleted successfully.");
                customerMenu(rl, mainMenu);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
                customerMenu(rl, mainMenu);
            });
    });
}

module.exports = {
    customerMenu,
  };