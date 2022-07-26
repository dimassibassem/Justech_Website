namespace server.Models.Entity
{
    public class User
    {
        public long Id { get; set; }
        public string? FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }


        public User()
        {
        }

        public User(long id, string? firstName, string lastName, string email, string password)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
        }
    }
}