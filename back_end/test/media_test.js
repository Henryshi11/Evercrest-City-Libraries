const readline = require('readline');
const mediaController = require('../controllers/media_controller');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mediaTest() {
    rl.question('Enter command (add, update, delete, quit): ', async (answer) => {
        try {
            switch (answer.trim().toLowerCase()) {
                case 'add':
                    const mediaData = {
                        ISBN: '7894540',
                        Quantity: 5,
                        Title: 'Example Title',
                        Publisher: 'Example Publisher',
                        PublicationDate: '2020-01-01',
                        MediaType: 'Book', // Or 'Audiobook', 'DVD'
                        Pages: 300, // Only for books
                        Duration: null, // Only for audiobooks and DVDs
                        Author: 'Test', // Only for books and audiobooks
                        Speaker: null, // Only for audiobooks
                        Actor: null // Only for DVDs
                    };
                    const newMedia = await mediaController.insertMedia(mediaData);
                    console.log('Added new media:', newMedia);
                    break;
                case 'update':
                    const updateData = {
                        ISBN: '0987654321',
                        Quantity: 3,
                        Title: 'Updated Title',
                        Publisher: 'Updated Publisher',
                        PublicationDate: '2021-02-02',
                        MediaType: 'DVD',
                        Pages: null, // Not applicable for DVDs
                        Duration: 90,
                        Actor: 'Updated Actor Name'
                    };
                    const mediaID = 1000001; 
                    const updateMessage = await mediaController.updateMedia(mediaID, updateData);
                    console.log(updateMessage);
                    break;
                case 'delete':
                    const deleteMediaID = 1000007; 
                    const deleteMessage = await mediaController.deleteMedia(deleteMediaID);

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
        mediaTest(); 
    });
}

mediaTest();
