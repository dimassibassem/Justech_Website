using server.Extensions;
using server.Models.BLL;
using server.Models.Entity;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartnersController : Controller
    {
        IWebHostEnvironment _environment;

        public PartnersController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }


        [HttpPost("UpsertPartner")]
        public JsonResult UpsertPartner([FromForm] Partner partner)
        {
            if (partner.Thumbnail is {Length: > 0})
            {
                var fileName = $"{partner.Id}.jpg";
                var path = Path.Combine(_environment.WebRootPath, "images", "partners", fileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    partner.Thumbnail.CopyTo(stream);
                }

                partner.Thumbnail = null;
            }

            {
                if (!Directory.Exists(_environment.WebRootPath + "\\Uploads\\Partners"))
                {
                    Directory.CreateDirectory(_environment.WebRootPath + "\\Uploads\\Partners");
                }

                var uidFileName = Guid.NewGuid() + "-" + partner.Thumbnail?.FileName;
                using FileStream fileStream =
                    System.IO.File.Create(_environment.WebRootPath + "\\Uploads\\Partners\\" +
                                          uidFileName);
                partner.Thumbnail?.CopyTo(fileStream);
                fileStream.Flush();
                partner.ThumbnailName = uidFileName;
            }

            return Json(BllPartner.UpsertApi(partner));
        }

        [HttpGet("all")]
        public List<Partner> GetAllPartners()
        {
            return BllPartner.GetAllPartners();
            //return new List<Partner>();
        }


        [HttpGet("GetAllPartnersBy")]
        public List<Partner> GetAllPartnersBy(string field, string value)
        {
            if (string.IsNullOrEmpty(field) || string.IsNullOrEmpty(value))
            {
                return new List<Partner>();
            }

            return BllPartner.GetAllPartnersBy(field, value);
        }


        [HttpGet("GetPartnerBy")]
        public Partner GetPartnerBy(string field, string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                Partner partner = BllPartner.GetPartnerBy(field, value);

                if (partner.Id != 0)
                {
                    return partner;
                }
                else
                {
                    return new Partner();
                }
            }
            else
            {
                return new Partner();
            }
        }


        [HttpDelete("DeletePartnerBy")]
        public JsonResult DeletePartnerBy(string field, string value)
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

            return Json(BllPartner.DeleteApi(field, value));
        }
    }
}