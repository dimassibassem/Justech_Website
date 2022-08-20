using Microsoft.AspNetCore.Cors;
using server.Extensions;
using server.Models.BLL;
using server.Models.Entity;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        [HttpPost()]
        public JsonResult VerifyByEmail(string email, string password)
        {
            return Json(BllAuth.Verify("email", email, password));
        }


        [HttpPost("verify")]
        public JsonResult VerifyPassword(string password)
        {
            var jsonResponse = new JsonResponse
            {
                Success = false,
                Message = "unAuthorized"
            };
            if (!Request.Headers.ContainsKey("Authorization")) return Json(jsonResponse);

            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(7);
            if (!BllAuth.IsTokenValid(token)) return Json(jsonResponse);


            return Json(BllAuth.VerifyPassword("id", "1", password));
        }
    }
}