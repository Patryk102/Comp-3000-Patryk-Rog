EXEC BOOKING.[Create_restaurant]
    @restaurant_name = 'Mac Donalds',
    @total_tables = 5,
    @restaurant_description = 'Welcome to mac donalds restaurant',
    @restaurant_type_id = 1,
    @restaurant_image = 'fastfood.png';
GO

EXEC BOOKING.[Create_user]
    @name = 'Testname',
    @surname = 'Testsurname',
    @email = 'hello@hello.com',
    @dateOfBirth = '2004-10-10',
    @password = 'hello';