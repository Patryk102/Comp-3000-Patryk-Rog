using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json.Linq;


namespace _3000BackendDatabase.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        //private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        
        public LoginController(/*UserManager<IdentityUser> userManager,*/ IConfiguration configuration)
        {
            //_userManager = userManager;
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult Login([FromBody] dynamic models)
        {
            JObject model = JObject.Parse(models.ToString());
            
            string email = model["email"].ToString();
     
            string password = model["password"].ToString();
            string connectionString = _configuration.GetConnectionString("Default");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sql = "SELECT user_id, email, password FROM BOOKING.[User] WHERE email = @email";
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@email", email);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            string dbEmail = reader["email"].ToString();
                            string dbPassword = reader["password"].ToString();
                            string dbUserId = reader["user_id"].ToString();
                            if (dbPassword == password)
                            {
                                var token = GenerateJwtToken(dbEmail, dbUserId);
                                return Ok(new { token });
                            }
                        }
                    }
                }
                return Unauthorized();


            }



        }





        private string GenerateJwtToken(string email, string user_id)
        {
            var claims = new[]
            {
                //new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Sub, user_id),
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var Token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: creds);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(Token);
            Console.WriteLine($"Generated Token: {tokenString}");


            return tokenString;

        }

        [HttpGet]
        public String someKey()
        {
            return _configuration["Jwt:Key"];
        }

        

        
    }
}
