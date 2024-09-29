namespace YouLyricsAPI.Models;

public class Text
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid TextualGenreId { get; set; }
    public TextualGenre TextualGenre { get; set; }
    public List<Theme> Themes { get; set; }

    public Text()
    {
        
    }
    public Text(string title, string content, Guid userId, User user, DateTime createdAt, Guid textualGenreId, TextualGenre textualGenre, List<Theme> themes)
    {
        Id = Guid.NewGuid();
        Title = title;
        Content = content;
        UserId = userId;
        User = user;
        CreatedAt = createdAt;
        TextualGenreId = textualGenreId;
        TextualGenre = textualGenre;
        Themes = themes;
    }
}