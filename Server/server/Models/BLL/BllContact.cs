using server.Extensions;
using server.Models.DAL;
using server.Models.Entity;

namespace server.Models.BLL
{
    public static class BllContact
    {
        public static Contact GetContactBy(string field, string fieldValue)
        {
            return DalContact.GetContactBy(field, fieldValue);
        }

        public static JsonResponse AddContact(Contact contact)
        {
            return DalContact.AddContact(contact);
        }

        public static List<Contact> GetAllContacts()
        {
            return DalContact.GetAllContacts();
        }
        

        #region API Calls
        

        public static JsonResponse DeleteApi(string field, string fieldValue)
        {
            JsonResponse jr = new JsonResponse();
            var contactFromDb = GetContactBy(field, fieldValue);
            if (contactFromDb.Id == 0)
            {
                jr.Success = false;
                jr.Message = "Contact Not Found !";
            }
            else
            {
                jr = DalContact.DeleteContactBy("Id", contactFromDb.Id.ToString());
            }

            return jr;
        }

        #endregion
        
    }
}