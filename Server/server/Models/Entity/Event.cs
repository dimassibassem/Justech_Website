namespace server.Models.Entity;

public class Event
{
    public long Id { get; set; }
    public string? EventName { get; set; }
    public List<IFormFile>? Images { get; set; }

    public string? Location { get; set; }

    public string? Description { get; set; }

    public string? Date { get; set; }


    public Event()
    {
    }

    public Event(long id, string? eventName, List<IFormFile>? thumbnail, string description, string location,
        string date)
    {
        Id = id;
        EventName = eventName;
        Images = thumbnail;
        Description = description;
        Location = location;
        Date = date;
    }
}