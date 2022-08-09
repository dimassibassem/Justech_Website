using System.Data;
using System.Data.SqlClient;
using server.Extensions;
using server.Models.Entity;

namespace server.Models.DAL;

public class DalContact
{
    public static JsonResponse AddContact(Contact contact)
    {
        JsonResponse jsonResponse = new JsonResponse();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            {
                connection.Open();

                string sql =
                    @" INSERT INTO [Contact] ( FirstName, LastName, Email, Phone , Company , Subject , Message,Address) OUTPUT INSERTED.Id 
                                        VALUES (@FirstName, @LastName, @Email, @Phone, @Company, @Subject, @Message,@Address)";

                using SqlCommand command = new SqlCommand(sql, connection);

                if (String.IsNullOrEmpty(contact.FirstName))
                    command.Parameters.AddWithValue("@FirstName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@FirstName", contact.FirstName);

                if (String.IsNullOrEmpty(contact.LastName))
                    command.Parameters.AddWithValue("@LastName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@LastName", contact.LastName);

                if (String.IsNullOrEmpty(contact.Email))
                    command.Parameters.AddWithValue("@Email", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Email", contact.Email);

                if (String.IsNullOrEmpty(contact.Phone))
                    command.Parameters.AddWithValue("@Phone", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Phone", contact.Phone);
                if (String.IsNullOrEmpty(contact.Company))
                    command.Parameters.AddWithValue("@Company", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Company", contact.Company);
                if (String.IsNullOrEmpty(contact.Subject))
                    command.Parameters.AddWithValue("@Subject", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Subject", contact.Subject);
                if (String.IsNullOrEmpty(contact.Message))
                    command.Parameters.AddWithValue("@Message", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Message", contact.Message);
                if (String.IsNullOrEmpty(contact.Address))
                    command.Parameters.AddWithValue("@Address", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Address", contact.Address);

                long id = (long) command.ExecuteScalar();

                if (id > 0)
                {
                    jsonResponse.Success = true;
                    jsonResponse.Message = id.ToString();
                }
            }


            connection.Close();
        }
        catch (Exception e)
        {
            jsonResponse.Success = false;
            jsonResponse.Message = "INSERT CONTACT ERROR !!";
        }

        return jsonResponse;
    }

    //update contact
    public static JsonResponse UpdateContact(Contact contact)
    {
        JsonResponse jsonResponse = new JsonResponse();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" UPDATE [Contact] 
                                    SET 
                                        FirstName=@FirstName,
                                        LastName=@LastName,
                                        Email=@Email,
                                        Phone=@Phone,
                                        Company=@Company,
                                        Subject=@Subject,
                                        Message=@Message,
                                        Address=@Address
                                    WHERE Id=@Id";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;

                if (String.IsNullOrEmpty(contact.FirstName))
                    command.Parameters.AddWithValue("@FirstName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@FirstName", contact.FirstName);

                if (String.IsNullOrEmpty(contact.LastName))
                    command.Parameters.AddWithValue("@LastName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@LastName", contact.LastName);


                if (String.IsNullOrEmpty(contact.Email))
                    command.Parameters.AddWithValue("@Email", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Email", contact.Email);
                if (String.IsNullOrEmpty(contact.Phone))
                    command.Parameters.AddWithValue("@Phone", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Phone", contact.Phone);
                if (String.IsNullOrEmpty(contact.Company))
                    command.Parameters.AddWithValue("@Company", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Company", contact.Company);
                if (String.IsNullOrEmpty(contact.Subject))
                    command.Parameters.AddWithValue("@Subject", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Subject", contact.Subject);
                if (String.IsNullOrEmpty(contact.Message))
                    command.Parameters.AddWithValue("@Message", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Message", contact.Message);
                if (String.IsNullOrEmpty(contact.Address))
                    command.Parameters.AddWithValue("@Address", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Address", contact.Address);


                command.Parameters.AddWithValue("@Id", contact.Id);

                if (command.ExecuteNonQuery() == 1)
                {
                    jsonResponse.Success = true;
                    jsonResponse.Message = "Contact successful updated !";
                }
                else
                {
                    jsonResponse.Success = false;
                    jsonResponse.Message = "Failed to update Contact !";
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

    //get all contacts 
    public static List<Contact> GetAllContacts()
    {
        List<Contact> lstContact = new List<Contact>();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" SELECT * 
                                    FROM [Contact] 
                                    ORDER BY Id DESC";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        Contact contact = new Contact
                        {
                            Id = long.Parse(dataReader["Id"].ToString()!),
                            FirstName = dataReader["FirstName"].ToString()!,
                            LastName = dataReader["LastName"].ToString()!,
                            Email = dataReader["Email"].ToString()!,
                            Phone = dataReader["Phone"].ToString()!,
                            Company = dataReader["Company"].ToString()!,
                            Subject = dataReader["Subject"].ToString()!,
                            Message = dataReader["Message"].ToString()!,
                            Address = dataReader["Address"].ToString()!,
                        };

                        lstContact.Add(contact);
                    }
                }
            }

            connection.Close();
        }
        catch (Exception e)
        {
            throw e;
        }

        return lstContact;
    }

    //get contact by
    public static Contact GetContactBy(string field, string fieldValue)
    {
        Contact contact = new Contact();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" SELECT TOP 1 * 
                                    FROM [Contact] 
                                    WHERE [Contact].[" + field + @"]=@Value";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("@Value", fieldValue);

                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    if (dataReader.Read())
                    {
                        contact.Id = long.Parse(dataReader["Id"].ToString()!);
                        contact.FirstName = dataReader["FirstName"].ToString()!;
                        contact.LastName = dataReader["LastName"].ToString()!;
                        contact.Email = dataReader["Email"].ToString()!;
                        contact.Phone = dataReader["Phone"].ToString()!;
                        contact.Company = dataReader["Company"].ToString()!;
                        contact.Subject = dataReader["Subject"].ToString()!;
                        contact.Message = dataReader["Message"].ToString()!;
                        contact.Address = dataReader["Address"].ToString()!;
                    }
                }
            }

            connection.Close();
        }
        catch (Exception e)
        {
            throw e;
        }

        return contact;
    }

    //get all contacts by
    public static List<Contact> GetAllContactsBy(string field, string value)
    {
        List<Contact> lstContact = new List<Contact>();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" SELECT * 
                                    FROM [Contact] 
                                    WHERE [Contact].[" + field + @"]=@Field";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("@Field", value);

                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        Contact contact = new Contact();

                        contact.Id = long.Parse(dataReader["Id"].ToString()!);
                        contact.FirstName = dataReader["FirstName"].ToString();
                        contact.LastName = dataReader["LastName"].ToString()!;
                        contact.Email = dataReader["Email"].ToString()!;
                        contact.Phone = dataReader["Phone"].ToString()!;
                        contact.Company = dataReader["Company"].ToString()!;
                        contact.Subject = dataReader["Subject"].ToString()!;
                        contact.Message = dataReader["Message"].ToString()!;
                        contact.Address = dataReader["Address"].ToString()!;
                        lstContact.Add(contact);
                    }
                }
            }

            connection.Close();
        }
        catch (Exception e)
        {
            throw e;
        }

        return lstContact;
    }

    //delete contact by 
    public static JsonResponse DeleteContactBy(string field, string fieldValue)
    {
        JsonResponse jsonResponse = new JsonResponse();

        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" DELETE 
                                    FROM [Contact] 
                                    WHERE [Contact].[" + field + "]=@FieldValue";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("@FieldValue", fieldValue);

                if (command.ExecuteNonQuery() == 1)
                {
                    jsonResponse.Success = true;
                    jsonResponse.Message = "Contact deleted successfully! !";
                }
                else
                {
                    jsonResponse.Success = false;
                    jsonResponse.Message = "Failed to delete Contact !";
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