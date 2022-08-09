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

        [HttpPost("UpsertContact")]
        public JsonResult UpsertContact([FromForm] Contact contact)
        {
            return Json(BllContact.UpsertApi(contact));
        }

        [HttpGet("all")]
        public List<Contact> GetAllContacts()
        {
            return BllContact.GetAllContacts();
        }


        [HttpGet("GetAllContactsBy")]
        public List<Contact> GetAllContactsBy(string field, string value)
        {
            if (string.IsNullOrEmpty(field) || string.IsNullOrEmpty(value))
            {
                return new List<Contact>();
            }
            return BllContact.GetAllContactsBy(field, value);
        }


        [HttpGet("GetContactBy")]
        public Contact GetContactBy(string field, string value)
        {
            if (!string.IsNullOrEmpty(field) && !string.IsNullOrEmpty(value))
            {
                Contact contact = BllContact.GetContactBy(field, value);

                if (contact.Id != 0)
                {
                    return contact;
                }
                else
                {
                    return new Contact();
                }
            }
            else
            {
                return new Contact();
            }
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
