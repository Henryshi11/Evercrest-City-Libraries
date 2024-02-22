-- Insert sample data into the Customer table
INSERT INTO Customer (FirstName, Surname, PhoneNo, Email, StreetNumber, Street, ZIPcode, DOB) VALUES
('Alice', 'Johnson', '555-0100', 'alice.johnson@example.com', '101', 'Maple Street', '90001', '1982-03-24'),
('Bob', 'Smith', '555-0101', 'bob.smith@example.com', '202', 'Oak Street', '90002', '1975-07-09');

-- Insert sample data into the Media table
INSERT INTO Media (ISBN, Quantity, Title, Publisher, PublicationDate, MediaType, Pages, Duration) VALUES
('978-0439023528', 3, 'The Hunger Games', 'Scholastic Press', '2008-09-14', 'Book', 374, NULL),
('000-0000000000', 2, 'Inception', 'Warner Bros', '2010-07-16', 'Movie', NULL, 148);

-- Insert sample data into the Author table
INSERT INTO Author (AuthorName) VALUES
('Suzanne Collins'),
('Christopher Nolan');

-- Assuming MediaID for 'The Hunger Games' is 1000001 and 'Inception' is 1000002,
-- and AuthorID for 'Suzanne Collins' is 1 and 'Christopher Nolan' is 2

-- Insert sample data linking Media and Authors
INSERT INTO Media_Author (MediaID, AuthorID) VALUES
(1000001, 1),
(1000001, 2);

-- Insert sample data into the Speaker table
INSERT INTO Speaker (SpeakerName) VALUES
('James Earl Jones'),
('Morgan Freeman');

-- Insert sample data into the Actor table
INSERT INTO Actor (ActorName) VALUES
('Leonardo DiCaprio'),
('Jennifer Lawrence');

-- Assuming MediaID for 'Inception' is 1000002,
-- and ActorID for 'Leonardo DiCaprio' is 1 and 'Jennifer Lawrence' is 2

-- Insert sample data linking Media and Actors
INSERT INTO Media_Actor (MediaID, ActorID) VALUES
(1000002, 1),
(1000002, 2);

-- Insert sample data into the Reservation table
-- Assuming CustomerID for 'Alice Johnson' is 10001 and 'Bob Smith' is 10002,
-- MediaID for 'The Hunger Games' is 1000001 and 'Inception' is 1000002

INSERT INTO Reservation (DueDate, Time, Date, IsReturned, Quantity, CustomerID, MediaID) VALUES
('2023-12-20', '15:00:00', '2023-11-20', FALSE, 1, 10001, 1000001),
('2023-12-25', '16:00:00', '2023-11-25', FALSE, 1, 10002, 1000002);
