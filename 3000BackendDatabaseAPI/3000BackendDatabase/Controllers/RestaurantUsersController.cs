using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System.Data.SqlTypes;

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
    }
}
