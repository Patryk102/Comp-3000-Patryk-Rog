using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;

namespace _3000BackendDatabase.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        public IConfiguration Configuration { get; }
        public UsersController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        
        [HttpGet]
        public IActionResult Get()
        {
            string connectionString = Configuration.GetConnectionString("Default");


            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sql = "SELECT * FROM BOOKING.[User]";
                
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        var dataTable = new System.Data.DataTable();
                        dataTable.Load(reader);

                        string json = JsonConvert.SerializeObject(dataTable);
                        return Content(json, "application/json");

                    }



                }


            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            string connectionString = Configuration.GetConnectionString("Default");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sql = "SELECT * FROM BOOKING.[UserAccount](" + id + ")";

                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        var dataTable = new System.Data.DataTable();
                        dataTable.Load(reader);
                        string json = JsonConvert.SerializeObject(dataTable);
                        return Content(json, "application/json");
                    }
                }



            }



        }

        [Route("/user/delete")]
        [Authorize]
        [HttpDelete]
        public IActionResult DeleteStaffUser()
        {
            string sql = @"
BEGIN TRY
BEGIN TRANSACTION;

DELETE FROM BOOKING.[TableBookings]
WHERE user_id = @inp_user_id;

DELETE FROM BOOKING.[User]
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
