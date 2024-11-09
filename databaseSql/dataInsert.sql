INSERT INTO BOOKING.[User] (name, surname, email, dateOfBirth, password)
VALUES
('John', 'Doe', 'john.doe@example.com', '1990-01-01', 'password123'),
('Jane', 'Smith', 'jane.smith@example.com', '1985-05-15', 'password456'),
('Emily', 'Brown', 'emily.brown@example.com', '1992-08-30', 'password789'),
('Michael', 'Johnson', 'michael.johnson@example.com', '1987-03-22', 'password101'),
('Sarah', 'Wilson', 'sarah.wilson@example.com', '1995-12-10', 'password102');
GO


INSERT INTO BOOKING.[Restaurant] (restaurant_name, total_tables, restaurant_description, restuarant_type, restaurant_image)
VALUES
('Cafe Delight', 20, 'Cozy corner cafe', 'Cafe', 'image1.jpg'),
('Bistro Hub', 15, 'Modern bistro with local flavors', 'Bistro', 'image2.jpg'),
('Quick Bites', 10, 'Fast service and delicious snacks', 'Kiosk', 'image3.jpg'),
('Dine-In Haven', 25, 'Perfect spot for family dinners', 'Restaurant', 'image4.jpg'),
('Coffee Corner', 12, 'Relax with a cup of coffee', 'Cafe', 'image5.jpg');
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

