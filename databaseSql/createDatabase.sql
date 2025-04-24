CREATE SCHEMA BOOKING;
GO


CREATE TABLE BOOKING.[User] (
    user_id INTEGER PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255),
    surname VARCHAR(255),
    email VARCHAR(255),
    dateOfBirth DATE,
    password VARCHAR(255)
);
GO
CREATE TABLE BOOKING.[RestaurantTypes] (
    restaurant_type_id INTEGER PRIMARY KEY IDENTITY(1,1),
    restaurant_type_name VARCHAR(255),
    restaurant_type_image VARCHAR(255)
);
GO

CREATE TABLE BOOKING.[Restaurant] (
    restaurant_id INTEGER PRIMARY KEY IDENTITY(1,1),
    restaurant_name VARCHAR(255),
    restaurant_description VARCHAR(255),
    restaurant_location VARCHAR(255),
    restaurant_type_id INTEGER,
    FOREIGN KEY (restaurant_type_id) REFERENCES BOOKING.[RestaurantTypes](restaurant_type_id),
    restaurant_image VARCHAR(255)
);
GO
CREATE TABLE BOOKING.[RestaurantUsers] (
    user_id INTEGER PRIMARY KEY IDENTITY(1,1),
    email VARCHAR(255),
    password VARCHAR(255),
    account_type VARCHAR(255),
    name VARCHAR(255),
    surname VARCHAR(255),
    restaurant_id INTEGER,
    date_of_birth DATE,
    FOREIGN KEY(restaurant_id) REFERENCES BOOKING.[Restaurant](restaurant_id)
);
GO


CREATE TABLE BOOKING.[StaffRestaurants] (
    restaurant_id INTEGER,
    user_id INTEGER,
    account_type VARCHAR(255),
    FOREIGN KEY (restaurant_id) REFERENCES BOOKING.[Restaurant](restaurant_id),
    FOREIGN KEY (user_id) REFERENCES BOOKING.[RestaurantUsers](user_id)
);
GO
CREATE TABLE BOOKING.[RestaurantTables] (
    table_id INTEGER PRIMARY KEY IDENTITY(1,1),
    seating INTEGER,
    restaurant_id INTEGER,
    table_no INTEGER,
    FOREIGN KEY (restaurant_id) REFERENCES BOOKING.[Restaurant](restaurant_id)
);
GO
CREATE TABLE BOOKING.[TableBookings] (
    table_booking_id INTEGER PRIMARY KEY IDENTITY(1,1),
    booking_date DATE,
    booking_time TIME,
    table_id INTEGER,
    user_id INTEGER,
    booking_length_hours INTEGER,
    FOREIGN KEY (table_id) REFERENCES BOOKING.[RestaurantTables](table_id),
    FOREIGN KEY (user_id) REFERENCES BOOKING.[User](user_id)
);
GO
CREATE TABLE BOOKING.[RestaurantOpenTimes] (
    restaurant_id INTEGER,
    day_of_week INTEGER,
    opening_time TIME,
    closing_time TIME,
    FOREIGN KEY (restaurant_id) REFERENCES BOOKING.[Restaurant](restaurant_id)
);
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
GO

CREATE PROCEDURE BOOKING.[Create_restaurant_table]
(
    @restaurant_id INTEGER,
    @seating INTEGER,
    @table_no INTEGER
)
AS
BEGIN
    INSERT INTO BOOKING.[RestaurantTables] (restaurant_id, seating, table_no)
    VALUES (@restaurant_id, @seating, @table_no);
END;
GO

CREATE PROCEDURE BOOKING.[Create_restaurant_opening_time]
(
    @restaurant_id INTEGER,
    @opening_time TIME,
    @closing_time TIME,
    @day_of_week INTEGER
)
AS
BEGIN
    INSERT INTO BOOKING.[RestaurantOpenTimes] (restaurant_id, day_of_week, opening_time, closing_time)
    VALUES (@restaurant_id, @day_of_week, @opening_time, @closing_time)
END;
GO

INSERT INTO BOOKING.[RestaurantTypes] (restaurant_type_name, restaurant_type_image)
VALUES
('fastfood', 'fastfood.png'),
('sea food', 'seafood.png'),
('chinese', 'chinese.png'),
('pizza', 'pizza.png'),
('fish and chip', 'fishnchip.png');
GO



















