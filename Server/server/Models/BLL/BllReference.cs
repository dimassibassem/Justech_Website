
using server.Extensions;
using server.Models.DAL;
using server.Models.Entity;

namespace server.Models.BLL

{
    public static class BllReference
    {
        public static Reference GetReferenceBy(string field, string fieldValue)
        {
            return DalReference.GetReferenceBy(field, fieldValue);
        }
        

        public static List<Reference> GetAllReferences()
        {
            return DalReference.GetAllReferences();
        }
        
        #region API Calls

        public static JsonResponse UpsertApi(Reference reference)
        {
            var jr = reference.Id == 0 ? DalReference.AddReference(reference) : DalReference.UpdateReference(reference);

            return jr;
        }

        public static JsonResponse DeleteApi(string field, string fieldValue)
        {
            JsonResponse jr = new JsonResponse();
            var referenceFromDb = GetReferenceBy(field, fieldValue);
            if (referenceFromDb.Id == 0)
            {
                jr.Success = false;
                jr.Message = "Reference does not exist!";
            }
            else
            {
                jr = DalReference.DeleteReferenceBy("Id", referenceFromDb.Id.ToString());
            }

            return jr;
        }

        #endregion


    }
}