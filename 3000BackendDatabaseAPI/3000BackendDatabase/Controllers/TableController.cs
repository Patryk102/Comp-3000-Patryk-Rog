using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;

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
            string user_id = model["user_id"].ToString();
            string booking_length_hours = model["booking_length_hours"].ToString();


            string sql = "EXEC BOOKING.[Create_table_booking] @table_id = @inp_table_id, @booking_date = @inp_booking_date, @booking_time = @inp_booking_time, @user_id = @inp_user_id, @booking_length_hours = @inp_booking_length_hours";

            string[] paramaters = [table_id, booking_date, booking_time, user_id, booking_length_hours];
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




    }
}
