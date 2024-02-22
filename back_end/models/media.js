/**
 * Create media object from database
 */
module.exports = class media {

    constructor (mediaID, ISBN, Quantity, Title, Publisher, PublicationDate) {
        this.mediaID = mediaID;
        this.ISBN = ISBN;
        this.Quantity = Quantity;
        this.Title = Title;
        this.Publisher = Publisher
        this.PublicationDate = PublicationDate;
    }
}

// use this line to import class
// const media = require('./models/media');