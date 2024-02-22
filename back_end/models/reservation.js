/**
 * Create reservation object from database
 */
module.exports = class reservation {

    constructor (reserveID, DueDate, Time, Date, IsReturned, Quantity) {
        this.reserveID = reserveID;
        this.DueDate = DueDate;
        this.Time = Time;
        this.Date = Date;
        this.IsReturned = IsReturned;
        this.Quantity = Quantity;
    }
}

// use this line to import class
// const reservation = require('./models/reservation');