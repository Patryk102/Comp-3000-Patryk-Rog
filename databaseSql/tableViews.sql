CREATE VIEW BOOKING.[RestaurantBookingView] AS
SELECT u.name, u.surname, r.restaurant_id, r.booking_id
FROM BOOKING.[User] u
INNER JOIN BOOKING.[RestaurantBooking] r ON u.user_id = r.user_id;
GO

CREATE FUNCTION BOOKING.[UserAccount](@user_id INT)
RETURNS TABLE
AS
RETURN
(
    SELECT name, surname, email, dateOfBirth
    FROM BOOKING.[User]
    WHERE user_id = @user_id
);
GO

CREATE FUNCTION BOOKING.[UserPasswordCheck](@email VARCHAR(255))
RETURNS TABLE
AS
RETURN
(
    SELECT password
    FROM BOOKING.[User]
    WHERE email = @email
);
GO