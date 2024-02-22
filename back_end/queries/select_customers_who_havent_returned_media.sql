-- A nested retrieval query where all customers who have not returned media by the due date are selected.
SELECT *
FROM Customer
WHERE CustomerID IN (
    SELECT CustomerID
    FROM Reservation
    WHERE DueDate < CURDATE() AND IsReturned = 0
);
