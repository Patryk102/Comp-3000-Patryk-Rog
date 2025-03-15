using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json.Nodes;
using Microsoft.Data.SqlClient;
using Swashbuckle.AspNetCore.Swagger;
using System.Data.SqlTypes;

namespace _3000BackendDatabase.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        public IConfiguration Configuration { get; }
        public AccountsController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var claims = jwtToken.Claims.ToDictionary(c => c.Type, c => c.Value);

            JObject jClaim = JObject.FromObject(claims);



            String email = jClaim["email"].ToString();
            String userId = jClaim["sub"].ToString();

            String connectionString = Configuration.GetConnectionString("Default");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                string sql = "SELECT name, surname, email FROM BOOKING.[User] WHERE user_id = @user_id";
                

                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@user_id", userId);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        var dataTable = new System.Data.DataTable();
                        dataTable.Load(reader);

                        string json = JsonConvert.SerializeObject(dataTable);
                        JArray jArray = JArray.Parse(json);
                        JObject jObj = (JObject)jArray[0];

                        if (jObj["email"].ToString() == email)
                        {
                            return Content(json, "application/json");
                        }
                        else
                        {
                            return Unauthorized("Email doesnt match email in jwt token");
                        }
                    }
                }
            }
        }


        [HttpPost]
        public IActionResult Accounts([FromBody] dynamic model)
        {
            JObject inputJson;
            try
            {
                inputJson = JObject.Parse(model.ToString());
            }catch (Exception ex)
            {
                return BadRequest("Json incorrect structure");
            }



            //email, password, name, surname, dateOfBirth
            
            var email = inputJson["email"]?.ToString();
            var password = inputJson["password"]?.ToString();
            var name = inputJson["name"]?.ToString();
            var surname = inputJson["surname"]?.ToString();
            var dateOfBirth = inputJson["dateOfBirth"]?.ToString();
            
            if (email != null && password != null && name != null && surname != null && dateOfBirth != null)
            {
                //Here I will valdate the input data
                //The system will use codes so that the client after can also know which fields were bad so that
                //I dont need to repeat the validation process twice and it just returns what was incorrect

                if (!email.Contains("@"))
                {
                    return BadRequest("The email must contain @");
                }
                if (password.Length < 8 || !(password.Contains("!") || password.Contains("@") || password.Contains("#") || password.Contains("?")))
                {
                    return BadRequest("The password must contain at least 8 characters and a special character from the following !@#?");
                }
                if (name.Any(char.IsDigit) || name.Length < 1)
                {
                    //Split this into separate requrests later
                    //also add check for special characters
                    return BadRequest("The name cant contain numbers and has to be at least 1 character long");
                }
                if (surname.Any(char.IsDigit) ||  surname.Length < 1)
                {
                    return BadRequest("The surname cant contain numbers and has to be at least 1 character long");
                }

                //Finish date of birth validation


                //Here make a connection and actually send off the data

                String sqlString = "EXEC BOOKING.Create_user @name = @inpName , @surname = @inpSurname , @dateOfBirth = @inpDateOfBirth , @password = @inpPassword , @email = @inpEmail;";

                String[] paramNames = { "@inpName", "@inpSurname", "@inpDateOfBirth", "@inpPassword", "@inpEmail"};
                //String[] paramValues = { "testName", "testSurname", "2000-10-10", "password123!", "hello@hello.com"};
                String[] paramValues = { name, surname, dateOfBirth, password, email };


                JArray connectionReturn = new DatabaseConnection(Configuration).GetDatabaseData(sqlString, paramNames, paramValues, false);

                return Ok(connectionReturn.ToString());
            }
            else
            {
                return BadRequest("email, password, name, surname and date of birth must be included");
            }
        }

        [Route("/create/staff/user")]
        [HttpPost]
        public IActionResult staffAccounts([FromBody] dynamic model)
        {
            JObject inputJson;
            try
            {
                inputJson = JObject.Parse(model.ToString());
            }
            catch (Exception ex)
            {
                return BadRequest("Json incorrect structure");
            }



            //email, password, name, surname, dateOfBirth

            var email = inputJson["email"]?.ToString();
            var password = inputJson["password"]?.ToString();
            var name = inputJson["name"]?.ToString();
            var surname = inputJson["surname"]?.ToString();
            var dateOfBirth = inputJson["dateOfBirth"]?.ToString();

            if (email != null && password != null && name != null && surname != null && dateOfBirth != null)
            {
                //Here I will valdate the input data
                //The system will use codes so that the client after can also know which fields were bad so that
                //I dont need to repeat the validation process twice and it just returns what was incorrect

                if (!email.Contains("@"))
                {
                    return BadRequest("The email must contain @");
                }
                if (password.Length < 8 || !(password.Contains("!") || password.Contains("@") || password.Contains("#") || password.Contains("?")))
                {
                    return BadRequest("The password must contain at least 8 characters and a special character from the following !@#?");
                }
                if (name.Any(char.IsDigit) || name.Length < 1)
                {
                    //Split this into separate requrests later
                    //also add check for special characters
                    return BadRequest("The name cant contain numbers and has to be at least 1 character long");
                }
                if (surname.Any(char.IsDigit) || surname.Length < 1)
                {
                    return BadRequest("The surname cant contain numbers and has to be at least 1 character long");
                }

                //Finish date of birth validation


                //Here make a connection and actually send off the data

                String sqlString = "EXEC BOOKING.Create_restaurant_user @name = @inpName , @surname = @inpSurname , @date_of_birth = @inpDateOfBirth , @password = @inpPassword , @email = @inpEmail, @account_type = 'user', @restaurant_id = null;";

                String[] paramNames = { "@inpName", "@inpSurname", "@inpDateOfBirth", "@inpPassword", "@inpEmail" };
                //String[] paramValues = { "testName", "testSurname", "2000-10-10", "password123!", "hello@hello.com"};
                String[] paramValues = { name, surname, dateOfBirth, password, email };


                JArray connectionReturn = new DatabaseConnection(Configuration).GetDatabaseData(sqlString, paramNames, paramValues, false);

                return Ok(connectionReturn.ToString());
            }
            else
            {
                return BadRequest("email, password, name, surname and date of birth must be included");
            }
        }


        [Authorize]
        [Route("account/user")]
        [HttpGet]
        public IActionResult GetUserAccount()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var claims = jwtToken.Claims.ToDictionary(c => c.Type, c => c.Value);

            JObject jClaim = JObject.FromObject(claims);



            String email = jClaim["email"].ToString();
            String userId = jClaim["sub"].ToString();

            String connectionString = Configuration.GetConnectionString("Default");
            string sqlString = "SELECT name, surname, email, dateOfBirth FROM BOOKING.[User] WHERE user_id = @user_id";
            string[] paramNames = ["@user_id"];
            string[] paramValues = [userId];

            JArray connectionReturn = new DatabaseConnection(Configuration).GetDatabaseData(sqlString, paramNames, paramValues, true);

            return Content(connectionReturn.ToString(), "application/json");


        }

        [Authorize]
        [Route("account/staff")]
        [HttpGet]
        public IActionResult GetStaffAccount()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var claims = jwtToken.Claims.ToDictionary(c => c.Type, c => c.Value);

            JObject jClaim = JObject.FromObject(claims);



            String email = jClaim["email"].ToString();
            String userId = jClaim["sub"].ToString();

            String connectionString = Configuration.GetConnectionString("Default");
            
            string sqlString = "SELECT name, surname, email, date_of_birth FROM BOOKING.[RestaurantUsers] WHERE user_id = @user_id";
            string[] paramNames = ["@user_id"];
            string[] paramValues = [userId];

            JArray connectionReturn = new DatabaseConnection(Configuration).GetDatabaseData(sqlString, paramNames, paramValues, true);

            return Content(connectionReturn.ToString(), "application/json");


        }


        [Authorize]
        [Route("account/edit/user")]
        [HttpPut]
        public IActionResult EditUserAccount([FromBody] dynamic model)
        {
            JObject inputJson;
            try
            {
                inputJson = JObject.Parse(model.ToString());
            }
            catch (Exception ex)
            {
                return BadRequest("Json incorrect structure");
            }

            var inputEmail = string.IsNullOrWhiteSpace(inputJson["email"]?.ToString()) ? null : inputJson["email"]?.ToString();
            var inputName = string.IsNullOrWhiteSpace(inputJson["name"]?.ToString()) ? null : inputJson["name"]?.ToString();
            var inputSurname = string.IsNullOrWhiteSpace(inputJson["surname"]?.ToString()) ? null : inputJson["surname"]?.ToString();
            var inputPassword = string.IsNullOrWhiteSpace(inputJson["password"]?.ToString()) ? null : inputJson["password"]?.ToString();
            var inputDOB = string.IsNullOrWhiteSpace(inputJson["dateOfBirth"]?.ToString()) ? null : inputJson["dateOfBirth"]?.ToString();

            



            Console.WriteLine("WRITING SOMETHING");
            Console.WriteLine(inputName);


            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var claims = jwtToken.Claims.ToDictionary(c => c.Type, c => c.Value);

            JObject jClaim = JObject.FromObject(claims);



            String email = jClaim["email"].ToString();
            String userId = jClaim["sub"].ToString();



            string[] allInputs = [inputEmail, inputName,inputSurname, inputPassword, inputDOB, userId];
            string[] allInputNames = ["email", "name", "surname", "password", "dateOfBirth"];


            string getSqlString = "SELECT name, surname, email, dateOfBirth, password FROM BOOKING.[User] WHERE user_id = @user_id";
            string[] getParamNames = ["@user_id"];
            string[] getParamValues = [userId];
            JArray getConnectionReturn = new DatabaseConnection(Configuration).GetDatabaseData(getSqlString, getParamNames, getParamValues, true);
            Console.WriteLine("RETURNING A RETURN GET");
            Console.WriteLine(getConnectionReturn[0]["name"]);
            string getPassword = getConnectionReturn[0]["password"].ToString();


            for (int i = 0; i < allInputNames.Length; i++)
            {
                if (allInputs[i] == null)
                {
                    allInputs[i] = getConnectionReturn[0][allInputNames[i]].ToString();
                    if (i == 4)
                    {
                        DateTime dateTime = DateTime.ParseExact(getConnectionReturn[0][allInputNames[i]].ToString(), "dd.MM.yyyy HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                        string formattedDate = dateTime.ToString("yyyy-MM-dd");
                        allInputs[i] = formattedDate;
                    }
                }
            }

            String connectionString = Configuration.GetConnectionString("Default");
            string sqlString = @"
UPDATE BOOKING.[User]
SET 
    name = @input_name,
    surname = @input_surname,
    email = @input_email,
    dateOfBirth = @input_dateOfBirth,
    password = @input_password
WHERE user_id = @user_id;
;

";
            string[] paramNames = ["@input_email", "@input_name", "@input_surname","@input_password", "@input_dateOfBirth", "@user_id"];
            string[] paramValues = [inputName, inputSurname, inputEmail, inputDOB, userId];

            JArray connectionReturn = new DatabaseConnection(Configuration).GetDatabaseData(sqlString, paramNames, allInputs, false);

            return Content(connectionReturn.ToString(), "application/json");


        }







    }
}
