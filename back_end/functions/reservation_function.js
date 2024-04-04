const reservationController = require('../controllers/reservation_controller');


function reservationMenu(rl, mainMenu) {
    console.log("\nReservation Management:");
    console.log("1. Add Reservation");
    console.log("2. Search Reservations");
    console.log("3. Delete Reservation");
    console.log("4. Return to Main Menu");
    rl.question("Please choose an option: ", function(answer) {
        switch (answer) {
            case '1':
                addReservation(rl, mainMenu);
                break;
            case '2':
                searchReservations(rl, mainMenu);
                break;
            case '3':
                deleteReservation(rl, mainMenu);
                break;
            case '4':
                mainMenu();
                break;
            default:
                console.log("Invalid option, please choose again!");
                reservationMenu(rl, mainMenu);
                break;
        }
    });
}


function addReservation(rl, mainMenu) {
    console.log("\n--- Add a new reservation ---");
    rl.question("Due Date (YYYY-MM-DD): ", (dueDate) => {
        rl.question("Time (HH:MM): ", (time) => {
            rl.question("Date of Reservation (YYYY-MM-DD): ", (date) => {
                rl.question("Quantity: ", (quantity) => {
                    rl.question("Customer ID: ", (customerId) => {
                        rl.question("Media ID: ", (mediaId) => {
                            const reservationData = {
                                DueDate: dueDate,
                                Time: time,
                                Date: date,
                                Quantity: parseInt(quantity, 10),
                                CustomerID: customerId,
                                MediaID: mediaId
                            };
                            reservationController.insertReservation(reservationData)
                                .then(() => {
                                    console.log("Reservation added successfully.");
                                    reservationMenu(rl, mainMenu);
                                })
                                .catch((error) => {
                                    console.error("An error occurred:", error);
                                    reservationMenu(rl, mainMenu);
                                });
                        });
                    });
                });
            });
        });
    });
}


function searchReservations(rl, mainMenu) {
    console.log("\n--- Search for reservations ---");
    rl.question("Enter Customer ID (or leave blank to skip): ", (customerID) => {
        rl.question("Enter Media ID (or leave blank to skip): ", (mediaID) => {
            //at least one search criterion have to be provided
            if (!customerID && !mediaID) {
                console.log("Please enter at least one search criterion.");
                searchReservations(rl, mainMenu);
                return;
            }

            const searchCriteria = {};
            if (customerID) searchCriteria.customerID = customerID;
            if (mediaID) searchCriteria.mediaID = mediaID;

            reservationController.searchReservations(searchCriteria)
                .then((reservations) => {
                    if (reservations.length === 0) {
                        console.log("No reservations found with the given criteria.");
                    } else {
                        console.log("Search Results:");
                        reservations.forEach((reservation) => {
                            console.log(`Reservation ID: ${reservation.ReservationID}`);
                            console.log(`Due Date: ${reservation.DueDate}`);
                            console.log(`Time: ${reservation.Time}`);
                            console.log(`Date of Reservation: ${reservation.Date}`);
                            console.log(`Quantity: ${reservation.Quantity}`);
                            console.log(`Customer ID: ${reservation.CustomerID}`);
                            console.log(`Media ID: ${reservation.MediaID}`);
                            console.log(`Is Returned: ${reservation.IsReturned ? 'Yes' : 'No'}`);
                            console.log('-----------------------------------');
                        });
                    }
                    reservationMenu(rl, mainMenu);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                    reservationMenu(rl, mainMenu);
                });
        });
    });
}

function deleteReservation(rl, mainMenu) {
    console.log("\n--- Delete a reservation ---");
    rl.question("Enter the Reservation ID to delete: ", (reservationId) => {
        if (!reservationId) {
            console.log("Reservation ID is required.");
            deleteReservation(rl, mainMenu);
            return;
        }

        reservationController.deleteReservation(reservationId)
            .then(() => {
                console.log("Reservation deleted successfully.");
                reservationMenu(rl, mainMenu);
            })
            .catch((error) => {
                console.error("An error occurred while trying to delete the reservation:", error);
                reservationMenu(rl, mainMenu);
            });
    });
}

module.exports = {
    reservationMenu,
  };

