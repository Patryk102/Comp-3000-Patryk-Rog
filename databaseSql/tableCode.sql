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
    total_tables INTEGER,
    restaurant_description VARCHAR(255),
    restaurant_type_id INTEGER,
    FOREIGN KEY (restaurant_type_id) REFERENCES BOOKING.[RestaurantTypes](restaurant_type_id),
    restaurant_image VARCHAR(255)
);
GO

CREATE TABLE BOOKING.[RestaurantBooking] (
    booking_id INTEGER PRIMARY KEY IDENTITY(1,1),
    user_id INTEGER,
    restaurant_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES BOOKING.[User](user_id),
    FOREIGN KEY (restaurant_id) REFERENCES BOOKING.[Restaurant](restaurant_id),
    booking_time TIME,
    booking_date date,
    amount_of_people INTEGER,
    booking_duration_hours INTEGER
);
GO

CREATE TABLE BOOKING.[RestaurantMenu] (
    product_id INTEGER PRIMARY KEY IDENTITY(1,1),
    restaurant_id INTEGER,
    FOREIGN KEY (restaurant_id) REFERENCES BOOKING.[Restaurant](restaurant_id),
    menu_image VARCHAR(255),
    menu_description VARCHAR(255),
    menu_name VARCHAR(255),
    menu_price FLOAT(5)
);
GO

CREATE TABLE BOOKING.[RestaurantOrders] (
    order_id INTEGER PRIMARY KEY IDENTITY(1,1),
    product_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES BOOKING.[RestaurantMenu](product_id),
    order_time TIME,
    order_requirements VARCHAR(255),
    order_table INTEGER
);
GO

CREATE TABLE BOOKING.[RestaurantArchiveOrders] (
    order_id INTEGER PRIMARY KEY,
    product_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES BOOKING.[RestaurantMenu](product_id),
    order_time TIME,
    order_requirements VARCHAR(255),
    order_table INTEGER
);
GO

CREATE TABLE BOOKING.[UserFalseBookings] (
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES BOOKING.[User](user_id),
    false_booking_count INTEGER,
    user_banned BIT,
    ban_end_date DATE
);
GO

CREATE TABLE BOOKING.[RestaurantComments] (
    comment_id INTEGER PRIMARY KEY IDENTITY(1,1),
    user_id INTEGER,
    restaurant_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES BOOKING.[User](user_id),
    FOREIGN KEY (restaurant_id) REFERENCES BOOKING.[Restaurant](restaurant_id),
    comment_post_date DATE,
    comment_post_time TIME,
    comment_content VARCHAR(255)
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
    FOREIGN KEY(restaurant_id) REFERENCES BOOKING.[Restaurant](restaurant_id)
);
