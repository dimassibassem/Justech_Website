
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

        [HttpPost("UpsertPartner")]
        public JsonResult UpsertPartner([FromForm] Partner partner)
        {
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

