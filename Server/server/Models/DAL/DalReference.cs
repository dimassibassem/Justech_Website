namespace server.Models.DAL;
using System.Data;
using System.Data.SqlClient;
using Extensions;
using Entity;

public class DalReference
{
    private static bool CheckReferenceUnicityBy(string field, string value)
    {
        try
        {
            using SqlConnection cnn = DbConnection.GetConnection();
            cnn.Open();
            string strSql = @"  SELECT TOP 1 * 
                                        FROM [Reference] 
                                        WHERE [Reference].[" + field + @"] = @Value ";

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

    //add reference
    public static JsonResponse AddReference(Reference reference)
    {
        JsonResponse jsonResponse = new JsonResponse();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            if (reference.ReferenceName != null && CheckReferenceUnicityBy("ReferenceName", reference.ReferenceName))
            {
                connection.Open();

                string sql = @" INSERT INTO [Reference] ( ReferenceName,Thumbnail) OUTPUT INSERTED.Id 
                                        VALUES (@ReferenceName, @Thumbnail)";

                using SqlCommand command = new SqlCommand(sql, connection);

                if (String.IsNullOrEmpty(reference.ReferenceName))
                    command.Parameters.AddWithValue("@ReferenceName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@ReferenceName", reference.ReferenceName);
                if (reference.Thumbnail == null)
                    command.Parameters.AddWithValue("@Thumbnail", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Thumbnail", reference.ThumbnailName);
                
                long id = (long) command.ExecuteScalar();

                if (id > 0)
                {
                    jsonResponse.Success = true;
                    jsonResponse.Message = id.ToString();
                }

                else
                {
                    jsonResponse.Success = false;
                    jsonResponse.Message = "Reference already exists with the name";
                }

                connection.Close();
            }
        }
        catch (Exception e)
        {
            jsonResponse.Success = false;
            jsonResponse.Message = e.Message;
        }

        return jsonResponse;
    }

    //update reference
    public static JsonResponse UpdateReference(Reference reference)
    {
        JsonResponse jsonResponse = new JsonResponse();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();

            string sql = @" UPDATE [Reference] 
                                    SET 
                                        ReferenceName=@ReferenceName,
                                        Thumbnail=@Thumbnail,
                                    WHERE Id=@Id";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;

                if (String.IsNullOrEmpty(reference.ReferenceName))
                    command.Parameters.AddWithValue("@ReferenceName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@ReferenceName", reference.ReferenceName);
                
                if (reference.Thumbnail == null)
                    command.Parameters.AddWithValue("@Thumbnail", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Thumbnail", reference.ThumbnailName);
                
                command.Parameters.AddWithValue("@Id", reference.Id);

                if (command.ExecuteNonQuery() == 1)
                {
                    jsonResponse.Success = true;
                    jsonResponse.Message = "Reference successfully updated !";
                }
                else
                {
                    jsonResponse.Success = false;
                    jsonResponse.Message = "Reference failed to updated !";
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

    //get all references 
    public static List<Reference> GetAllReferences()
    {
        List<Reference> lstReference = new List<Reference>();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" SELECT * 
                                    FROM [Reference] 
                                    ORDER BY Id DESC";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        Reference reference = new Reference
                        {
                            Id = long.Parse(dataReader["Id"].ToString()!),
                            ReferenceName = dataReader["ReferenceName"].ToString()!,
                            ThumbnailName = dataReader["Thumbnail"].ToString()!,
                        };

                        lstReference.Add(reference);
                    }
                }
            }

            connection.Close();
        }
        catch (Exception e)
        {
            throw e;
        }

        return lstReference;
    }

    //get reference by
    public static Reference GetReferenceBy(string field, string fieldValue)
    {
        Reference reference = new Reference();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" SELECT TOP 1 * 
                                    FROM [Reference] 
                                    WHERE [Reference].[" + field + @"]=@Value";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("@Value", fieldValue);

                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    if (dataReader.Read())
                    {
                        reference.Id = long.Parse(dataReader["Id"].ToString()!);
                        reference.ReferenceName = dataReader["ReferenceName"].ToString()!;
                        reference.ThumbnailName = dataReader["Thumbnail"].ToString()!;
                    }
                }
            }

            connection.Close();
        }
        catch (Exception e)
        {
            throw e;
        }

        return reference;
    }

    //delete reference by 
    public static JsonResponse DeleteReferenceBy(string field, string fieldValue)
    {
        JsonResponse jsonResponse = new JsonResponse();

        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" DELETE 
                                    FROM [Reference] 
                                    WHERE [Reference].[" + field + "]=@FieldValue";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("@FieldValue", fieldValue);

                if (command.ExecuteNonQuery() == 1)
                {
                    jsonResponse.Success = true;
                    jsonResponse.Message = "Successfully deleted !";
                }
                else
                {
                    jsonResponse.Success = false;
                    jsonResponse.Message = "Delete Failed !";
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