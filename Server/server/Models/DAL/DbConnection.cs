using System.Data.SqlClient;

namespace server.Models.DAL;

public static class DbConnection
{
    static string _dbConnnectionStringToUser =
        "Data Source=localhost;Initial Catalog=Justech;User ID=SA;Password=yourStrong(!)Password";
   static string _dbConnnectionToPartner =
        "Data Source=localhost;Initial Catalog=Justech;User ID=SA;Password=yourStrong(!)Password";


    public static SqlConnection GetUserConnection()
    {
        return new SqlConnection(_dbConnnectionStringToUser);
    }    public static SqlConnection GetPartnerConnection()
    {
        return new SqlConnection(_dbConnnectionStringToUser);
    }
}