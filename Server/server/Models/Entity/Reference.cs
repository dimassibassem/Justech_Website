namespace server.Models.Entity;

public class Reference
{
    public long Id { get; set; }
    public string? ReferenceName { get; set; }
    public IFormFile? Thumbnail { get; set; }
    public string? ThumbnailName { get; set; }
    
    public Reference()
    {
    }

    public Reference(long id , string? referenceName, IFormFile? thumbnail,string? thumbnailName, string description,string link)
    {
        Id = id;
        ReferenceName = referenceName;
        Thumbnail = thumbnail;
        ThumbnailName = thumbnailName;
    }
  
}