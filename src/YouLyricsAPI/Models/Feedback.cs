namespace YouLyricsAPI.Models;

public class Feedback
{
    public Guid Id { get; set; }
    public Dictionary<string, float> Review { get; set; }
    public User User { get; set; }
    public Text Text { get; set; }

    public Feedback()
    {
        
    }
    public Feedback(Guid id, Dictionary<string, float> review, User user, Text text)
    {
        Id = id;
        Review = review;
        User = user;
        Text = text;
    }
}