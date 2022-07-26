namespace server.Models.Entity;

public class Partner
{
    public long Id { get; set; }
    public string? CompanyName { get; set; }
    public string? Thumbnail { get; set; }
 
    public string? Description { get; set; }


    public Partner()
    {
    }

    public Partner(long id , string? companyName, string thumbnail, string description)
    {
        Id = id;
        CompanyName = companyName;
        Description = description;
        Thumbnail = thumbnail;
    }
}