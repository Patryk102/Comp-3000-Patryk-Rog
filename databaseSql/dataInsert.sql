INSERT INTO BOOKING.[User] (name, surname, email, dateOfBirth, password)
VALUES
('John', 'Doe', 'john.doe@example.com', '1990-01-01', 'password123'),
('Jane', 'Smith', 'jane.smith@example.com', '1985-05-15', 'password456'),
('Emily', 'Brown', 'emily.brown@example.com', '1992-08-30', 'password789'),
('Michael', 'Johnson', 'michael.johnson@example.com', '1987-03-22', 'password101'),
('Sarah', 'Wilson', 'sarah.wilson@example.com', '1995-12-10', 'password102');
GO

INSERT INTO BOOKING.[RestaurantTypes] (restaurant_type_name, restaurant_type_image)
VALUES
('fastfood', 'fastfood.png'),
('sea food', 'seafood.png'),
('chinese', 'chinese.png'),
('pizza', 'pizza.png'),
('fish and chip', 'fishnchip.png');
GO


INSERT INTO BOOKING.[Restaurant] (restaurant_name, total_tables, restaurant_description, restaurant_type_id, restaurant_image)
VALUES
('Cafe Delight', 20, 'Cozy corner cafe', 1, 'image1.jpg'),
('Bistro Hub', 15, 'Modern bistro with local flavors', 2, 'image2.jpg'),
('Quick Bites', 10, 'Fast service and delicious snacks', 3, 'image3.jpg'),
('Dine-In Haven', 25, 'Perfect spot for family dinners', 4, 'image4.jpg'),
('Coffee Corner', 12, 'Relax with a cup of coffee', 5, 'image5.jpg');
GO


INSERT INTO BOOKING.[RestaurantBooking] (user_id, restaurant_id, booking_time, booking_date, amount_of_people, booking_duration_hours)
VALUES
(1, 1, '12:00', '2024-11-10', 2, 1),
(2, 2, '14:00', '2024-11-11', 4, 2),
(3, 3, '10:00', '2024-11-12', 1, 1),
(4, 4, '18:00', '2024-11-13', 3, 2),
(5, 5, '09:00', '2024-11-14', 5, 3);
GO


INSERT INTO BOOKING.[RestaurantBooking] (user_id, restaurant_id, booking_time, booking_date, amount_of_people, booking_duration_hours)
VALUES
(1, 1, '12:00', '2024-11-10', 2, 1),
(1, 2, '14:00', '2024-11-11', 4, 2),
(1, 3, '10:00', '2024-11-12', 1, 1),
(1, 4, '18:00', '2024-11-13', 3, 2),
(1, 5, '09:00', '2024-11-14', 5, 3);
GO

INSERT INTO BOOKING.[RestaurantUsers] (email, password, account_type, name, surname, restaurant_id, date_of_birth) VALUES
('john.smith@example.com', 'password123', 'admin', 'John', 'Smith', 1, '2000-10-10'),
('dave.smith@example.com', 'anotherpassword456', 'user', 'Dave', 'Smith', 2, '2000-10-10'),
('alice.johnson@example.com', 'mypassword789', 'manager', 'Alice', 'Johnson', 1, '2000-10-10'),
('bob.brown@example.com', 'password1234', 'user', 'Bob', 'Brown', 3, '2000-10-10'),
('charlie.davis@example.com', 'passwd5678', 'chef', 'Charlie', 'Davis', null, '2000-10-10');
GO

INSERT INTO BOOKING.[RestaurantTables] (seating, restaurant_id) VALUES
('4', 1),
('4', 1),
('4', 1),
('4', 1);
GO

INSERT INTO BOOKING.[TableBookings] (booking_date, booking_time, table_id, user_id, booking_length_hours) VALUES
('2025-01-27', '18:30:00', 1, 1, 2),
('2025-01-27', '19:00:00', 2, 1, 1),
('2025-01-27', '20:00:00', 3, 1, 2);
GO

INSERT INTO BOOKING.[RestaurantOpenTimes] (restaurant_id, day_of_week, opening_time, closing_time) VALUES
(1, 1, '09:00:00', '22:00:00'),  -- Monday
(1, 2, '09:00:00', '22:00:00'),  -- Tuesday
(1, 3, '09:00:00', '22:00:00'),  -- Wednesday
(1, 4, '09:00:00', '22:00:00'),  -- Thursday
(1, 5, '09:00:00', '23:00:00'),  -- Friday
(1, 6, '10:00:00', '23:00:00'),  -- Saturday
(1, 7, '10:00:00', '20:00:00');  -- Sunday
GO