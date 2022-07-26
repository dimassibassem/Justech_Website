using server.Extensions;
using server.Models.BLL;
using server.Models.Entity;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : Controller
    {
        [HttpPost("UpsertEvent")]
        public JsonResult UpsertEvent([FromForm] Event partner)
        {
            return Json(BllEvent.UpsertApi(partner));
        }

        [HttpGet("all")]
        public List<Event> GetAllEvents()
        {
            return BllEvent.GetAllEvents();
            //return new List<Event>();
        }


        [HttpGet("GetAllEventsBy")]
        public List<Event> GetAllEventsBy(string field, string value)
        {
            if (string.IsNullOrEmpty(field) || string.IsNullOrEmpty(value))
            {
                return new List<Event>();
            }

            return BllEvent.GetAllEventsBy(field, value);
        }


        [HttpGet("GetEventBy")]
        public Event GetEventBy(string field, string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                Event partner = BllEvent.GetEventBy(field, value);

                if (partner.Id != 0)
                {
                    return partner;
                }
                else
                {
                    return new Event();
                }
            }
            else
            {
                return new Event();
            }
        }


        [HttpDelete("DeleteEventBy")]
        public JsonResult DeleteEventBy(string field, string value)
        {
            if (string.IsNullOrEmpty(field) || string.IsNullOrEmpty(value))
            {
                JsonResponse jsonResponse = new JsonResponse
                {
                    Success = false,
                    Message = "Les paramétres ne sont pas valide"
                };

                return Json(jsonResponse);
            }

            return Json(BllEvent.DeleteApi(field, value));
        }
    }
}