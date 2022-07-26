using System.Data.SqlClient;

namespace server.Models

{
    public static class DbConnection
    {
        static string _dbConnnectionString = "Data Source=serverName;Initial Catalog=serverDbName;User Id=serverUserName;Password=serverUserPassword;";
        public static SqlConnection GetConnection()
        {
            return new SqlConnection(_dbConnnectionString);
        }

    }
}
