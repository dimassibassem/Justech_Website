using System.Data.SqlClient;

namespace server.Models.DAL;

public class DatabaseReq
{
    public static void CreateDataBaseIfNotExists()
    {
        try
        {
            SqlConnection cnn = DbConnection.GetUserConnection();
            cnn.Open();
            string sql =
                @"IF NOT EXISTS (SELECT * from sys.databases  WHERE name = 'Justech' ) CREATE DATABASE Justech ;";


            using (SqlCommand command = new SqlCommand(sql, cnn))
                command.ExecuteNonQuery();
            cnn.Close();
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public static void CreateTable()
    {
        try
        {
            SqlConnection cnn = DbConnection.GetUserConnection();
            cnn.Open();
            string sql = @"IF NOT EXISTS (  SELECT * 
                                                FROM Justech 
                                                WHERE name = 'User') 
                                                    CREATE TABLE [dbo].[User] ( 
                                                        [Id] BIGINT IDENTITY (1, 1) NOT NULL,
                                                        [FirstName] NVARCHAR (50) NOT NULL,
                                                        [LastName] NVARCHAR (50) NOT NULL,
                                                        [Email] NVARCHAR (50) NOT NULL, 
                                                        [Password] NVARCHAR (MAX) NOT NULL,
                                                );";

            using (SqlCommand command = new SqlCommand(sql, cnn))
                command.ExecuteNonQuery();
            cnn.Close();
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public static void CheckDb()
    {
        CreateDataBaseIfNotExists();
        CreateTable();
    }
}