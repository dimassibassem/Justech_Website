using System.Data.SqlClient;

namespace server.Models.DAL;

public static class DbConnection
{
    static string _dbConnnectionString =
        "Data Source=localhost;Initial Catalog=Justech;User ID=SA;Password=yourStrong(!)Password";
   
    public static SqlConnection GetConnection()
    {
        return new SqlConnection(_dbConnnectionString);
    } 
}