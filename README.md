# 3000-Computing-Project

# Restaurant Booking System

## Supervisor: Vasilios Kelefouras

## Project Vision
For restaurant owners looking for an efficient way to manage reservations and customers who need a way of booking a table at a restaurant. Table Book is a restaurant table booking system which allows customers to book a table at multiple different restaurants, the restaurant owners on the other hand get a way of managing reservations, they can see bookings, edit the tables at the restaurant , opening times and the description. Unlike other restaurants apps or food ordering apps, table book offers a single web app which can be used to book tables at multiple restaurants and which allows restaurant owners to see and manage reservations without having to download any extra applications. Additionally, the application allows customers to choose the exact table they want to sit at compared to most alternatives which only offer random table allocations. The application will work as a web app which can be opened in the browser for both restaurant owners and customers. The app also provides restaurant owners with the ability to add multiple restaurants without having to create multiple accounts.

## How to run the project
1. Download the repository
2. Make sure you have WSL, Docker, azure and visual studio installed
3. In WSL run the command : docker run --cap-add SYS_PTRACE -e 'ACCEPT_EULA=1' -e 'MSSQL_SA_PASSWORD=YourPassword!123' -p 1433:1433 --name 3000Database -d mcr.microsoft.com/azure-sql-edge
4. Connect to the database from azure data studio and input the database details from the ran command. If you changed the details you will need to change the connection string in the backend api to match the details.
5. Copy the sql code from createDatabse.sql and paste into a query in azure and run.
6. Open the backend api(3000BackendDatabaseAPI) in visual studio and run it. To open it open the 3000BackendDatabase.sln file or open folder from visual studio.
7. in the startup.sh file in frontend make sure that all the install scripts arent commented out.
8. Run the up.sh file in reactFrotnend
9. You should now be able to access the application on localhost on port 82 unless you changed to another port. If problems arise make sure port 82 is not being used by any other application.











## Creative commons image credits
Image in background <br/>
https://www.pexels.com/photo/fancy-cafe-and-restaurant-27626758/ <br/>
Ansar Muhammad