DROP SCHEMA IF EXISTS `library`;

CREATE SCHEMA IF NOT EXISTS `library` DEFAULT CHARACTER SET latin1;

USE `library`;

DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Media;
DROP TABLE IF EXISTS Author;
DROP TABLE IF EXISTS Media_Author;
DROP TABLE IF EXISTS Speaker;
DROP TABLE IF EXISTS Media_Speaker;
DROP TABLE IF EXISTS Actor;
DROP TABLE IF EXISTS Media_Actor;
DROP TABLE IF EXISTS Reservation;

CREATE TABLE Customer (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(64),
    Surname VARCHAR(64),
    PhoneNo VARCHAR(20),
    Email VARCHAR(64),
    StreetNumber VARCHAR(10),
    Street VARCHAR(128),
    ZIPcode VARCHAR(10),
    DOB DATE
);

CREATE TABLE Media (
    MediaID INT AUTO_INCREMENT PRIMARY KEY,
    ISBN VARCHAR(20) UNIQUE,
    Quantity INT,
    Title VARCHAR(64),
    Publisher VARCHAR(64),
    PublicationDate DATE,
    MediaType VARCHAR(20),
    Pages INT,
    Duration DOUBLE
);

CREATE TABLE Author (
    AuthorID INT AUTO_INCREMENT PRIMARY KEY,
    AuthorName VARCHAR(64)
);

CREATE TABLE Media_Author (
    MediaID INT,
    AuthorID INT,
    FOREIGN KEY (MediaID) REFERENCES Media(MediaID),
    FOREIGN KEY (AuthorID) REFERENCES Author(AuthorID)
);

CREATE TABLE Speaker (
    SpeakerID INT AUTO_INCREMENT PRIMARY KEY,
    SpeakerName VARCHAR(64)
);

CREATE TABLE Media_Speaker (
    MediaID INT,
    SpeakerID INT,
    FOREIGN KEY (MediaID) REFERENCES Media(MediaID),
    FOREIGN KEY (SpeakerID) REFERENCES Speaker(SpeakerID)
);

CREATE TABLE Actor (
    ActorID INT AUTO_INCREMENT PRIMARY KEY,
    ActorName VARCHAR(64)
);

CREATE TABLE Media_Actor (
    MediaID INT,
    ActorID INT,
    FOREIGN KEY (MediaID) REFERENCES Media(MediaID),
    FOREIGN KEY (ActorID) REFERENCES Actor(ActorID)
);



CREATE TABLE Reservation (
    ReservationID INT AUTO_INCREMENT PRIMARY KEY,
    DueDate DATE,
    Time TIME,
    Date DATE,
    IsReturned BOOLEAN,
    Quantity INT,
    CustomerID INT,
    MediaID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (MediaID) REFERENCES Media(MediaID)
);
