const pool = require('../connection/datapool');

const media_controller = {
    // Insert a new media
    insertMedia: async function (mediaData) {
        try {
            // Insert into Media table
            const [rows] = await pool.query(
                'INSERT INTO Media (ISBN, Quantity, Title, Publisher, PublicationDate, MediaType, Pages, Duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [mediaData.ISBN, mediaData.Quantity, mediaData.Title, mediaData.Publisher, mediaData.PublicationDate, mediaData.MediaType, mediaData.Pages, mediaData.Duration]
            );

//            const newMedia = new Media(rows.insertId, ...Object.values(mediaData));

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

        } catch (error) {
            throw error;
        }


    },

    // Search a media by title or ISBN
    searchMediaByTitleOrISBN: async function (text) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM Media WHERE Title LIKE ? OR ISBN LIKE ?', [`%${text}%`, `%${text}%`]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    },

    // Update an existing Media
    updateMedia: async function (mediaID, mediaData) {
        try {
            const [rows] = await pool.query(
                'UPDATE Media SET ISBN=?, Quantity=?, Title=?, Publisher=?, MediaType=?, Pages=?, Duration=? WHERE MediaID=?',
                [...Object.values(mediaData), mediaID]
            );
            return `media ${mediaID} updated successfully. Affected rows: ${rows.affectedRows}`;
        } catch (error) {
            throw error;
        }
    },

    // Delete a media
    deleteMedia: async function (mediaID) {
        try {
            // Start transaction to ensure all or nothing is committed
            await pool.query('START TRANSACTION');

            // Delete related entries from Media_Author, Media_Speaker, and Media_Actor
            await pool.query('DELETE FROM Media_Author WHERE MediaID = ?', [mediaID]);
            await pool.query('DELETE FROM Media_Speaker WHERE MediaID = ?', [mediaID]);
            await pool.query('DELETE FROM Media_Actor WHERE MediaID = ?', [mediaID]);


            const [rowsMedia] = await pool.query('DELETE FROM Media WHERE MediaID = ?', [mediaID]);

            // Commit transaction
            await pool.query('COMMIT');

            return `Media ${mediaID} deleted successfully. Affected rows: ${rowsMedia.affectedRows}`;
        } catch (error) {
            // Rollback transaction in case of any error
            await pool.query('ROLLBACK');
            throw error;
        }
    }


};

module.exports = media_controller;
