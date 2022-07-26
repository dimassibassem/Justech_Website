﻿namespace server.Models.DAL;
using System.Data;
using System.Data.SqlClient;
using Extensions;
using Entity;

public static class DalPartner
{
    private static bool CheckPartnerUnicityBy(string field, string value)
    {
        try
        {
            using SqlConnection cnn = DbConnection.GetConnection();
            cnn.Open();
            string strSql = @"  SELECT TOP 1 * 
                                        FROM [Partner] 
                                        WHERE [Partner].[" + field + @"] = @Value ";

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

    //add partner
    public static JsonResponse AddPartner(Partner partner)
    {
        JsonResponse jsonResponse = new JsonResponse();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            if (partner.CompanyName != null && CheckPartnerUnicityBy("CompanyName", partner.CompanyName))
            {
                connection.Open();

                string sql = @" INSERT INTO [Partner] ( CompanyName, Description,Thumbnail,Link) OUTPUT INSERTED.Id 
                                        VALUES (@CompanyName, @Description, @Thumbnail,@Link)";

                using SqlCommand command = new SqlCommand(sql, connection);

                if (String.IsNullOrEmpty(partner.CompanyName))
                    command.Parameters.AddWithValue("@CompanyName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@CompanyName", partner.CompanyName);

                if (String.IsNullOrEmpty(partner.Description))
                    command.Parameters.AddWithValue("@Description", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Description", partner.Description);

                if (partner.Thumbnail == null)
                    command.Parameters.AddWithValue("@Thumbnail", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Thumbnail", partner.ThumbnailName);


                if (String.IsNullOrEmpty(partner.Link))
                    command.Parameters.AddWithValue("@Link", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Link", partner.Link);


                long id = (long) command.ExecuteScalar();

                if (id > 0)
                {
                    jsonResponse.Success = true;
                    jsonResponse.Message = id.ToString();
                }

                else
                {
                    jsonResponse.Success = false;
                    jsonResponse.Message = "Partner already exists with the name";
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

    //update partner
    public static JsonResponse UpdatePartner(Partner partner)
    {
        JsonResponse jsonResponse = new JsonResponse();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();

            string sql = @" UPDATE [Partner] 
                                    SET 
                                        CompanyName=@CompanyName,
                                        Description=@Description,
                                        Thumbnail=@Thumbnail,
                                        Link=@Link
                                    WHERE Id=@Id";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;

                if (String.IsNullOrEmpty(partner.CompanyName))
                    command.Parameters.AddWithValue("@CompanyName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@CompanyName", partner.CompanyName);

                if (String.IsNullOrEmpty(partner.Description))
                    command.Parameters.AddWithValue("@Description", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Description", partner.Description);


                if (partner.Thumbnail == null)
                    command.Parameters.AddWithValue("@Thumbnail", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Thumbnail", partner.ThumbnailName);
                if (String.IsNullOrEmpty(partner.Link))
                    command.Parameters.AddWithValue("@Link", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Link", partner.Link);


                command.Parameters.AddWithValue("@Id", partner.Id);

                if (command.ExecuteNonQuery() == 1)
                {
                    jsonResponse.Success = true;
                    jsonResponse.Message = "Partner successfully updated !";
                }
                else
                {
                    jsonResponse.Success = false;
                    jsonResponse.Message = "Partner failed to updated !";
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

    //get all partners 
    public static List<Partner> GetAllPartners()
    {
        List<Partner> lstPartner = new List<Partner>();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" SELECT * 
                                    FROM [Partner] 
                                    ORDER BY Id DESC";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        Partner partner = new Partner
                        {
                            Id = long.Parse(dataReader["Id"].ToString()!),
                            CompanyName = dataReader["CompanyName"].ToString()!,
                            Description = dataReader["Description"].ToString()!,
                            ThumbnailName = dataReader["Thumbnail"].ToString()!,
                            Link = dataReader["Link"].ToString()!
                        };

                        lstPartner.Add(partner);
                    }
                }
            }

            connection.Close();
        }
        catch (Exception e)
        {
            throw e;
        }

        return lstPartner;
    }

    //get partner by
    public static Partner GetPartnerBy(string field, string fieldValue)
    {
        Partner partner = new Partner();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" SELECT TOP 1 * 
                                    FROM [Partner] 
                                    WHERE [Partner].[" + field + @"]=@Value";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("@Value", fieldValue);

                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    if (dataReader.Read())
                    {
                        partner.Id = long.Parse(dataReader["Id"].ToString()!);
                        partner.CompanyName = dataReader["CompanyName"].ToString()!;
                        partner.Description = dataReader["Description"].ToString()!;
                        partner.ThumbnailName = dataReader["Thumbnail"].ToString()!;
                        partner.Link = dataReader["Link"].ToString()!;
                    }
                }
            }

            connection.Close();
        }
        catch (Exception e)
        {
            throw e;
        }

        return partner;
    }

    //delete partner by 
    public static JsonResponse DeletePartnerBy(string field, string fieldValue)
    {
        JsonResponse jsonResponse = new JsonResponse();

        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" DELETE 
                                    FROM [Partner] 
                                    WHERE [Partner].[" + field + "]=@FieldValue";

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