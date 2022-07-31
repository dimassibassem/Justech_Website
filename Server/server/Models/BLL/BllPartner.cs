using server.Extensions;
using server.Models.DAL;
using server.Models.Entity;

namespace server.Models.BLL

{
    public class BllPartner
    {
        public static Partner GetPartnerBy(string field, string fieldValue)
        {
            return DalPartner.GetPartnerBy(field, fieldValue);
        }

        public static JsonResponse AddPartner(Partner partner)
        {
            return DalPartner.AddPartner(partner);
        }

        public static List<Partner> GetAllPartners()
        {
            return DalPartner.GetAllPartners();
        }

        public static List<Partner> GetAllPartnersBy(string field, string value)
        {
            return DalPartner.GetAllPartnersBy(field, value);
        }

        #region API Calls

        public static JsonResponse UpsertApi(Partner partner)
        {
            JsonResponse jr;

            if (partner.Id == 0)
            {
                jr = DalPartner.AddPartner(partner);
            }
            else
            {
                jr = DalPartner.UpdatePartner(partner);
            }

            return jr;
        }

        public static JsonResponse DeleteApi(string field, string fieldValue)
        {
            JsonResponse jr = new JsonResponse();
            var partnerFromDb = GetPartnerBy(field, fieldValue);
            if (partnerFromDb.Id == 0)
            {
                jr.Success = false;
                jr.Message = "Partner n'exitse pas !";
            }
            else
            {
                jr = DalPartner.DeletePartnerBy("Id", partnerFromDb.Id.ToString());
            }

            return jr;
        }

        #endregion

        public static string CopyFilesToServer(Partner partner, IWebHostEnvironment hostingEnvironment)
        {
           string message = "" ;
                if (partner.Thumbnail != null)
                {
                    var uploadsDir = Path.Combine(hostingEnvironment.WebRootPath, "uploads");
                    var fileName = Guid.NewGuid().ToString()+"-"+partner.Thumbnail.FileName;
                    var filePath = Path.Combine(uploadsDir, fileName);
                    using var stream = new FileStream(filePath, FileMode.Create);
                    partner.Thumbnail.CopyTo(stream);
                    message = "Opération réussie";
                }
            
           

            return message;
        }
    }
}