using Microsoft.AspNetCore.Cors;
using server.Extensions;
using server.Models.BLL;
using server.Models.Entity;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {

        [HttpPost("UpdateUser")]
        public JsonResult UpdateUser([FromForm] User user)
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
            return Json(BllUser.UpdateApi(user));
        }

        [HttpPost("InsertUser")]
        public JsonResult InsertUser([FromForm] User user)
        {
            return Json(BllUser.InsertApi(user));
        }
        
    }
}
