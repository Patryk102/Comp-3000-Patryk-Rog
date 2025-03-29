using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System.Data.SqlTypes;
using System.IdentityModel.Tokens.Jwt;

namespace _3000BackendDatabase.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantUsersController : ControllerBase
    {

        private readonly IConfiguration Configuration;

        public RestaurantUsersController(/*UserManager<IdentityUser> userManager,*/ IConfiguration configuration)
        {
            //_userManager = userManager;
            Configuration = configuration;
        }

        [HttpPost]
        public IActionResult CreateAccount([FromBody] dynamic models)
        {

            JObject model = JObject.Parse(models.ToString());

            string email = model["email"].ToString();
            string password = model["password"].ToString();
            string name = model["name"].ToString();
            string surname = model["surname"].ToString();
            string dateOfBirth = model["date_of_birth"].ToString();
            string accountType = model["account_type"].ToString();
            string restaurant_id = model["restaurant_id"].ToString();

            string sqlString = "SELECT * FROM BOOKING.[RestaurantUsers] WHERE email = @email and password = @password";
            string sql = "EXEC BOOKING.Create_restaurant_user @name = @inpName, @surname = @inpSurname, @email = @inpEmail, @date_of_birth = @inp_date_of_birth, @password = @inpPassword, @account_type = @inp_account_type, @restaurant_id = @inp_restaurant_id;";
            
            String[] paramNames = { "@inpEmail", "@inpPassword" , "@inpName", "@inpSurname", "@inp_date_of_birth", "@inp_account_type", "@inp_restaurant_id"};
            String[] paramValues = { email, password, name , surname, dateOfBirth, accountType, restaurant_id};
            //int[] intParam = { Int32.Parse(restaurant_id) };
            JArray dbReturn = new DatabaseConnection(Configuration).GetDatabaseData(sql, paramNames, paramValues, false);

            if (dbReturn.Count < 1 )
            {
                return Ok("User added succesfully");
            }
            else
            {
                return BadRequest(((JObject)dbReturn[0]).ToString());
            }






        }

        [Route("/restaurant/staff/delete")]
        [Authorize]
        [HttpDelete]
        public IActionResult DeleteStaffUser()
        {
            string sql = @"
BEGIN TRY
BEGIN TRANSACTION;
DELETE tb FROM BOOKING.[TableBookings] tb
INNER JOIN BOOKING.RestaurantTables rt
ON tb.table_id = rt.table_id
INNER JOIN BOOKING.[Restaurant] r 
ON rt.restaurant_id = r.restaurant_id
INNER JOIN BOOKING.[StaffRestaurants] sr 
ON r.restaurant_id = sr.restaurant_id
where sr.user_id = @inp_user_id;


DELETE rt FROM BOOKING.[RestaurantTables] rt
INNER JOIN BOOKING.[Restaurant] r 
ON rt.restaurant_id = r.restaurant_id
INNER JOIN BOOKING.[StaffRestaurants] sr 
ON r.restaurant_id = sr.restaurant_id
where sr.user_id = @inp_user_id;


DELETE rot FROM BOOKING.[RestaurantOpenTimes] rot
INNER JOIN BOOKING.[Restaurant] r 
ON rot.restaurant_id = r.restaurant_id
INNER JOIN BOOKING.[StaffRestaurants] sr 
ON r.restaurant_id = sr.restaurant_id
where sr.user_id = @inp_user_id;


SELECT * INTO #TempRestaurantOwners 
FROM BOOKING.[StaffRestaurants] 
where user_id = @inp_user_id;


DELETE sr FROM BOOKING.[StaffRestaurants] sr 
where sr.user_id = @inp_user_id;

DELETE r FROM BOOKING.[Restaurant] r
INNER JOIN #TempRestaurantOwners s
ON r.restaurant_id = s.restaurant_id
where s.user_id = @inp_user_id;

DROP TABLE #TempRestaurantOwners;

DELETE FROM BOOKING.[RestaurantUsers]
WHERE user_id = @inp_user_id;

COMMIT;
END TRY
BEGIN CATCH  
    ROLLBACK;
    SELECT ERROR_MESSAGE() AS ErrorMessage, ERROR_NUMBER() AS ErrorNumber;
END CATCH;
";

            string checksql = "";

            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var claims = jwtToken.Claims.ToDictionary(c => c.Type, c => c.Value);

            JObject jClaim = JObject.FromObject(claims);



            String email = jClaim["email"].ToString();
            String userId = jClaim["sub"].ToString();

            string[] paramaterNames = ["@inp_user_id"];
            string[] paramaters = [userId];

            JArray dbReturn = new DatabaseConnection(Configuration).GetDatabaseData(sql, paramaterNames, paramaters, false);
            if (dbReturn.Count < 1)
            {
                return Content(dbReturn.ToString(), "application/json");
            }
            else
            {
                return BadRequest(((JObject)dbReturn[0]).ToString());
            }



            //return Ok("not finished yet");
        }






    }
}
