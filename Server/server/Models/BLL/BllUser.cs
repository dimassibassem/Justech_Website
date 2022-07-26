using server.Extensions;
using server.Models.DAL;
using server.Models.Entity;

namespace server.Models.BLL
{
    public class BllUser
    {
        public static User GetUserBy(string field, string fieldValue)
        {
            return DalUser.GetUserBy(field, fieldValue);
        }

        public static JsonResponse AddUser(User user)
        {
            return DalUser.AddUser(user);
        }

        public static List<User> GetAllUsers()
        {
            return DalUser.GetAllUsers();
        }

        public static List<User> GetAllUsersBy(string field, string value)
        {
            return DalUser.GetAllUsersBy(field, value);
        }

        #region API Calls

        public static JsonResponse UpsertApi(User user)
        {
            JsonResponse jr;

            if (user.Id == 0)
            {
                jr = DalUser.AddUser(user);
            }
            else
            {
                jr = DalUser.UpdateUser(user);
            }

            return jr;
        }

        public static JsonResponse DeleteApi(string field, string fieldValue)
        {
            JsonResponse jr = new JsonResponse();
            var userFromDb = GetUserBy(field, fieldValue);
            if (userFromDb.Id == 0)
            {
                jr.Success = false;
                jr.Message = "Utilisateur n'exitse pas !";
            }
            else
            {
                jr = DalUser.DeleteUserBy("Id", userFromDb.Id.ToString());
            }

            return jr;
        }

        #endregion
        
    }
}