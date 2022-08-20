using server.Extensions;
using server.Models.BLL;
using server.Models.Entity;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : Controller
    {
        [HttpPost("AddContact")]
        public JsonResult UpsertContact([FromForm] Contact contact)
        {
            return Json(BllContact.AddContact(contact));
        }

        [HttpGet("all")]
        public List<Contact> GetAllContacts()
        {
            return BllContact.GetAllContacts();
        }
        


        [HttpDelete("DeleteContactBy")]
        public JsonResult DeleteContactBy(string field, string value)
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

            return Json(BllContact.DeleteApi(field, value));
        }
    }
}