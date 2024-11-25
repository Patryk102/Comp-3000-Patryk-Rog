using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Data.SqlClient;

namespace _3000BackendDatabase
{
    public class DatabaseConnection
    {
        public IConfiguration Configuration { get; }

        public DatabaseConnection(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public JArray GetDatabaseData(String sqlString, string[] paramaterNames, string[] paramaterData, Boolean returnsData)
        {
            var connectionString = Configuration.GetConnectionString("Default");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(sqlString, connection))
                {
                    //add for loop to loop paramaters
                    for (int i = 0; i < paramaterNames.Length; i++)
                    {
                        command.Parameters.AddWithValue(paramaterNames[i], paramaterData[i]);
                        Console.WriteLine(paramaterNames[i]);
                    }
                    try
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            var dataTable = new System.Data.DataTable();
                            dataTable.Load(reader);

                            if (returnsData == false)
                            {
                                return new JArray();
                            }

                            string json = JsonConvert.SerializeObject(dataTable);
                            JArray jArray = JArray.Parse(json);
                            
                            return jArray;
                        }
                    }catch(Exception ex)
                    {
                        return new JArray(new JObject(new JProperty("error", "Error while reading data:" + ex.Message)));
                    }


                }
            }
        }


    }
}
