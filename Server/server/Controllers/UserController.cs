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

        [HttpPost("UpsertUser")]
        public JsonResult UpsertUser([FromForm] User user)
        {
            return Json(BllUser.UpsertApi(user));
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


        [HttpGet("GetUserBy")]
        public User GetUserBy(string field, string value)
        {
            if (!string.IsNullOrEmpty(field) && !string.IsNullOrEmpty(value))
            {
                User user = BllUser.GetUserBy(field, value);

                if (user.Id != 0)
                {
                    return user;
                }
                else
                {
                    return new User();
                }
            }
            else
            {
                return new User();
            }
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
