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
GO

EXEC BOOKING.[Create_restaurant_user]
    @name = 'sqltest',
    @surname = 'sqlsurname',
    @email = 'sqlTestEmail',
    @date_of_birth = '2000-10-10',
    @password = 'StrongPassword123!',
    @account_type = 'user',
    @restaurant_id = '1'
GO