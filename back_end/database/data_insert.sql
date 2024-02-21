INSERT INTO Customer 
(FirstName, Surname, PhoneNo, Email, StreetNumber, Street, ZIPcode, DOB) 
VALUES ('Ethan', 'Brown', '456-789-0123', 'ethan.brown@email.com', '103', 'Maple Dr', 'L5M 8N6', TO_DATE('1995-04-04', 'YYYY-MM-DD'));
INSERT INTO Customer 
(FirstName, Surname, PhoneNo, Email, StreetNumber, Street, ZIPcode, DOB) 
VALUES ('Olivia', 'Martinez', '567-890-1234', 'olivia.m@gmail.com', '104', 'Elm Rd', 'K1A 0B1', TO_DATE('1996-05-05', 'YYYY-MM-DD'));

INSERT INTO Media 
(ISBN, Quantity, Title, Publisher, PublicationDate) VALUES ('978-0-131-86777-3', 8, 'Operating System Concepts', 'Addison-Wesley', TO_DATE('2018-09-23', 'YYYY-MM-DD'));
INSERT INTO Media 
(ISBN, Quantity, Title, Publisher, PublicationationDate) VALUES ('978-0-071-74938-3', 4, 'Principles of Computer Security', 'McGraw-Hill', TO_DATE('2020-01-15', 'YYYY-MM-DD'));

INSERT INTO Reservation 
(DueDate, Time, Date, IsReturned, Quantity, CustomerID, MediaID) VALUES (TO_DATE('2024-04-10', 'YYYY-MM-DD'), '10:00', TO_DATE('2024-03-10', 'YYYY-MM-DD'), 0, 1, 10005, 1000005);
INSERT INTO Reservation 
(DueDate, Time, Date, IsReturned, Quantity, CustomerID, MediaID) VALUES (TO_DATE('2024-04-20', 'YYYY-MM-DD'), '11:00', TO_DATE('2024-03-20', 'YYYY-MM-DD'), 0, 1, 10005, 1000006);