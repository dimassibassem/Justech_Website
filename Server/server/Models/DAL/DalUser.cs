﻿using System.Data;
using System.Data.SqlClient;
using server.Extensions;
using server.Models.Entity;
using BCryptNet = BCrypt.Net.BCrypt;

namespace server.Models.DAL;

public static class DalUser
{
    private static bool CheckUserUnicityBy(string field, string value)
    {
        try
        {
            using SqlConnection cnn = DbConnection.GetConnection();
            cnn.Open();
            string strSql = @"  SELECT TOP 1 * 
                                        FROM [User] 
                                        WHERE [User].[" + field + @"] = @Value ";

            SqlCommand cmd = new SqlCommand(strSql, cnn);
            cmd.Parameters.AddWithValue("@Value", value);

            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    return false;
                }
            }

            cnn.Close();
        }
        catch (Exception e)
        {
            throw e;
        }

        return true;
    }


    //add user
    public static JsonResponse AddUser(User user)
    {
        JsonResponse jsonResponse = new JsonResponse();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            if (CheckUserUnicityBy("Email", user.Email))
            {
                connection.Open();

                string sql = @" INSERT INTO [User] ( FirstName, LastName, Email, Password) OUTPUT INSERTED.Id 
                                        VALUES (@FirstName, @LastName, @Email, @Password)";

                using SqlCommand command = new SqlCommand(sql, connection);

                if (String.IsNullOrEmpty(user.FirstName))
                    command.Parameters.AddWithValue("@FirstName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@FirstName", user.FirstName);

                if (String.IsNullOrEmpty(user.LastName))
                    command.Parameters.AddWithValue("@LastName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@LastName", user.LastName);

                if (String.IsNullOrEmpty(user.Email))
                    command.Parameters.AddWithValue("@Email", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Email", user.Email);

                if (String.IsNullOrEmpty(user.Password))
                    command.Parameters.AddWithValue("@Password", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Password", BCryptNet.HashPassword(user.Password));

                long id = (long) command.ExecuteScalar();

                if (id > 0)
                {
                    jsonResponse.Success = true;
                    jsonResponse.Message = id.ToString();
                }
            }
            else
            {
                jsonResponse.Success = false;
                jsonResponse.Message = "User already exists with the same email address";
            }

            connection.Close();
        }
        catch (Exception e)
        {
            jsonResponse.Success = false;
            jsonResponse.Message = "INSERT USER ERROR !!";
        }

        return jsonResponse;
    }

    //update user
    public static JsonResponse UpdateUser(User user)
    {
        JsonResponse jsonResponse = new JsonResponse();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" UPDATE [User] 
                                    SET 
                                        FirstName=@FirstName,
                                        LastName=@LastName,
                                        Email=@Email,
                                        Password=@Password
                                    WHERE Id=@Id";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;

                if (String.IsNullOrEmpty(user.FirstName))
                    command.Parameters.AddWithValue("@FirstName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@FirstName", user.FirstName);

                if (String.IsNullOrEmpty(user.LastName))
                    command.Parameters.AddWithValue("@LastName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@LastName", user.LastName);


                if (String.IsNullOrEmpty(user.Email))
                    command.Parameters.AddWithValue("@Email", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Email", user.Email);

                if (String.IsNullOrEmpty(user.Password))
                    command.Parameters.AddWithValue("@Password", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Password", BCryptNet.HashPassword(user.Password));
                command.Parameters.AddWithValue("@Id", user.Id);

                if (command.ExecuteNonQuery() == 1)
                {
                    jsonResponse.Success = true;
                    jsonResponse.Message = "User successful updated !";
                }
                else
                {
                    jsonResponse.Success = false;
                    jsonResponse.Message = "Failed to update user !";
                }
            }

            connection.Close();
        }
        catch (Exception e)
        {
            jsonResponse.Success = false;
            jsonResponse.Message = e.Message;
        }

        return jsonResponse;
    }
    

    //delete user by 
    public static JsonResponse DeleteUserBy(string field, string fieldValue)
    {
        JsonResponse jsonResponse = new JsonResponse();

        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" DELETE 
                                    FROM [User] 
                                    WHERE [User].[" + field + "]=@FieldValue";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("@FieldValue", fieldValue);

                if (command.ExecuteNonQuery() == 1)
                {
                    jsonResponse.Success = true;
                    jsonResponse.Message = "User deleted successfully! !";
                }
                else
                {
                    jsonResponse.Success = false;
                    jsonResponse.Message = "Failed to delete User !";
                }
            }

            connection.Close();
        }
        catch (Exception e)
        {
            jsonResponse.Success = false;
            jsonResponse.Message = e.Message;
        }

        return jsonResponse;
    }
}