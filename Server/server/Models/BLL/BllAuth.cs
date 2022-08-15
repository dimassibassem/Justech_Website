using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using server.Extensions;
using server.Models.DAL;
using server.Models.Entity;
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
            var token = GenerateJwtToken(user);
            jsonResponse.Success = true;
            jsonResponse.Message = token;
        }
        else
        {
            jsonResponse.Success = false;
            jsonResponse.Message = "Incorrect password";
        }


        return jsonResponse;
    }

    private static string GenerateJwtToken(User user)
    {
        // generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("super secret key");
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] {new Claim("id", user.Id.ToString())}),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}