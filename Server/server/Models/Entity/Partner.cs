namespace server.Models.Entity;

public class Partner
{
    public long Id { get; set; }
    public string? CompanyName { get; set; }

    public string? Description { get; set; }
    public string? Link { get; set; }

    public IFormFile? Thumbnail { get; set; }
    public string? ThumbnailName { get; set; }


    public Partner()
    {
    }

    public Partner(long id , string? companyName, IFormFile? thumbnail,string? thumbnailName, string description,string link)
    {
        Id = id;
        CompanyName = companyName;
        Thumbnail = thumbnail;
        ThumbnailName = thumbnailName;
        Description = description;
        Link = link;
    }
  
}