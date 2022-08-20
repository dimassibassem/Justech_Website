using Microsoft.AspNetCore.Authorization;
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
        readonly IWebHostEnvironment _environment;

        public PartnersController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }


        [HttpPost("UpsertPartner")]
        public async Task<IActionResult> UpsertPartner([FromForm] Partner partner)
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

            if (partner.Thumbnail == null) return Json(BllPartner.UpsertApi(partner));

            if (!Directory.Exists(_environment.WebRootPath + "\\Uploads\\Partners"))
            {
                Directory.CreateDirectory(_environment.WebRootPath + "\\Uploads\\Partners");
            }

            if (partner.CompanyName != null)
            {
                var isExist = BllPartner.GetPartnerBy("CompanyName", partner.CompanyName);
                if (isExist.CompanyName != null) return Json(BllPartner.UpsertApi(partner));
            }

            var uidFileName = Guid.NewGuid() + "-" + partner.Thumbnail.FileName;
            await using FileStream fileStream =
                System.IO.File.Create(_environment.WebRootPath + "\\Uploads\\Partners\\" +
                                      uidFileName);
            await partner.Thumbnail?.CopyToAsync(fileStream)!;
            fileStream.Flush();
            partner.ThumbnailName = uidFileName;
            return Json(BllPartner.UpsertApi(partner));
        }


        [HttpGet("all")]
        public List<Partner> GetAllPartners()
        {
            return BllPartner.GetAllPartners();
        }

        
        [HttpDelete("DeletePartnerBy")]
        public JsonResult DeletePartnerBy(string field, string value)
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

            Partner partner = BllPartner.GetPartnerBy(field, value);
            var imageToDelete = partner.ThumbnailName;
            if (!string.IsNullOrEmpty(imageToDelete))
            {
                System.IO.File.Delete(_environment.WebRootPath + "\\Uploads\\Partners\\" + imageToDelete);
            }

            return Json(BllPartner.DeleteApi(field, value));
        }
    }
}