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

module.exports = class author {

    constructor (authorID) {
        this.authorID = authorID;
    }
}

module.exports = class media_author {

    constructor (mediaID, authorID) {
        this.mediaID = mediaID;
        this.authorID = authorID;
    }
}

module.exports = class speaker {

    constructor (speakerID) {
        this.speakerID = speakerID;
    }
}

module.exports = class media_speaker {

    constructor (mediaID, speakerID) {
        this.mediaID = mediaID;
        this.speakerID = speakerID;
    }
}

module.exports = class actor {

    constructor (actorID) {
        this.actorID = actorID;
    }
}

module.exports = class media_actor {

    constructor (mediaID, actorID) {
        this.mediaID = mediaID;
        this.actorID = actorID;
    }
}

module.exports = class subtitleoption {

    constructor (subtitleoptionID) {
        this.subtitleoptionID = subtitleoptionID;
    }
}

module.exports = class media_subtitleoption {

    constructor (mediaID, subtitleoptionID) {
        this.mediaID = mediaID;
        this.subtitleoptionID = subtitleoptionID;
    }
}

// use this line to import class
// const media = require('./models/media');