--delete customer
DELIMITER $$
CREATE TRIGGER customer_deletion_trigger
AFTER DELETE ON customers
FOR EACH ROW
BEGIN
    -- Delete related records from borrowed_books table
    DELETE FROM borrowed_books
    WHERE customer_id = OLD.customer_id;

    -- Delete related records from reservations table
    DELETE FROM reservations
    WHERE customer_id = OLD.customer_id;

    -- Add more DELETE statements for other related tables if needed
END$$
DELIMITER ;
