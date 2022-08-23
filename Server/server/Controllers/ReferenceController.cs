using Microsoft.AspNetCore.Authorization;
using server.Extensions;
using server.Models.BLL;
using server.Models.Entity;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReferencesController : Controller
    {
        readonly IWebHostEnvironment _environment;

        public ReferencesController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }


        [HttpPost("UpsertReference")]
        public async Task<IActionResult> UpsertReference([FromForm] Reference reference)
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

            var empty = reference.Thumbnail == null;
            if (empty) return Json(BllReference.UpsertApi(reference));

            if (!Directory.Exists(_environment.WebRootPath + "\\Uploads\\References"))
            {
                Directory.CreateDirectory(_environment.WebRootPath + "\\Uploads\\References");
            }

            if (reference.ReferenceName != null)
            {
                var isExist = BllReference.GetReferenceBy("ReferenceName", reference.ReferenceName);
                if (isExist.ReferenceName != null) return Json(BllReference.UpsertApi(reference));
            }

            var uidFileName = Guid.NewGuid() + "-" + reference.Thumbnail.FileName;
            await using FileStream fileStream =
                System.IO.File.Create(_environment.WebRootPath + "\\Uploads\\References\\" +
                                      uidFileName);
            await reference.Thumbnail?.CopyToAsync(fileStream)!;
            fileStream.Flush();
            reference.ThumbnailName = uidFileName;
            return Json(BllReference.UpsertApi(reference));
        }


        [HttpGet("all")]
        public List<Reference> GetAllReferences()
        {
            return BllReference.GetAllReferences();
        }

        [HttpGet("ReferenceBy")]
        public Reference GetReferenceBy(string field, string value)
        {
            return BllReference.GetReferenceBy(field, value);
        }


        [HttpDelete("DeleteReferenceBy")]
        public JsonResult DeleteReferenceBy(string field, string value)
        {
            // if (!Request.Headers.ContainsKey("Authorization"))
            //     return new JsonResult(new JsonResponse
            //     {
            //         Success = false,
            //         Message = "unAuthorized"
            //     });
            //
            // var token = Request.Headers["Authorization"];
            // token = token.ToString().Substring(7);
            // if (!BllAuth.IsTokenValid(token))
            //     return new JsonResult(new JsonResponse
            //     {
            //         Success = false,
            //         Message = "unAuthorized"
            //     });

            if (string.IsNullOrEmpty(field) || string.IsNullOrEmpty(value))
            {
                JsonResponse jsonResponse = new JsonResponse
                {
                    Success = false,
                    Message = "The parameters are invalid"
                };

                return Json(jsonResponse);
            }

            Reference reference = BllReference.GetReferenceBy(field, value);
            var imageToDelete = reference.ThumbnailName;
            if (!string.IsNullOrEmpty(imageToDelete))
            {
                System.IO.File.Delete(_environment.WebRootPath + "\\Uploads\\References\\" + imageToDelete);
            }

            return Json(BllReference.DeleteApi(field, value));
        }

        
    }
}