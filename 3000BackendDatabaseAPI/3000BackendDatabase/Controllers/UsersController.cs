using Microsoft.AspNetCore.Mvc;

namespace _3000BackendDatabase.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
      


        

        public IConfiguration Configuration { get; }

        [HttpGet]
        public string Get()
        {
            string connectionString = Configuration.GetConnectionString("Default");








            return "hello";
        }
    }
}
