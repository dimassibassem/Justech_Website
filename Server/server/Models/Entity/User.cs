namespace server.Models.Entity
{
    public class User
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Profession { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public Boolean EmailConfirmed { get; set; }
        public string EmailConfirmationCode { get; set; }
        public DateTime CodeExpirationDate { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public string Adress { get; set; }
        public int PostalCode { get; set; }
        public IFormFile Photo { get; set; }
        public string PhotoFileName { get; set; }
        public DateTime AddedOn { get; set; }

        public User()
        {
        }

        public User(long id, string code, string firstName, string lastName, DateTime dateOfBirth, string profession, string gender, string email, bool emailConfirmed, string emailConfirmationCode, DateTime codeExpirationDate, string password, string phone, string country, string adress, int postalCode, IFormFile photo, string photoFileName, DateTime addedOn)
        {
            Id = id;
            Code = code;
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Profession = profession;
            Gender = gender;
            Email = email;
            EmailConfirmed = emailConfirmed;
            EmailConfirmationCode = emailConfirmationCode;
            CodeExpirationDate = codeExpirationDate;
            Password = password;
            Phone = phone;
            Country = country;
            Adress = adress;
            PostalCode = postalCode;
            Photo = photo;
            PhotoFileName = photoFileName;
            AddedOn = addedOn;
        }
    }
}
