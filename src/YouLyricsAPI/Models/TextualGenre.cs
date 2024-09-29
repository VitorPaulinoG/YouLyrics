namespace YouLyricsAPI.Models;

public class TextualGenre
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public TextualGenre()
    {
        
    }
    
    public TextualGenre(Guid id, string name, string description)
    {
        Id = id;
        Name = name;
        Description = description;
    }
}