using server.Extensions;
using server.Models.DAL;
using BCryptNet = BCrypt.Net.BCrypt;

namespace server.Models.BLL;

public class BllAuth
{
    public static object Verify(string field, string fieldValue, string password)
    {
        JsonResponse jsonResponse = new JsonResponse();
        bool verified = false;
        var user = DalAuth.GetUserBy(field, fieldValue);
        if (user.Id >= 0)
        {
            verified = BCryptNet.Verify(password, user.Password);
        }
        else
        {
            jsonResponse.Success = false;
            jsonResponse.Message = "Incorrect email";
            return jsonResponse;
        }

        if (verified)
        {
            jsonResponse.Success = true;
            jsonResponse.Message = "User verified";
        }
        else
        {
            jsonResponse.Success = false;
            jsonResponse.Message = "Incorrect password";
        }


        return jsonResponse;
    }
}