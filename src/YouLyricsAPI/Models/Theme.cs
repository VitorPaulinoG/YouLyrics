namespace YouLyricsAPI.Models;

public class Theme
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public Theme()
    {
        
    }
    
    public Theme(Guid id, string name, string description)
    {
        Id = id;
        Name = name;
        Description = description;
    }
}