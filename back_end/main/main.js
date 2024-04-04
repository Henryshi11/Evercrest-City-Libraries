const readline = require('readline');
const customer = require('../functions/customer_function');
const media = require('../functions/media_function');
const reservation = require('../functions/reservation_function');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
mainMenu();

function mainMenu() {
    console.log("\nMain Menu:");
    console.log("1. Customer Management");
    console.log("2. Media Management");
    console.log("3. Reservation Management");
    console.log("4. Exit");
    rl.question("Please choose an option: ", function (answer) {
        switch (answer) {
            case '1':
                customer.customerMenu(rl, mainMenu); // Assuming you modify customerMenu similarly
                break;
            case '2':
                media.mediaMenu(rl, mainMenu); // Pass mainMenu here
                break;
            case '3':
                reservation.reservationMenu(rl, mainMenu); // Assuming a similar modification
                break;
            case '4':
                console.log("Thank you for using the system. Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid option, please choose again!");
                mainMenu();
                break;
        }
    });
}




