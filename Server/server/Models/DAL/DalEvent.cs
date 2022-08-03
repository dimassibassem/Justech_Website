namespace server.Models.DAL;

using System.Data;
using System.Data.SqlClient;
using Extensions;
using Entity;

public class DalEvent
{
    private static bool CheckEventUnicityBy(string field, string value)
    {
        try
        {
            using SqlConnection cnn = DbConnection.GetConnection();
            cnn.Open();
            string strSql = @"  SELECT TOP 1 * 
                                        FROM [Event] 
                                        WHERE [Event].[" + field + @"] = @Value ";

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

    //add event
    public static JsonResponse AddEvent(Event even)
    {
        JsonResponse jsonResponse = new JsonResponse();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            if (even.EventName != null && CheckEventUnicityBy("EventName", even.EventName))
            {
                connection.Open();

                string sql =
                    @" INSERT INTO [Event] ( EventName, Description,Date,Location) OUTPUT INSERTED.Id 
                                        VALUES (@EventName, @Description, @Date, @Location) ";

                using SqlCommand command = new SqlCommand(sql, connection);

                if (String.IsNullOrEmpty(even.EventName))
                    command.Parameters.AddWithValue("@EventName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@EventName", even.EventName);

                if (String.IsNullOrEmpty(even.Description))
                    command.Parameters.AddWithValue("@Description", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Description", even.Description);

                // if (even.Images == null)
                //     command.Parameters.AddWithValue("@Thumbnail", DBNull.Value);
                // else
                //     command.Parameters.AddWithValue("@Thumbnail", even.Thumbnail);
                if (String.IsNullOrEmpty(even.Date))
                    command.Parameters.AddWithValue("@Date", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Date", even.Date);
                if (String.IsNullOrEmpty(even.Location))
                    command.Parameters.AddWithValue("@Location", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Location", even.Location);

                long id = (long) command.ExecuteScalar();

                if (id > 0)
                {
                    jsonResponse.Success = true;
                    jsonResponse.Message = id.ToString();
                }

                else
                {
                    jsonResponse.Success = false;
                    jsonResponse.Message = "Event already existed with this name";
                }

                connection.Close();
            }
        }
        catch (Exception e)
        {
            jsonResponse.Success = false;
            jsonResponse.Message = "ERREUR Inserting Event !!";
        }

        return jsonResponse;
    }

    //update event
    public static JsonResponse UpdateEvent(Event even)
    {
        JsonResponse jsonResponse = new JsonResponse();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();

            string sql = @" UPDATE [Event] 
                                    SET 
                                        EventName=@EventName,
                                        Description=@Description,
                                        Date=@Date,
                                        Location=@Location
                                    WHERE Id=@Id";
            // Thumbnail=@Thumbnail,

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;

                if (String.IsNullOrEmpty(even.EventName))
                    command.Parameters.AddWithValue("@EventName", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@EventName", even.EventName);

                if (String.IsNullOrEmpty(even.Description))
                    command.Parameters.AddWithValue("@Description", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Description", even.Description);

                //
                // if (String.IsNullOrEmpty(even.Thumbnail))
                //     command.Parameters.AddWithValue("@Thumbnail", DBNull.Value);
                // else
                //     command.Parameters.AddWithValue("@Thumbnail", even.Thumbnail);

                if (String.IsNullOrEmpty(even.Date))
                    command.Parameters.AddWithValue("@Date", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Date", even.Date);

                if (String.IsNullOrEmpty(even.Location))
                    command.Parameters.AddWithValue("@Location", DBNull.Value);
                else
                    command.Parameters.AddWithValue("@Location", even.Location);

                command.Parameters.AddWithValue("@Id", even.Id);

                if (command.ExecuteNonQuery() == 1)
                {
                    jsonResponse.Success = true;
                    jsonResponse.Message = "Event successfully updated !";
                }
                else
                {
                    jsonResponse.Success = false;
                    jsonResponse.Message = "Event failed to update !";
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

    //get all events 
    public static List<Event> GetAllEvents()
    {
        List<Event> lstEvent = new List<Event>();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" SELECT * 
                                    FROM [Event] 
                                    ORDER BY Id DESC";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        Event even = new Event
                        {
                            Id = long.Parse(dataReader["Id"].ToString()!),
                            EventName = dataReader["EventName"].ToString()!,
                            Description = dataReader["Description"].ToString()!,
                            // Thumbnail = dataReader["Thumbnail"].ToString()!,
                            Date = dataReader["Date"].ToString()!,
                            Location = dataReader["Location"].ToString()!
                        };

                        lstEvent.Add(even);
                    }
                }
            }

            connection.Close();
        }
        catch (Exception e)
        {
            throw e;
        }

        return lstEvent;
    }

    //get event by
    public static Event GetEventBy(string field, string fieldValue)
    {
        Event even = new Event();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" SELECT TOP 1 * 
                                    FROM [Event] 
                                    WHERE [Event].[" + field + @"]=@Value";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("@Value", fieldValue);

                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    if (dataReader.Read())
                    {
                        even.Id = long.Parse(dataReader["Id"].ToString()!);
                        even.EventName = dataReader["EventName"].ToString()!;
                        even.Description = dataReader["Description"].ToString()!;
                        // even.Thumbnail = dataReader["Thumbnail"].ToString()!;
                        even.Location = dataReader["Location"].ToString()!;
                        even.Date = dataReader["Date"].ToString()!;
                    }
                }
            }

            connection.Close();
        }
        catch (Exception e)
        {
            throw e;
        }

        return even;
    }

    //get all events by
    public static List<Event> GetAllEventsBy(string field, string value)
    {
        List<Event> lstEvent = new List<Event>();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" SELECT * 
                                    FROM [Event] 
                                    WHERE [Event].[" + field + @"]=@Field";

            using (SqlCommand command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("@Field", value);

                using (SqlDataReader dataReader = command.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        Event even = new Event
                        {
                            Id = long.Parse(dataReader["Id"].ToString()!),
                            EventName = dataReader["EventName"].ToString()!,
                            Description = dataReader["Description"].ToString()!,
                            // Thumbnail = dataReader["Thumbnail"].ToString()!,
                            Date = dataReader["Date"].ToString()!,
                            Location = dataReader["Location"].ToString()!
                        };

                        lstEvent.Add(even);
                    }
                }
            }

            connection.Close();
        }
        catch (Exception e)
        {
            throw e;
        }

        return lstEvent;
    }

