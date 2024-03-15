const readline = require('readline');
const reservationController = require('../controllers/reservation_controller');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function reservationTest() {
    rl.question('Enter command (add, update, delete, quit): ', async (answer) => {
        try {
            switch (answer.trim().toLowerCase()) {
                case 'add':
                    const reservationData = {
                        DueDate: '2023-12-31',
                        Time: '15:00',
                        Date: '2023-01-01',
                        IsReturned: 0,
                        Quantity: 1,
                        CustomerID: 10001, 
                        MediaID: 1000001 
                    };
                    const newReservation = await reservationController.insertReservation(reservationData);
                    console.log('Added new reservation:', newReservation);
                    break;
                case 'update':
                    const updateData = {
                        DueDate: '2024-01-31',
                        Time: '16:00',
                        Date: '2024-01-02',
                        IsReturned: 1,
                        Quantity: 2,
                        CustomerID: 10002, 
                        MediaID: 10002 
                    };
                    const reservationID = 100001; 
                    const updateMessage = await reservationController.updateReservation(reservationID, updateData);
                    console.log(updateMessage);
                    break;
                case 'delete':
                    const deleteReservationID = 100002; 
                    const deleteMessage = await reservationController.deleteReservation(deleteReservationID);
                    console.log(deleteMessage);
                    break;
                case 'quit':
                    console.log('Exiting...');
                    rl.close();
                    process.exit(0);
                    return;
                default:
                    console.log('Invalid command.');
                    break;
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
        reservationTest(); 
    });
}

reservationTest();
