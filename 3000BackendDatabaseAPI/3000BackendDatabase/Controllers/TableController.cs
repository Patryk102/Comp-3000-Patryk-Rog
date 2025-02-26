using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata;

namespace _3000BackendDatabase.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TableController : ControllerBase
    {
        private readonly IConfiguration Configuration;

        public TableController(/*UserManager<IdentityUser> userManager,*/ IConfiguration configuration)
        {
            //_userManager = userManager;
            Configuration = configuration;
        }

        [HttpPost]
        [Route("/avalibleTables")]
        public IActionResult GetValidTables([FromBody] dynamic models)
        {
            JObject model = JObject.Parse(models.ToString());
            String restaurant_id = model["restaurant_id"].ToString();
            DateTime date = DateTime.Parse(model["date"].ToString());
            DateTime time = DateTime.Parse(model["time"].ToString());
            int reservationLengthHours = int.Parse(model["reservationLengthHours"].ToString());

            DateTime reservationStartTime = date.Add(time.TimeOfDay);
            DateTime reservationEndTime = reservationStartTime.AddHours(reservationLengthHours);

            string reservationStartTimeStr = reservationStartTime.ToString("yyyy-MM-dd HH:mm:ss");
            string reservationEndTimeStr = reservationEndTime.ToString("yyyy-MM-dd HH:mm:ss");


            string sql = @"SELECT t.*
FROM BOOKING.RestaurantTables t
WHERE t.restaurant_id = @restaurantId
AND t.table_id NOT IN (
    SELECT r.table_id
    FROM BOOKING.TableBookings r
    WHERE (
        (CAST(r.booking_date AS DATETIME) + CAST(r.booking_time AS DATETIME) <= @reservationEndTime
         AND DATEADD(HOUR, r.booking_length_hours, CAST(r.booking_date AS DATETIME) + CAST(r.booking_time AS DATETIME)) > @reservationStartTime) OR
        (CAST(r.booking_date AS DATETIME) + CAST(r.booking_time AS DATETIME) < @reservationEndTime
         AND DATEADD(HOUR, r.booking_length_hours, CAST(r.booking_date AS DATETIME) + CAST(r.booking_time AS DATETIME)) >= @reservationStartTime)
    )
);";

            string[] parameterNames = { "@restaurantId", "@reservationStartTime", "@reservationEndTime" };
            string[] parameters = { restaurant_id, reservationStartTimeStr, reservationEndTimeStr };

            JArray dbReturn = new DatabaseConnection(Configuration).GetDatabaseData(sql, parameterNames, parameters, true);









            return Ok(dbReturn.ToString());
        }






        [Authorize]
        [HttpPost]
        public IActionResult BookTable([FromBody] dynamic models)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var claims = jwtToken.Claims.ToDictionary(c => c.Type, c => c.Value);

            JObject jClaim = JObject.FromObject(claims);



            String email = jClaim["email"].ToString();
            String userId = jClaim["sub"].ToString();





            JObject model = JObject.Parse(models.ToString());

            string table_id = model["table_id"].ToString();
            string booking_date = model["booking_date"].ToString();
            string booking_time = model["booking_time"].ToString();
            //string user_id = model["user_id"].ToString();
            string booking_length_hours = model["booking_length_hours"].ToString();


            string sql = "EXEC BOOKING.[Create_table_booking] @table_id = @inp_table_id, @booking_date = @inp_booking_date, @booking_time = @inp_booking_time, @user_id = @inp_user_id, @booking_length_hours = @inp_booking_length_hours";

            string[] paramaters = [table_id, booking_date, booking_time, userId, booking_length_hours];
            string[] paramaterNames = ["@inp_table_id", "@inp_booking_date", "@inp_booking_time", "@inp_user_id", "@inp_booking_length_hours"];

            JArray dbReturn = new DatabaseConnection(Configuration).GetDatabaseData(sql, paramaterNames, paramaters, false);

            if (dbReturn.Count < 1)
            {
                return Ok("Reservation added succesfully");
            }
            else
            {
                return BadRequest(((JObject)dbReturn[0]).ToString());
            }


            //return Ok(table_id + booking_date + booking_time + user_id + booking_length_hours);
        }


        private Boolean CheckIfAvalible()
        {
            /*SELECT *
            FROM reservations
            WHERE booking_time BETWEEN '2025-01-30 14:00:00' AND DATE_ADD('2025-01-30 14:00:00', INTERVAL 2 HOUR);
            */
            /*SELECT *
            FROM reservations
            WHERE (booking_time BETWEEN '2025-01-30 14:00:00' AND DATE_ADD('2025-01-30 14:00:00', INTERVAL 2 HOUR))
            OR (booking_time BETWEEN '2025-01-30 18:00:00' AND DATE_ADD('2025-01-30 18:00:00', INTERVAL 2 HOUR));
            */





            return true;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetUserReservations()
        {
            string sql = @"SELECT a.table_booking_id, a.table_id, a.booking_date, a.booking_time ,
            a.booking_length_hours, r.restaurant_id, res.restaurant_name

            FROM BOOKING.[TableBookings] a
            INNER JOIN BOOKING.[RestaurantTables] r
            ON a.table_id = r.table_id
            INNER JOIN BOOKING.[Restaurant] res
            ON r.restaurant_id = res.restaurant_id
            WHERE a.user_id = @user_id";

            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var claims = jwtToken.Claims.ToDictionary(c => c.Type, c => c.Value);

            JObject jClaim = JObject.FromObject(claims);



            String email = jClaim["email"].ToString();
            String userId = jClaim["sub"].ToString();

            string[] paramaterNames = ["@user_id"];
            string[] paramaters = [userId];

            JArray dbReturn = new DatabaseConnection(Configuration).GetDatabaseData(sql, paramaterNames, paramaters, true);

            /*if (dbReturn.Count < 1)
            {
                return Ok("Reservation added succesfully");
            }
            else
            {
                return BadRequest(((JObject)dbReturn[0]).ToString());
            }*/


            //JArray dbReturn = new DatabaseConnection(Configuration).GetDatabaseData(sql, paramaterNames, paramaters, false);
            return Content(dbReturn.ToString(), "application/json");
        }


        [Route("/create/table")]
        [HttpPost]
        public IActionResult CreateTable([FromBody] dynamic models)
        {
            JObject model = JObject.Parse(models.ToString());

            string restaurant_id = model["restaurant_id"].ToString();
            string seating = model["seating"].ToString();
            string table_no = model["table_no"].ToString();

            string[] paramaters = [restaurant_id, seating, table_no];
            string[] paramaterNames = ["@inp_restaurant_id", "@inp_seating", "@inp_table_no"];

            string sql = "EXEC BOOKING.[Create_restaurant_table] @restaurant_id = @inp_restaurant_id, @seating = @inp_seating, @table_no = @inp_table_no";

            JArray dbReturn = new DatabaseConnection(Configuration).GetDatabaseData(sql, paramaterNames, paramaters, false);

            if (dbReturn.Count < 1)
            {
                return Ok("Table added succesfully");
            }
            else
            {
                return BadRequest(((JObject)dbReturn[0]).ToString());
            }
        }

        
        [HttpGet("/restaurant/tables/{id}")]
        public IActionResult GetRestaurantTables(int id)
        {

            string sql = "SELECT table_id, seating, table_no FROM BOOKING.[RestaurantTables] WHERE restaurant_id = @inp_restaurant_id";
            string[] paramaters = [id.ToString()];
            string[] paramaterNames = ["@inp_restaurant_id"];
            JArray dbReturn = new DatabaseConnection(Configuration).GetDatabaseData(sql, paramaterNames, paramaters, true);


            return Content(dbReturn.ToString(), "application/json");
            //return Ok("to be finished and the id is " + id);
        }





    }
}
