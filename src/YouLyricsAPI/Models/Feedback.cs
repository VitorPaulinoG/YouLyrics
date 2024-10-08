using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace YouLyricsAPI.Models;

public class Feedback
{
    public Guid Id { get; set; }
    public Dictionary<string, float> Review { get; set; }
    public Guid AuthorId { get; set; }
    [ValidateNever]
    public User Author { get; set; }
    public Guid TextId { get; set; }
    [ValidateNever]
    public Text Text { get; set; }

    public Feedback()
    {
        
    }
    public Feedback(Dictionary<string, float> review, Guid authorId, User author, Guid textId, Text text)
    {
        Id = Guid.NewGuid();
        Review = review;
        AuthorId = authorId;
        Author = author;
        TextId = textId;
        Text = text;
    }
}