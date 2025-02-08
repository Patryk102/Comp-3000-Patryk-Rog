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
GO

CREATE PROCEDURE BOOKING.[Create_table_booking]
@table_id INTEGER,
@booking_date DATE,
@booking_time TIME,
@user_id INTEGER,
@booking_length_hours INTEGER
AS
BEGIN
INSERT INTO BOOKING.[TableBookings](booking_date, booking_time, table_id, user_id, booking_length_hours)
VALUES
(@booking_date, @booking_time, @table_id, @user_id, @booking_length_hours);
END;
GO

CREATE PROCEDURE BOOKING.[Create_restaurant] 
(
    @restaurant_name VARCHAR(255),
    @restaurant_description VARCHAR(255),
    @restaurant_type_id INTEGER,
    @restaurant_image VARCHAR(255),
    @restaurant_location VARCHAR(255),
    @NewRestaurantID INT OUTPUT
)
AS
BEGIN
    INSERT INTO BOOKING.[Restaurant](restaurant_name, restaurant_description, restaurant_type_id, restaurant_image, restaurant_location)
    VALUES 
    (@restaurant_name, @restaurant_description, @restaurant_type_id, @restaurant_image, @restaurant_location)

    SET @NewRestaurantID = SCOPE_IDENTITY();
END;
GO

DECLARE @NewID INT;
EXEC BOOKING.[Create_restaurant] 
    @restaurant_name = 'The Culinary Delight', 
    @restaurant_description = 'A fine dining experience', 
    @restaurant_type_id = 1, 
    @restaurant_image = 'image.jpg', 
    @restaurant_location = '123 Main St', 
    @NewRestaurantID = @NewID OUTPUT;

PRINT 'The new Restaurant ID is: ' + CAST(@NewID AS NVARCHAR);
GO

CREATE PROCEDURE BOOKING.[AddStaffRestaurant]
(
    @restaurant_id INTEGER,
    @user_id INTEGER,
    @account_type VARCHAR(255)
)
AS
BEGIN
    INSERT INTO BOOKING.[StaffRestaurants] (restaurant_id, user_id, account_type)
    VALUES (@restaurant_id, @user_id, @account_type);
END;

















