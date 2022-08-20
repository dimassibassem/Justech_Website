using server.Extensions;
using server.Models.DAL;
using server.Models.Entity;

namespace server.Models.BLL;

public static class BllEvent
{
    public static Event GetEventBy(string field, string fieldValue)
    {
        return DalEvent.GetEventBy(field, fieldValue);
    }

    public static object GetAllEvents()
    {
        return DalEvent.GetEventsWithImages();
    }
    

    #region API Calls

    public static JsonResponse UpsertApi(Event even)
    {
        JsonResponse jr;

        if (even.Id == 0)
        {
            jr = DalEvent.AddEvent(even);
        }
        else
        {
            jr = DalEvent.UpdateEvent(even);
        }

        return jr;
    }

    public static JsonResponse DeleteApi(string field, string fieldValue)
    {
        JsonResponse jr = new JsonResponse();
        var eventFromDb = GetEventBy(field, fieldValue);
        if (eventFromDb.Id == 0)
        {
            jr.Success = false;
            jr.Message = "Event Not Found !";
        }
        else
        {
            DalEvent.DeleteEventImagesBy(field, fieldValue);
            jr = DalEvent.DeleteEventBy("Id", eventFromDb.Id.ToString());
        }

        return jr;
    }

    #endregion
}