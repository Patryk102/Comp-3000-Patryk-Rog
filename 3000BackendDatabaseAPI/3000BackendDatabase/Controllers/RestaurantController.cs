using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Newtonsoft.Json.Linq;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json.Nodes;

namespace _3000BackendDatabase.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantController : ControllerBase
    {
        public IConfiguration Configuration { get; }

        public RestaurantController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            //Get all restaurants
            String sqlString = "SELECT * FROM BOOKING.[Restaurant];";
            JArray restaurants = new DatabaseConnection(Configuration).GetDatabaseData(sqlString, new string[0], new string[0], true);
            return Content(restaurants.ToString(), "application/json");
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            //Get restaurant by id
            String sqlString = "SELECT * FROM BOOKING.[Restaurant] WHERE restaurant_id = @restaurant_id;";
            String[] paramNames = { "@restaurant_id" };
            String[] paramValues = { id.ToString() };
            JArray restaurant = new DatabaseConnection(Configuration).GetDatabaseData(sqlString, paramNames, paramValues, true);
            return Content(((JObject)restaurant[0]).ToString(), "application/json");
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] dynamic models)
        {
            JObject model = JObject.Parse(models.ToString());

            string restaurantName = model["restaurant_name"].ToString();
            string restaurantDescription = model["restaurant_description"].ToString();
            string restaurantTypeId = model["restaurant_type_id"].ToString();
            string restaurantImage = model["restaurant_image"].ToString();
            string restaurantLocation = model["restaurant_location"].ToString();


            string sql = @"
    DECLARE @NewRestaurantID INT;
    EXEC BOOKING.[Create_restaurant] 
        @restaurant_name = @RestaurantName, 
        @restaurant_description = @RestaurantDescription, 
        @restaurant_type_id = @RestaurantTypeId, 
        @restaurant_image = @RestaurantImage, 
        @restaurant_location = @RestaurantLocation, 
        @NewRestaurantID = @NewRestaurantID OUTPUT;

    SELECT @NewRestaurantID AS NewRestaurantID;";


            string[] paramaterNames = ["@RestaurantName", "@RestaurantDescription", "@RestaurantTypeId", "@RestaurantImage", "@RestaurantLocation"];
            string[] paramaterValues = [restaurantName, restaurantDescription, restaurantTypeId, restaurantImage, restaurantLocation];

            JArray restID = new DatabaseConnection(Configuration).GetDatabaseData(sql, paramaterNames, paramaterValues, true);

            string newRestaurantId = ((JObject)restID[0])["NewRestaurantID"].ToString();

            //change user restaurant to the id

            string addUserRestaurantSql = @"EXEC BOOKING.[AddStaffRestaurant]
                @restaurant_id = @RestaurantId,
                @user_id = @UserId,
                @account_type = 'Owner';
             ";

            string[] userParamaterNames = ["@RestaurantId", "@userId"];

            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var claims = jwtToken.Claims.ToDictionary(c => c.Type, c => c.Value);

            JObject jClaim = JObject.FromObject(claims);



            String email = jClaim["email"].ToString();
            String userId = jClaim["sub"].ToString();

            string[] userParamaterValues = [newRestaurantId, userId];
            JArray addResult = new DatabaseConnection(Configuration).GetDatabaseData(addUserRestaurantSql,  userParamaterNames, userParamaterValues, false);

            if (addResult.Count < 1)
            {
                return Ok("Restaurant added succesfully");
            }
            else
            {
                return BadRequest(((JObject)addResult[0]).ToString());
            }





            /*DECLARE @NewID INT;
EXEC BOOKING.[Create_restaurant] 
    @restaurant_name = 'Culinary Delight', 
    @restaurant_description = 'A fine dining experience', 
    @restaurant_type_id = 1, 
    @restaurant_image = 'image.jpg', 
    @restaurant_location = 'plymouth', 
    @NewRestaurantID = @NewID OUTPUT;

PRINT 'The new Restaurant ID is: ' + CAST(@NewID AS NVARCHAR);*/

        }

        [Route("/staff/restaurants")]
        [Authorize]
        [HttpGet]
        public IActionResult staffRestaurants()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var claims = jwtToken.Claims.ToDictionary(c => c.Type, c => c.Value);

            JObject jClaim = JObject.FromObject(claims);



            String email = jClaim["email"].ToString();
            String userId = jClaim["sub"].ToString();

            string sql = @"SELECT * FROM BOOKING.StaffRestaurants where user_id = @UserId";
            string[] paramaterNames = ["@UserId"];
            string[] paramaterValues = [userId];

            JArray databaseData = new DatabaseConnection(Configuration).GetDatabaseData(sql, paramaterNames, paramaterValues, true);

            return Content(databaseData.ToString(), "application/json");
        }


        [Route("/create/openingTimes")]
        [HttpPost]
        public IActionResult CreateTables([FromBody] dynamic models)
        {
            JObject model = JObject.Parse(models.ToString());

            string restaurant_id = model["restaurant_id"].ToString();
            //string seating = model["seating"].ToString();
            //string table_no = model["table_no"].ToString();

            JArray days = (JArray)model["days"];

            string deletesql = "DELETE FROM BOOKING.[RestaurantOpenTimes] WHERE restaurant_id = @inpRestaurant_id";
            string[] paramName = ["@inpRestaurant_id"];
            string[] paramValue = [restaurant_id];
            JArray deleteReturn = new DatabaseConnection(Configuration).GetDatabaseData(deletesql, paramName, paramValue, false);


            //EXEC BOOKING.[Create_restaurant_opening_time] @restaurant_id = @inp_restaurant_id, @day_of_week = @inp_day_of_week, @opening_time = @inp_opening_time, @closing_time = @inp_closing_time
            string createOpeningTimeSql = "EXEC BOOKING.[Create_restaurant_opening_time] @restaurant_id = @inp_restaurant_id, @day_of_week = @inp_day_of_week, @opening_time = @inp_opening_time, @closing_time = @inp_closing_time";

            Console.WriteLine("days");
            Console.WriteLine(days);


            foreach (JObject day in days)
            {
                string opening_time = day["opening_time"].ToString();
                string closing_time = day["closing_time"].ToString();
                string day_of_week = day["day_of_week"].ToString();
                string open = day["open"].ToString();
                Console.WriteLine("open");
                Console.WriteLine(open);

                if (open == "True")
                {
                    string[] paramaters = [restaurant_id, day_of_week, opening_time, closing_time];
                    string[] paramaterNames = ["@inp_restaurant_id", "@inp_day_of_week", "@inp_opening_time", "@inp_closing_time"];
                    JArray dbReturn = new DatabaseConnection(Configuration).GetDatabaseData(createOpeningTimeSql, paramaterNames, paramaters, false);
                    if (dbReturn.Count < 1)
                    {
                        //return Ok("Table added succesfully");
                    }
                    else
                    {
                        return BadRequest(((JObject)dbReturn[0]).ToString());
                    }
                }



                
            }






            //string[] paramaters = [restaurant_id, seating, table_no];
            //string[] paramaterNames = ["@inp_restaurant_id", "@inp_seating", "@inp_table_no"];

            //string sql = "EXEC BOOKING.[Create_restaurant_table] @restaurant_id = @inp_restaurant_id, @seating = @inp_seating, @table_no = @inp_table_no";

            //JArray dbReturn = new DatabaseConnection(Configuration).GetDatabaseData(sql, paramaterNames, paramaters, false);

            return Ok("OpeningTimes added succesfully");
        }

        [Route("/openingtimes/{id}")]
        [HttpGet]
        public IActionResult openingTimes(int id)
        {
            string[] dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            string sql = "select day_of_week, opening_time, closing_time from BOOKING.[RestaurantOpenTimes] WHERE restaurant_id = @inp_restaurant_id";


            string[] paramaters = [id.ToString()];
            string[] paramaterNames = ["@inp_restaurant_id"];
            
            JArray dbReturn = new DatabaseConnection(Configuration).GetDatabaseData(sql, paramaterNames, paramaters, true);

            int pointer = 0;

            JArray jArray = new JArray();

            for (int i = 0; i < 7; i++)
            {
                if (dbReturn[pointer]["day_of_week"].ToString() != (i + 1).ToString())
                {
                    JObject tempObject = new JObject();
                    tempObject.Add("day_of_week", dayNames[i]);
                    tempObject.Add("open", "False");
                    tempObject.Add("opening_time", "00:00:00");
                    tempObject.Add("closing_time", "00:00:00");
                    jArray.Add(tempObject);
                }
                else
                {
                    JObject tempObject = new JObject();
                    tempObject.Add("day_of_week", dayNames[i]);
                    tempObject.Add("open", "True");
                    tempObject.Add("opening_time", dbReturn[pointer]["opening_time"].ToString());
                    tempObject.Add("closing_time", dbReturn[pointer]["closing_time"].ToString());
                    pointer++;
                    jArray.Add(tempObject);
                }


            }






            return Content(jArray.ToString(), "application/json");

        }









    }
}
