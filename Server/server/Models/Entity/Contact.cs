namespace server.Models.Entity;

public class Contact
{
    public long Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Company { get; set; }
    public string? Address { get; set; }
    public string? Subject { get; set; }

    public string? Message { get; set; }


    public Contact()
    {
    }

    public Contact(long id, string? firstName, string lastName, string email, string phone, string company,
        string address, string subject, string message)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Phone = phone;
        Company = company;
        Address = address;
        Subject = subject;
        Message = message;
    }
}