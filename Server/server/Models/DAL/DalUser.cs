using System.Data;
using System.Data.SqlClient;
using server.Extensions;
using server.Models.Entity;

namespace server.Models.DAL
{
    public class DalUser
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
        public static void CreateTable()
        {
            try
            {
                SqlConnection cnn = DbConnection.GetConnection();
                cnn.Open();
                string sql = @"IF NOT EXISTS (  SELECT * 
                                                FROM sysobjects 
                                                WHERE name = 'User') 
                                                    CREATE TABLE [dbo].[User] ( 
                                                        [Id] BIGINT IDENTITY (1, 1) NOT NULL,
                                                        [Code] NVARCHAR (20) NOT NULL,
                                                        [FirstName] NVARCHAR (50) NOT NULL,
                                                        [LastName] NVARCHAR (50) NOT NULL,
                                                        [DateOfBirth] DATETIME NULL,
                                                        [Profession] NVARCHAR(50) NOT NULL,
                                                        [Gender] NVARCHAR(50) NOT NULL,
                                                        [Email] NVARCHAR (50) NOT NULL, 
                                                        [EmailConfirmed] BIT DEFAULT 0,
                                                        [EmailConfirmationCode] NVARCHAR (6) NULL, 
                                                        [CodeExpirationDate] DATETIME NULL,
                                                        [Password] NVARCHAR (MAX) NOT NULL,
                                                        [Phone] NVARCHAR (50) NOT NULL, 
                                                        [Country] NVARCHAR (30) NOT NULL,
                                                        [Adress] NVARCHAR (MAX) NOT NULL,
                                                        [PostalCode] NVARCHAR (10) NOT NULL, 
                                                        [Photo] NVARCHAR (MAX) NULL,
                                                        PRIMARY KEY CLUSTERED ([Id] ASC) 
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

        //add user
        public static JsonResponse AddUser(User user)
        {
            JsonResponse jsonResponse = new JsonResponse();
            try
            {
                Random Alea = new Random();

                user.Code = Alea.Next(10000, 999999).ToString();

                using SqlConnection connection = DbConnection.GetConnection();
                if (CheckUserUnicityBy("Email", user.Email))
                {
                    connection.Open();

                    string sql = @" INSERT INTO [User] (Code, FirstName, LastName, DateOfBirth, Profession, Gender, Email, EmailConfirmed,EmailConfirmationCode, CodeExpirationDate, Password, Phone, Country, Adress, PostalCode,Photo) OUTPUT INSERTED.Id 
                                        VALUES (@Code, @FirstName, @LastName, @DateOfBirth, @Profession, @Gender, @Email,@EmailConfirmed, @EmailConfirmationCode,@CodeExpirationDate, @Password, @Phone, @Country, @Adress,@PostalCode, @Photo)";

                    using SqlCommand command = new SqlCommand(sql, connection);
                    if (String.IsNullOrEmpty(user.Code))
                        command.Parameters.AddWithValue("@Code", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Code", user.Code);

                    if (String.IsNullOrEmpty(user.FirstName))
                        command.Parameters.AddWithValue("@FirstName", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@FirstName", user.FirstName);

                    if (String.IsNullOrEmpty(user.LastName))
                        command.Parameters.AddWithValue("@LastName", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@LastName", user.LastName);

                    if (user.DateOfBirth == new DateTime())
                        command.Parameters.AddWithValue("@DateOfBirth", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@DateOfBirth", user.DateOfBirth);

                    if (String.IsNullOrEmpty(user.Profession))
                        command.Parameters.AddWithValue("@Profession", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Profession", user.Profession);

                    if (String.IsNullOrEmpty(user.Gender))
                        command.Parameters.AddWithValue("@Gender", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Gender", user.Gender);

                    if (String.IsNullOrEmpty(user.Email))
                        command.Parameters.AddWithValue("@Email", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Email", user.Email);

                    if (String.IsNullOrEmpty(user.EmailConfirmed.ToString()))
                        command.Parameters.AddWithValue("@EmailConfirmed", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@EmailConfirmed", user.EmailConfirmed);

                    if (String.IsNullOrEmpty(user.EmailConfirmationCode))
                        command.Parameters.AddWithValue("@EmailConfirmationCode", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@EmailConfirmationCode", user.EmailConfirmationCode);

                    if (user.CodeExpirationDate == new DateTime())
                        command.Parameters.AddWithValue("@CodeExpirationDate", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@CodeExpirationDate", user.CodeExpirationDate);

                    if (String.IsNullOrEmpty(user.Password))
                        command.Parameters.AddWithValue("@Password", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Password", user.Password);

                    if (String.IsNullOrEmpty(user.Phone))
                        command.Parameters.AddWithValue("@Phone", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Phone", user.Phone);

                    if (String.IsNullOrEmpty(user.Country))
                        command.Parameters.AddWithValue("@Country", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Country", user.Country);

                    if (String.IsNullOrEmpty(user.Adress))
                        command.Parameters.AddWithValue("@Adress", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Adress", user.Adress);

                    if (user.PostalCode == 0)
                        command.Parameters.AddWithValue("@PostalCode", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@PostalCode", user.PostalCode);

                    if (user.Photo == null)
                        command.Parameters.AddWithValue("@Photo", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Photo", user.Photo.FileName);

                    long id = (long)command.ExecuteScalar();

                    if (id > 0)
                    {
                        jsonResponse.Success = true;
                        jsonResponse.Message = id.ToString();
                    }
                }
                else
                {
                    jsonResponse.Success = false;
                    jsonResponse.Message = "L'utilisateur existe déjà avec la même adresse e-mail";
                }
                connection.Close();
            }
            catch (Exception e)
            {
                jsonResponse.Success = false;
                jsonResponse.Message = "ERREUR INSERTION USER !!";
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
                                    SET Code=@Code,
                                        FirstName=@FirstName,
                                        LastName=@LastName,
                                        DateOfBirth=@DateOfBirth,
                                        Profession=@Profession,
                                        Gender=@Gender,
                                        Email=@Email,
                                        EmailConfirmed=@EmailConfirmed,
                                        EmailConfirmationCode=@EmailConfirmationCode,
                                        CodeExpirationDate=@CodeExpirationDate,
                                        Password=@Password,
                                        Phone=@Phone,
                                        Country=@Country,
                                        Adress=@Adress,
                                        PostalCode=@PostalCode,
                                        Photo=@Photo 
                                    WHERE Id=@Id";

                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.CommandType = CommandType.Text;

                    if (String.IsNullOrEmpty(user.Code))
                        command.Parameters.AddWithValue("@Code", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Code", user.Code);
                    if (String.IsNullOrEmpty(user.FirstName))
                        command.Parameters.AddWithValue("@FirstName", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@FirstName", user.FirstName);
                    if (String.IsNullOrEmpty(user.LastName))
                        command.Parameters.AddWithValue("@LastName", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@LastName", user.LastName);
                    if (user.DateOfBirth == new DateTime())
                        command.Parameters.AddWithValue("@DateOfBirth", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@DateOfBirth", user.DateOfBirth);
                    if (String.IsNullOrEmpty(user.Profession))
                        command.Parameters.AddWithValue("@Profession", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Profession", user.Profession);
                    if (String.IsNullOrEmpty(user.Gender))
                        command.Parameters.AddWithValue("@Gender", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Gender", user.Gender);
                    if (String.IsNullOrEmpty(user.Email))
                        command.Parameters.AddWithValue("@Email", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Email", user.Email);
                    if (String.IsNullOrEmpty(user.EmailConfirmed.ToString()))
                        command.Parameters.AddWithValue("@EmailConfirmed", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@EmailConfirmed", user.EmailConfirmed);
                    if (String.IsNullOrEmpty(user.EmailConfirmationCode))
                        command.Parameters.AddWithValue("@EmailConfirmationCode", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@EmailConfirmationCode", user.EmailConfirmationCode);
                    if (user.CodeExpirationDate == new DateTime())
                        command.Parameters.AddWithValue("@CodeExpirationDate", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@CodeExpirationDate", user.CodeExpirationDate);
                    if (String.IsNullOrEmpty(user.Password))
                        command.Parameters.AddWithValue("@Password", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Password", user.Password);
                    if (String.IsNullOrEmpty(user.Phone))
                        command.Parameters.AddWithValue("@Phone", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Phone", user.Phone);
                    if (String.IsNullOrEmpty(user.Country))
                        command.Parameters.AddWithValue("@Country", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Country", user.Country);
                    if (String.IsNullOrEmpty(user.Adress))
                        command.Parameters.AddWithValue("@Adress", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Adress", user.Adress);
                    if (user.PostalCode == 0)
                        command.Parameters.AddWithValue("@PostalCode", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@PostalCode", user.PostalCode);
                    if (user.Photo == null)
                        command.Parameters.AddWithValue("@Photo", DBNull.Value);
                    else
                        command.Parameters.AddWithValue("@Photo", user.Photo.FileName);

                    command.Parameters.AddWithValue("@Id", user.Id);

                    if (command.ExecuteNonQuery() == 1)
                    {
                        jsonResponse.Success = true;
                        jsonResponse.Message = "La mise à jour de l'utilisateur est réussie !";
                    }
                    else
                    {
                        jsonResponse.Success = false;
                        jsonResponse.Message = "Échec de la mise à jour de l'utilisateur !";
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

        //get all users 
        public static List<User> GetAllUsers()
        {
            List<User> lstUser = new List<User>();
            try
            {
                using (SqlConnection connection = DbConnection.GetConnection())
                {
                    connection.Open();
                    string sql = @" SELECT * 
                                    FROM [User] 
                                    ORDER BY Id DESC";

                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.CommandType = CommandType.Text;
                        using (SqlDataReader dataReader = command.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                User user = new User();

                                user.Id = long.Parse(dataReader["Id"].ToString());
                                user.Code = dataReader["Code"].ToString();
                                user.FirstName = dataReader["FirstName"].ToString();
                                user.LastName = dataReader["LastName"].ToString();
                                user.DateOfBirth = DateTime.Parse(dataReader["DateOfBirth"].ToString());
                                user.Profession = dataReader["Profession"].ToString();
                                user.Gender = dataReader["Gender"].ToString();
                                user.Email = dataReader["Email"].ToString();
                                user.EmailConfirmed = dataReader["EmailConfirmed"].ToString() == "True" ? true : false;
                                user.EmailConfirmationCode = dataReader["EmailConfirmationCode"].ToString();
                                user.CodeExpirationDate = dataReader["CodeExpirationDate"].ToString() == "" ? new DateTime() : DateTime.Parse(dataReader["CodeExpirationDate"].ToString());
                                user.Password = dataReader["Password"].ToString();
                                user.Phone = dataReader["Phone"].ToString();
                                user.Country = dataReader["Country"].ToString();
                                user.Adress = dataReader["Adress"].ToString();
                                user.PostalCode = dataReader["PostalCode"].ToString() == "" ? 0 : int.Parse(dataReader["PostalCode"].ToString());
                                user.PhotoFileName = dataReader["Photo"].ToString();

                                lstUser.Add(user);
                            }
                        }
                    }
                    connection.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return lstUser;
        }

        //get user by
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
                            user.Id = long.Parse(dataReader["Id"].ToString());
                            user.Code = dataReader["Code"].ToString();
                            user.FirstName = dataReader["FirstName"].ToString();
                            user.LastName = dataReader["LastName"].ToString();
                            user.DateOfBirth = dataReader["DateOfBirth"].ToString() == "" ? new DateTime() : DateTime.Parse(dataReader["DateOfBirth"].ToString());
                            user.Profession = dataReader["Profession"].ToString();
                            user.Gender = dataReader["Gender"].ToString();
                            user.Email = dataReader["Email"].ToString();
                            user.EmailConfirmed = dataReader["EmailConfirmed"].ToString() == "True" ? true : false;
                            user.EmailConfirmationCode = dataReader["EmailConfirmationCode"].ToString();
                            user.CodeExpirationDate = dataReader["CodeExpirationDate"].ToString() == "" ? new DateTime() : DateTime.Parse(dataReader["CodeExpirationDate"].ToString());
                            user.Password = dataReader["Password"].ToString();
                            user.Phone = dataReader["Phone"].ToString();
                            user.Country = dataReader["Country"].ToString();
                            user.Adress = dataReader["Adress"].ToString();
                            user.PostalCode = dataReader["PostalCode"].ToString() == "" ? 0 : int.Parse(dataReader["PostalCode"].ToString());
                            user.PhotoFileName = dataReader["Photo"].ToString();
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

        //get all users by
        public static List<User> GetAllUsersBy(string field, string value)
        {
            List<User> lstUser = new List<User>();
            try
            {
                using (SqlConnection connection = DbConnection.GetConnection())
                {
                    connection.Open();
                    string sql = @" SELECT * 
                                    FROM [User] 
                                    WHERE [User].[" + field + @"]=@Field";

                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.CommandType = CommandType.Text;
                        command.Parameters.AddWithValue("@Field", value);

                        using (SqlDataReader dataReader = command.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                User user = new User();

                                user.Id = long.Parse(dataReader["Id"].ToString());
                                user.Code = dataReader["Code"].ToString();
                                user.FirstName = dataReader["FirstName"].ToString();
                                user.LastName = dataReader["LastName"].ToString();
                                user.DateOfBirth = dataReader["DateOfBirth"].ToString() == "" ? new DateTime() : DateTime.Parse(dataReader["DateOfBirth"].ToString());
                                user.Profession = dataReader["Profession"].ToString();
                                user.Gender = dataReader["Gender"].ToString();
                                user.Email = dataReader["Email"].ToString();
                                user.EmailConfirmed = dataReader["EmailConfirmed"].ToString() == "True" ? true : false;
                                user.EmailConfirmationCode = dataReader["EmailConfirmationCode"].ToString();
                                user.CodeExpirationDate = dataReader["CodeExpirationDate"].ToString() == "" ? new DateTime() : DateTime.Parse(dataReader["CodeExpirationDate"].ToString());
                                user.Password = dataReader["Password"].ToString();
                                user.Phone = dataReader["Phone"].ToString();
                                user.Country = dataReader["Country"].ToString();
                                user.Adress = dataReader["Adress"].ToString();
                                user.PostalCode = dataReader["PostalCode"].ToString() == "" ? 0 : int.Parse(dataReader["PostalCode"].ToString());
                                user.PhotoFileName = dataReader["Photo"].ToString();

                                lstUser.Add(user);
                            }
                        }
                    }
                    connection.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return lstUser;
        }

        //delete user by 
        public static JsonResponse DeleteUserBy(string field, string fieldValue)
        {
            JsonResponse jsonResponse = new JsonResponse();

            try
            {
                using (SqlConnection connection = DbConnection.GetConnection())
                {
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
                            jsonResponse.Message = "Suppression réussie !";
                        }
                        else
                        {
                            jsonResponse.Success = false;
                            jsonResponse.Message = "Échec de la suppression !";
                        }
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
    }
}
