-- This query will retrieve the titles of all media items along with the names of their authors
SELECT Media.Title, Author.AuthorName
FROM Media
JOIN Media_Author ON Media.MediaID = Media_Author.MediaID
JOIN Author ON Media_Author.AuthorID = Author.AuthorID;