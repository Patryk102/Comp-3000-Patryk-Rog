CREATE VIEW BOOKING.[RestaurantBookingView] AS
SELECT u.name, u.surname, r.restaurant_id, r.booking_id
FROM BOOKING.[User] u
INNER JOIN BOOKING.[RestaurantBooking] r ON u.user_id = r.user_id;

GO


CREATE PROCEDURE BOOKING.[Make_reservation]
@user_id INTEGER,
@restaurant_id INTEGER,
@booking_time TIME,
@booking_date DATE,
@amount_of_people INTEGER,
@booking_duration_hours INTEGER
AS
BEGIN
INSERT INTO BOOKING.[RestaurantBooking] (user_id, restaurant_id, booking_time, booking_date, amount_of_people, booking_duration_hours)
VALUES
(@user_id, @restaurant_id, @booking_time, @booking_date, @amount_of_people, @booking_duration_hours)
END;
GO

CREATE PROCEDURE BOOKING.[Cancel_reservation]
@booking_id INT
AS
BEGIN
DELETE 
FROM BOOKING.[RestaurantBooking]
WHERE booking_id = @booking_id
END;
GO

CREATE PROCEDURE BOOKING.[Create_restaurant]
@restaurant_name VARCHAR(255),
@total_tables INTEGER,
@restaurant_description VARCHAR(255),
@restaurant_type_id INTEGER,
@restaurant_image VARCHAR(255)
AS
BEGIN
INSERT INTO BOOKING.[Restaurant](restaurant_name, total_tables, restaurant_description, restaurant_type_id, restaurant_image)
VALUES
(@restaurant_name, @total_tables, @restaurant_description, @restaurant_type_id, @restaurant_image)
END;
GO

CREATE PROCEDURE BOOKING.[Create_user]
@name VARCHAR(255),
@surname VARCHAR(255),
@email VARCHAR(255),
@dateOfBirth VARCHAR(255),
@password VARCHAR(255)
AS
BEGIN
INSERT INTO BOOKING.[User](name, surname, email, dateOfBirth, password)
VALUES
(@name, @surname, @email, @dateOfBirth, @password)
END;
GO

CREATE PROCEDURE BOOKING.[Create_restaurant_user]
@name VARCHAR(255),
@surname VARCHAR(255),
@email VARCHAR(255),
@date_of_birth DATE,
@password VARCHAR(255),
@account_type VARCHAR(255),
@restaurant_id INTEGER
AS
BEGIN
INSERT INTO BOOKING.[RestaurantUsers](name, surname, email, date_of_birth, password, restaurant_id, account_type)
VALUES
(@name, @surname, @email, @date_of_birth, @password, @restaurant_id, @account_type);
END;










