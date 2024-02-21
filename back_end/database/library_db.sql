DROP SCHEMA IF EXISTS  `library`;

CREATE SCHEMA IF NOT EXISTS `library` DEFAULT CHARACTER SET latin1;

USE `library`;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS Media;

CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
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
    MediaID INT PRIMARY KEY,
    ISBN VARCHAR(20) UNIQUE,
    Quantity INT,
    Title VARCHAR(64),
    Publisher VARCHAR(64),
    PublicationDate DATE
);

CREATE TABLE Reservation (
    ReserveID INT PRIMARY KEY,
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