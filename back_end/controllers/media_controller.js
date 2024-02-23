const pool = require('../connection/datapool'); 

const media_controller = {
    // Insert a new media
    insertMedia: async function(mediaData) {
        try {
            // Insert into Media table
            const [rows] = await pool.query(
                'INSERT INTO Media (ISBN, Quantity, Title, Publisher, PublicationDate, MediaType, Pages, Duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [mediaData.ISBN, mediaData.Quantity, mediaData.Title, mediaData.Publisher, mediaData.PublicationDate, mediaData.MediaType, mediaData.Pages, mediaData.Duration]
            );

            const newMedia = new Media(rows.insertId, ...Object.values(mediaData));
            
            //Insert into Media_Authors
            if (mediaData.mediaType == "Book" || mediaData.mediaType == "Audiobook") {
            const [booksRows] = await pool.query(
                'INSERT INTO Media_Books (MediaID, Author) VALUES (?, ?)',
                [newMedia.id, mediaData.Author]
            );
            //Insert into Media_Speakers
            if (mediaData.mediaType == "Audiobook") {
                const [mediabooksRows] = await pool.query(
                    'INSERT INTO Media_Audiobooks (MediaID, Speaker) VALUES (?, ?)',
                    [newMedia.id, mediaData.Speaker]
                );
                //Detecting Duplicate Speaker
                const [SpeakersCheckRows] = await pool.query(
                    'SELECT * FROM Speakers WHERE name = ?',
                    [mediaData.Speaker]
                );
                if (SpeakersCheckRows.length === 0) {
                    // Not a duplicate, therefore insert new speaker
                    const [NewSpeaker] = await pool.query(
                        'INSERT INTO Speakers (name) VALUES (?)',
                        [mediaData.Speaker]
                    );
        
                    // Assign the newly inserted speaker ID to mediaData
                    mediaData.SpeakerID = NewSpeaker.insertId;
                } else {
                    // If speaker already exists, use the existing SpeakerID
                    mediaData.SpeakerID = rows[0].SpeakerID;
                }
            }
            }
            
            //Insert into Media_Actors
            else if (mediaData.mediaType == "DVD") {
                const [booksRows] = await pool.query(
                    'INSERT INTO Media_Actors (MediaID, Actor) VALUES (?, ?)',
                    [newMedia.id, mediaData.Actor]
                );
            }

            return newMedia;
        } catch (error) {
            throw error;
        }

        
    },

    // Update an existing Media
    updateMedia: async function(mediaID, mediaData) {
        try {
            const [rows] = await pool.query(
                'UPDATE Media SET MediaID=?, ISBN=?, Quantity=?, Title=?, Publisher=?, MediaType=?, Pages=?, Duration=? WHERE MediaID=?',
                [...Object.values(mediaData), mediaID]
            );
            return `media ${mediaID} updated successfully. Affected rows: ${rows.affectedRows}`;
        } catch (error) {
            throw error;
        }
    },

    // Delete a media
    deleteMedia: async function(mediaID) {
        try {
            const [rows] = await pool.query(
                'DELETE FROM Media WHERE MediaID = ?',
                [mediaID]
            );
            return `Media ${mediaID} deleted successfully. Affected rows: ${rows.affectedRows}`;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = media_controller;
