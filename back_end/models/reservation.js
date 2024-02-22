// reservation.js

class Reservation {
    constructor(reserveID, DueDate, Time, Date, IsReturned, Quantity, CustomerID, MediaID) {
        this.reserveID = reserveID;
        this.DueDate = new Date(DueDate); 
        this.Time = Time; 
        this.Date = new Date(Date); 
        this.IsReturned = IsReturned; 
        this.Quantity = Quantity;
        this.CustomerID = CustomerID;
        this.MediaID = MediaID;
    }
}

module.exports = Reservation;
