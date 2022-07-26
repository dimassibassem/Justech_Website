using server.Extensions;
using server.Models.DAL;
using server.Models.Entity;

namespace server.Models.BLL;

public class BllEvent
{
    public static Event GetEventBy(string field, string fieldValue)
    {
        return DalEvent.GetEventBy(field, fieldValue);
    }

    public static JsonResponse AddEvent(Event partner)
    {
        return DalEvent.AddEvent(partner);
    }

    public static List<Event> GetAllEvents()
    {
        return DalEvent.GetAllEvents();
    }

    public static List<Event> GetAllEventsBy(string field, string value)
    {
        return DalEvent.GetAllEventsBy(field, value);
    }

    #region API Calls

    public static JsonResponse UpsertApi(Event partner)
    {
        JsonResponse jr;

        if (partner.Id == 0)
        {
            jr = DalEvent.AddEvent(partner);
        }
        else
        {
            jr = DalEvent.UpdateEvent(partner);
        }

        return jr;
    }

    public static JsonResponse DeleteApi(string field, string fieldValue)
    {
        JsonResponse jr = new JsonResponse();
        var partnerFromDb = GetEventBy(field, fieldValue);
        if (partnerFromDb.Id == 0)
        {
            jr.Success = false;
            jr.Message = "Utilisateur n'exitse pas !";
        }
        else
        {
            jr = DalEvent.DeleteEventBy("Id", partnerFromDb.Id.ToString());
        }

        return jr;
    }

    #endregion
}