
CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    FirstName VARCHAR2(64),
    Surname VARCHAR2(64),
    PhoneNo VARCHAR2(20),
    Email VARCHAR2(64),
    StreetNumber VARCHAR2(10),
    Street VARCHAR2(128),
    ZIPcode VARCHAR2(10),
    DOB DATE
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

CREATE TABLE Media (
    MediaID INT PRIMARY KEY,
    ISBN VARCHAR2(20) UNIQUE,
    Quantity INT,
    Title VARCHAR2(64),
    Publisher VARCHAR2(64),
    PublicationDate DATE,
    ReserveID INT,
    FOREIGN KEY (ReserveID) REFERENCES Reservation(ReserveID)
);
