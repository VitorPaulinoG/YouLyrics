namespace YouLyricsAPI.Models;

public class Theme
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public Theme()
    {
        
    }
    
    public Theme(string name, string description)
    {
        Id = new Guid();
        Name = name;
        Description = description;
    }
}