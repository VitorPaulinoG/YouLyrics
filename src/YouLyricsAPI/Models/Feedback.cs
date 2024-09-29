namespace YouLyricsAPI.Models;

public class Feedback
{
    public Guid Id { get; set; }
    public Dictionary<string, float> Review { get; set; }
    public Guid AuthorId { get; set; }
    public User Author { get; set; }
    public Guid TextId { get; set; }
    public Text Text { get; set; }

    public Feedback()
    {
        
    }
    public Feedback(Guid id, Dictionary<string, float> review, Guid authorId, User author, Guid textId, Text text)
    {
        Id = id;
        Review = review;
        AuthorId = authorId;
        Author = author;
        TextId = textId;
        Text = text;
    }
}