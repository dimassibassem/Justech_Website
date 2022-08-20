using server.Extensions;
using server.Models.DAL;
using server.Models.Entity;

namespace server.Models.BLL

{
    public static class BllPartner
    {
        public static Partner GetPartnerBy(string field, string fieldValue)
        {
            return DalPartner.GetPartnerBy(field, fieldValue);
        }
        

        public static List<Partner> GetAllPartners()
        {
            return DalPartner.GetAllPartners();
        }
        
        #region API Calls

        public static JsonResponse UpsertApi(Partner partner)
        {
            var jr = partner.Id == 0 ? DalPartner.AddPartner(partner) : DalPartner.UpdatePartner(partner);

            return jr;
        }

        public static JsonResponse DeleteApi(string field, string fieldValue)
        {
            JsonResponse jr = new JsonResponse();
            var partnerFromDb = GetPartnerBy(field, fieldValue);
            if (partnerFromDb.Id == 0)
            {
                jr.Success = false;
                jr.Message = "Partner does not exist!";
            }
            else
            {
                jr = DalPartner.DeletePartnerBy("Id", partnerFromDb.Id.ToString());
            }

            return jr;
        }

        #endregion


    }
}