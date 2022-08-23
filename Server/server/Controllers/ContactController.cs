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
        public object GetAllContacts()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
                return new JsonResult(new JsonResponse
                {
                    Success = false,
                    Message = "unAuthorized"
                });

            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(7);
            if (!BllAuth.IsTokenValid(token))
                return new JsonResult(new JsonResponse
                {
                    Success = false,
                    Message = "unAuthorized"
                });
            return BllContact.GetAllContacts();
        }
        
        [HttpGet("ContactBy")]
        public object GetcontactBy(string field , string value)
        {
            if (!Request.Headers.ContainsKey("Authorization"))
                return new JsonResult(new JsonResponse
                {
                    Success = false,
                    Message = "unAuthorized"
                });

            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(7);
            if (!BllAuth.IsTokenValid(token))
                return new JsonResult(new JsonResponse
                {
                    Success = false,
                    Message = "unAuthorized"
                });
            return BllContact.GetContactBy(field, value);
        }
        
        


        [HttpDelete("DeleteContactBy")]
        public JsonResult DeleteContactBy(string field, string value)
        {
            if (!Request.Headers.ContainsKey("Authorization"))
                return new JsonResult(new JsonResponse
                {
                    Success = false,
                    Message = "unAuthorized"
                });

            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(7);
            if (!BllAuth.IsTokenValid(token))
                return new JsonResult(new JsonResponse
                {
                    Success = false,
                    Message = "unAuthorized"
                });
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