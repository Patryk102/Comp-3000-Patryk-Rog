namespace _3000BackendDatabase
{
    public class Users
    {
        public IConfiguration Configuration { get; set; }

        public Users(IConfiguration configuration)
        {
            Configuration = configuration;
        }
    }
}
