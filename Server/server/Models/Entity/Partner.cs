namespace server.Models.Entity;

public class Partner
{
    public long Id { get; set; }
    public string? CompanyName { get; set; }
    public string? Thumbnail { get; set; }
 
    public string? Description { get; set; }
    public string? Link { get; set; }


    public Partner()
    {
    }

    public Partner(long id , string? companyName, string thumbnail, string description,string link)
    {
        Id = id;
        CompanyName = companyName;
        Thumbnail = thumbnail;
        Description = description;
        Link = link;
    }
  
}