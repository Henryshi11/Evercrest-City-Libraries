const mediaController = require('../controllers/media_controller');


function mediaMenu(rl, mainMenu) {
    console.log("\nMedia Management:");
    console.log("1. Add Media");
    console.log("2. Search Media");
    console.log("3. Delete Media");
    console.log("4. Return to Main Menu");
    rl.question("Please choose an option: ", function(answer) {
        switch (answer) {
            case '1':
                addMedia(rl, mainMenu);
                break;
            case '2':
                searchMedia(rl, mainMenu);
                break;
            case '3':
                deleteMedia(rl, mainMenu);
                break;
            case '4':
                mainMenu();
                break;
            default:
                console.log("Invalid option, please choose again!");
                mediaMenu();
                break;
        }
    });
}

function addMedia(rl, mainMenu) {
    console.log("\n--- Add a new media ---");
    rl.question("Media Type (Book, Audiobook, DVD): ", (mediaType) => {
        rl.question("Title: ", (title) => {
            rl.question("Publisher: ", (publisher) => {
                rl.question("Publication Date (YYYY-MM-DD): ", (publicationDate) => {
                    rl.question("ISBN: ", (isbn) => {
                        rl.question("Quantity: ", (quantity) => {
                            // Additional information based on media type
                            if (mediaType === "Book" || mediaType === "Audiobook") {
                                rl.question("Pages: ", (pages) => {
                                    if (mediaType === "Audiobook") {
                                        rl.question("Duration (in minutes): ", (duration) => {
                                            rl.question("Speaker: ", (speaker) => {
                                                const mediaData = {
                                                    MediaType: mediaType,
                                                    Title: title,
                                                    Publisher: publisher,
                                                    PublicationDate: publicationDate,
                                                    ISBN: isbn,
                                                    Quantity: quantity,
                                                    Pages: pages,
                                                    Duration: duration,
                                                    Speaker: speaker // Specific to Audiobooks
                                                };
                                                mediaController.insertMedia(mediaData);
                                                console.log("media added successfully.");
                                                mediaMenu(rl, mainMenu);
                                            });
                                        });
                                    } else {
                                        // For Books without duration and speaker
                                        const mediaData = {
                                            MediaType: mediaType,
                                            Title: title,
                                            Publisher: publisher,
                                            PublicationDate: publicationDate,
                                            ISBN: isbn,
                                            Quantity: quantity,
                                            Pages: pages
                                        };
                                        mediaController.insertMedia(mediaData);
                                        console.log("media added successfully.");
                                        mediaMenu(rl, mainMenu);
                                    }
                                });
                            } else if (mediaType === "DVD") {
                                rl.question("Duration (in minutes): ", (duration) => {
                                    rl.question("Actor: ", (actor) => {
                                        const mediaData = {
                                            MediaType: mediaType,
                                            Title: title,
                                            Publisher: publisher,
                                            PublicationDate: publicationDate,
                                            ISBN: isbn,
                                            Quantity: quantity,
                                            Duration: duration,
                                            Actor: actor // Specific to DVDs
                                        };
                                        mediaController.insertMedia(mediaData);
                                        console.log("media added successfully.");
                                        mediaMenu(rl, mainMenu);
                                    });
                                });
                            } else {
                                console.log("Invalid media type entered.");
                                mediaMenu(rl, mainMenu);
                            }
                        });
                    });
                });
            });
        });
    });
}

function searchMedia(rl, mainMenu) {
    console.log("\n--- Search for media ---");
    rl.question("Enter search keyword (title, type, publisher): ", (keyword) => {
        mediaController.searchMediaByTitleOrISBN(keyword)
            .then((mediaItems) => {
                if (mediaItems.length === 0) {
                    console.log("No media found with the given keyword.");
                } else {
                    console.log("Search Results:");
                    mediaItems.forEach((item) => {
                        console.log(`Media ID: ${item.MediaID}`);
                        console.log(`Type: ${item.MediaType}`);
                        console.log(`Title: ${item.Title}`);
                        console.log(`Publisher: ${item.Publisher}`);
                        console.log(`Publication Date: ${item.PublicationDate}`);
                        console.log(`ISBN: ${item.ISBN}`);
                        console.log(`Quantity: ${item.Quantity}`);
                        if (item.Pages) {
                            console.log(`Pages: ${item.Pages}`);
                        }
                        if (item.Duration) {
                            console.log(`Duration: ${item.Duration} minutes`);
                        }
                        if (item.MediaType === 'Audiobook') {
                            console.log(`Speaker: ${item.Speaker}`);
                        } else if (item.MediaType === 'DVD') {
                            console.log(`Actor: ${item.Actor}`);
                        }
                        console.log('-----------------------------------');
                    });
                }
                mediaMenu(rl, mainMenu);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
                mediaMenu(rl, mainMenu);
            });
    });
}

function deleteMedia(rl, mainMenu) {
    console.log("\n--- Delete a media ---");
    rl.question("Enter the Media ID to delete: ", (mediaId) => {
        mediaController.deleteMedia(mediaId)
            .then(() => {
                console.log("Media deleted successfully.");
                mediaMenu(rl, mainMenu);
            })
            .catch((error) => {
                console.error("An error occurred while trying to delete the media:", error);
                mediaMenu(rl, mainMenu);
            });
    });
}


module.exports = {
    mediaMenu,
  };