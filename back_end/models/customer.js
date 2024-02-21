/**
 * Create customer object from database
 */
module.exports = class Customer {

    constructor (CustomerID, FirstName, Surname, PhoneNo, Email, StreetNumber, Street, ZIPcode, DOB) {
        this.CustomerID = CustomerID;
        this.FirstName = FirstName;
        this.Surname = Surname;
        this.PhoneNo = PhoneNo;
        this.Email = Email;
        this.StreetNumber = StreetNumber;
        this.Street = Street;
        this.ZIPcode = ZIPcode;
        this.DOB = DOB;

    }
}

// use this line to import class
// const Item = require('./models/sale');