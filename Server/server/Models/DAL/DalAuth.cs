using System.Data;
using System.Data.SqlClient;
using server.Extensions;
using server.Models.Entity;

namespace server.Models.DAL;

public class DalAuth
{
    public static User GetUserBy(string field, string fieldValue)
    {
        User user = new User();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" SELECT TOP 1 * 
                                    FROM [User] 
                                    WHERE [User].[" + field + @"]=@Value";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("@Value", fieldValue);

                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    if (dataReader.Read())
                    {
                        user.Id = long.Parse(dataReader["Id"].ToString()!);
                        user.FirstName = dataReader["FirstName"].ToString()!;
                        user.LastName = dataReader["LastName"].ToString()!;
                        user.Password = dataReader["Password"].ToString()!;
                        user.Email = dataReader["Email"].ToString()!;
                    }
                }
            }

            connection.Close();
        }
        catch (Exception e)
        {
            throw e;
        }

        return user;
    }
}