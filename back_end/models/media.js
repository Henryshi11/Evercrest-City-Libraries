// media.js

class Media {
    constructor(mediaID, ISBN, Quantity, Title, Publisher, PublicationDate) {
        this.mediaID = mediaID;
        this.ISBN = ISBN;
        this.Quantity = Quantity;
        this.Title = Title;
        this.Publisher = Publisher;
        this.PublicationDate = PublicationDate;
    }
}

class Author {
    constructor(authorID, authorName) {
        this.authorID = authorID;
        this.authorName = authorName;
    }
}

class MediaAuthor {
    constructor(mediaID, authorID) {
        this.mediaID = mediaID;
        this.authorID = authorID;
    }
}

class Speaker {
    constructor(speakerID, speakerName) {
        this.speakerID = speakerID;
        this.speakerName = speakerName;
    }
}

class MediaSpeaker {
    constructor(mediaID, speakerID) {
        this.mediaID = mediaID;
        this.speakerID = speakerID;
    }
}

class Actor {
    constructor(actorID, actorName) {
        this.actorID = actorID;
        this.actorName = actorName;
    }
}

class MediaActor {
    constructor(mediaID, actorID) {
        this.mediaID = mediaID;
        this.actorID = actorID;
    }
}


// Export all classes as an object
module.exports = {
    Media,
    Author,
    MediaAuthor,
    Speaker,
    MediaSpeaker,
    Actor,
    MediaActor,
};

