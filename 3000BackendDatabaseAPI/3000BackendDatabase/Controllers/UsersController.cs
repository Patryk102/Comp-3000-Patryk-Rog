using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

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

        [Authorize]
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



    }
}
