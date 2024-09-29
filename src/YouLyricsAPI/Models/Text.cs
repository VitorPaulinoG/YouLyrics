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
}