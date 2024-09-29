namespace YouLyricsAPI.Models;

public class Text
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public User User { get; set; }
    public DateTime CreatedAt { get; set; }
    public TextualGenre TextualGenre { get; set; }
    public List<Theme> Themes { get; set; }

    public Text()
    {
        
    }
    public Text(string title, string content, User user, DateTime createdAt, TextualGenre textualGenre, List<Theme> themes)
    {
        Id = Guid.NewGuid();
        Title = title;
        Content = content;
        User = user;
        CreatedAt = createdAt;
        TextualGenre = textualGenre;
        Themes = themes;
    }
}