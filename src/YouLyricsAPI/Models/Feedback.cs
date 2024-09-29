namespace YouLyricsAPI.Models;

public class Feedback
{
    public Guid Id { get; set; }
    public Dictionary<string, float> Review { get; set; }
    public User User { get; set; }
    public Text Text { get; set; }
}