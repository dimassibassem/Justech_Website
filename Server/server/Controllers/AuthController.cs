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
        public JsonResult UpsertUser(string email, string password)
        {
            return Json(BllAuth.Verify("email", email, password));
        }
    }
}