    //delete event by 
    public static JsonResponse DeleteEventBy(string field, string fieldValue)
    {
        JsonResponse jsonResponse = new JsonResponse();

        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();
            string sql = @" DELETE 
                                    FROM [Event] 
                                    WHERE [Event].[" + field + "]=@FieldValue";

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


    public static JsonResponse AddImageToRelationshipTable(string? eventName, string imageName)
    {
        JsonResponse jsonResponse = new JsonResponse();
        try
        {
            using SqlConnection connection = DbConnection.GetConnection();
            connection.Open();

            string sql =
                @" INSERT INTO [ImagesToEvent] (EventName, ImageName) 
                                        VALUES (@EventName, @ImageName) ";

            using SqlCommand command = new SqlCommand(sql, connection);

            if (String.IsNullOrEmpty(eventName))
                command.Parameters.AddWithValue("@EventName", DBNull.Value);
            else
                command.Parameters.AddWithValue("@EventName", eventName);

            if (String.IsNullOrEmpty(imageName))
                command.Parameters.AddWithValue("@ImageName", DBNull.Value);
            else
                command.Parameters.AddWithValue("@ImageName", imageName);


            long id = (long) command.ExecuteScalar();

            if (id > 0)
            {
                jsonResponse.Success = true;
                jsonResponse.Message = id.ToString();
            }

            else
            {
                jsonResponse.Success = false;
                jsonResponse.Message = "Event already existed with this name";
            }

            connection.Close();
        }

        catch (Exception e)
        {
            jsonResponse.Success = false;
            jsonResponse.Message = "ERREUR Inserting Event Images !!";
        }

        return jsonResponse;
    }
}