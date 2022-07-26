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

        #region OPERATIONS

        public static JsonResponse GenerateConfirmationCode(User user)
        {
            JsonResponse generateConfirmationCode = new JsonResponse();
            generateConfirmationCode.Success = false;
            generateConfirmationCode.Message = "Une erreur est survenue, veuillez réessayer plus tard";
            Random Alea = new Random();
            user.EmailConfirmationCode = Alea.Next(100000, 999999).ToString();
            user.CodeExpirationDate = DateTime.Now.AddHours(1);
            if (UpsertApi(user).Success)
            {
                //
            }

            return generateConfirmationCode;
        }

        public static JsonResponse CopyFilesToServer(User user, IWebHostEnvironment hostingEnvironment)
        {
            JsonResponse copyFilesToServer = new JsonResponse
            {
                Success = false,
                Message = "l'opération n'a pas réussi"
            };

            try
            {
                if (user.Photo != null)
                {
                    var uploads = Path.Combine(hostingEnvironment.WebRootPath, "Styles/img/users");
                    if (!Directory.Exists(uploads))
                    {
                        Directory.CreateDirectory(uploads);
                    }

                    var filePath = Path.Combine(uploads, user.PhotoFileName);
                    user.Photo.CopyTo(new FileStream(filePath, FileMode.Create));
                    copyFilesToServer.Success = true;
                    copyFilesToServer.Message = "Opération réussie";
                }
            }
            catch (Exception ex)
            {
                copyFilesToServer.Message = "échec de l'opération : " + ex.Message;
            }

            return copyFilesToServer;
        }

        #endregion
    }
}