namespace YouLyricsAPI.Models;

public class Comment
{
    public Guid Id { get; set; }
    public string Content { get; set; }
    public User Author { get; set; }
    public Text Text { get; set; }
}