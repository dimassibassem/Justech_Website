using server.Extensions;
using server.Models.BLL;
using server.Models.Entity;
using Microsoft.AspNetCore.Mvc;
using server.Models.DAL;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : Controller
    {
        readonly IWebHostEnvironment _environment;

        public EventController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }


        [HttpPost("UpsertEvent")]
        public async Task<JsonResult> UpsertEvent([FromForm] Event even)
        {
            if (even.Images == null) return Json(BllEvent.UpsertApi(even));

            if (!Directory.Exists(_environment.WebRootPath + "\\Uploads\\Events"))
            {
                Directory.CreateDirectory(_environment.WebRootPath + "\\Uploads\\Events");
            }


            foreach (var image in even.Images)
            {
                var uidFileName = Guid.NewGuid() + "-" + image.FileName;
                await using FileStream fileStream =
                    System.IO.File.Create(_environment.WebRootPath + "\\Uploads\\Events\\" +
                                          uidFileName);
                await image.CopyToAsync(fileStream)!;
                fileStream.Flush();
              var res =   DalEvent.AddImageToRelationshipTable(even.EventName, uidFileName);
            }

            return Json(BllEvent.UpsertApi(even));
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
                Event even = BllEvent.GetEventBy(field, value);

                if (even.Id != 0)
                {
                    return even;
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