using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security.OAuth;
using server.Extensions;
using server.Models.DAL;
using server.Models.Entity;
using BCryptNet = BCrypt.Net.BCrypt;

namespace server.Models.BLL;

public static class BllAuth
{
    public static object Verify(string field, string fieldValue, string password)
    {
        JsonResponse jsonResponse = new JsonResponse();
        bool verified = false;
        var user = DalAuth.GetUserBy(field, fieldValue);
        if (user.Id != 0)
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

    public static bool IsTokenValid(string token)
    {
        static string Base64UrlEncode(byte[] input)
        {
            var output = Convert.ToBase64String(input);
            output = output.Split('=')[0]; // Remove any trailing '='s
            output = output.Replace('+', '-'); // 62nd char of encoding
            output = output.Replace('/', '_'); // 63rd char of encoding
            return output;
        }

        try
        {
            int index = token.IndexOf('.', token.IndexOf('.') + 1);
            string signature = token[(index + 1)..];
            byte[] bytesToSign = Encoding.UTF8.GetBytes(token[..index]);
            var key = Encoding.ASCII.GetBytes("super secret key");
            var hash = new HMACSHA256(key).ComputeHash(bytesToSign);
            var computedSignature = Base64UrlEncode(hash);
            return computedSignature.Length == signature.Length
                   && computedSignature.SequenceEqual(signature);
        }
        catch
        {
            return false;
        }
    }
}