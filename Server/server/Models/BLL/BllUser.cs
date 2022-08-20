using server.Extensions;
using server.Models.DAL;
using server.Models.Entity;

namespace server.Models.BLL;

public static class BllUser
{
    #region API Calls

    public static JsonResponse UpdateApi(User user)
    {
        var jr = DalUser.UpdateUser(user);

        return jr;
    }

    public static JsonResponse InsertApi(User user)
    {
        JsonResponse jr = DalUser.AddUser(user);

        return jr;
    }

    #endregion
}