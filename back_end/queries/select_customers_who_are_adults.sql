-- Selects all adult customers, where an adult is anyone 18 or over.
SELECT *
FROM customer
WHERE TIMESTAMPDIFF(YEAR, DOB, CURDATE()) >= 18;