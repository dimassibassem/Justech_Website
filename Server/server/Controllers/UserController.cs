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
            // var jsonResponse = new JsonResponse
            // {
            //     Success = false,
            //     Message = "unAuthorized"
            // };
            // if (!Request.Headers.ContainsKey("Authorization")) return Json(jsonResponse);
            //
            // var token = Request.Headers["Authorization"];
            // token = token.ToString().Substring(7);
            // if (!BllAuth.IsTokenValid(token)) return Json(jsonResponse);
            return Json(BllUser.UpdateApi(user));
        }

        [HttpGet("all")]
        public List<User> GetAllUsers()
        {
            return BllUser.GetAllUsers();
            //return new List<User>();
        }


        [HttpGet("GetAllUsersBy")]
        public List<User> GetAllUsersBy(string field, string value)
        {
            if (string.IsNullOrEmpty(field) || string.IsNullOrEmpty(value))
            {
                return new List<User>();
            }
            return BllUser.GetAllUsersBy(field, value);
        }


        [HttpPost("InsertUser")]
        public JsonResult InsertUser([FromForm] User user)
        {
            return Json(BllUser.InsertApi(user));
        }


        [HttpDelete("DeleteUserBy")]
        public JsonResult DeleteUserBy(string field, string value)
        {
            if (string.IsNullOrEmpty(field) || string.IsNullOrEmpty(value))
            {
                JsonResponse jsonResponse = new JsonResponse
                {
                    Success = false,
                    Message = "The parameters are invalid"
                };

                return Json(jsonResponse);
            }
            return Json(BllUser.DeleteApi(field, value));
        }


    }
}
