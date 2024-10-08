using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace YouLyricsAPI.Models;

public class Comment
{
    public Guid Id { get; set; }
    public string Content { get; set; }
    public Guid AuthorId { get; set; }
    [ValidateNever]
    public User Author { get; set; }
    public Guid TextId { get; set; }
    [ValidateNever]
    public Text Text { get; set; }

    public Comment()
    {
        
    }
    
    public Comment(string content, Guid authorId, User author, Guid textId, Text text)
    {
        Id = Guid.NewGuid();
        Content = content;
        AuthorId = authorId;
        Author = author;
        TextId = textId;
        Text = text;
    }
}