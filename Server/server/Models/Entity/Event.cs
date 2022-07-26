namespace server.Models.Entity;

public class Event
{

    public long Id { get; set; }
    public string? EventName { get; set; }
    public string? Thumbnail { get; set; }
 
    public string? Description { get; set; }


    public Event()
    {
    }

    public Event(long id , string? eventName, string thumbnail, string description)
    {
        Id = id;
        EventName = eventName;
        Description = description;
        Thumbnail = thumbnail;
    }
}
