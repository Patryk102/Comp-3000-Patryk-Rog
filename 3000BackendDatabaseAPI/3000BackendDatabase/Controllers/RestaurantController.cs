using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Newtonsoft.Json.Linq;

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

        [HttpGet("id")]
        public IActionResult Get(int id)
        {
            //Get restaurant by id
            String sqlString = "SELECT * FROM BOOKING.[Restaurant] WHERE restaurant_id = @restaurant_id;";
            String[] paramNames = { "@restaurant_id" };
            String[] paramValues = { id.ToString() };
            JArray restaurant = new DatabaseConnection(Configuration).GetDatabaseData(sqlString, paramNames, paramValues, true);
            return Content(((JObject)restaurant[0]).ToString(), "application/json");
        }




    }
}
