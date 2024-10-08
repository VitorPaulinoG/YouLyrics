namespace YouLyricsAPI.Models;

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; private set; }
    public int Level { get; set; }
    
    public void LevelUp ()
        => Level++;
    
    public User(string name, string email, string password)
    {
        Id = Guid.NewGuid();
        Name = name;
        Email = email;
        Password = password;
        Level = 1;
    }
}