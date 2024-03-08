const readline = require('readline');
const customerController = require('../controllers/customer_controller'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askQuestion() {
    rl.question('Enter command (add, update, delete, quit): ', async (answer) => {
      try {
        switch(answer.trim().toLowerCase()) {
          case 'add':
            const customerData = { FirstName: 'Jpp', Surname: 'dfgfd', PhoneNo: '123456789', Email: 'sdgdtdt@gmail.com', StreetNumber: '123', Street: 'Main St', ZIPcode: 'T4K4P4', DOB: '1990-01-01' };
            const newCustomer = await customerController.insertCustomer(customerData);
            console.log('Added new customer:', newCustomer);
            break;
          case 'update':
            const updateData = { FirstName: 'fdgdfg', Surname: 'dfgdfgf', PhoneNo: '987654321', Email: 'setsete@gmail.com', StreetNumber: '321', Street: 'Second St', ZIPcode: 'T4K4P8', DOB: '1991-02-02' };
            const customerID = 1;
            const updateMessage = await customerController.updateCustomer(customerID, updateData);
            console.log(updateMessage);
            break;
          case 'delete':
            const deleteCustomerID = 2;
            const deleteMessage = await customerController.deleteCustomer(deleteCustomerID);
            console.log(deleteMessage);
            break;
          case 'quit':
            console.log('Exiting...');
            rl.close();
            return;
          default:
            console.log('Invalid command.');
            break;
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
      askQuestion(); 
    });
  }
  
  askQuestion();
  