-- Create Trigger
DELIMITER $$
CREATE TRIGGER before_reservation_insert
BEFORE INSERT
ON reservations
FOR EACH ROW
BEGIN
    -- Set IsReturned to 0
    SET NEW.IsReturned = 0;
    
    -- Set Time to the current time
    SET NEW.Time = NOW();
    
    -- Set Date to today's date
    SET NEW.Date = CURDATE();
END;
$$
DELIMITER ;