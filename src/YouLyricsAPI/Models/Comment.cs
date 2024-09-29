namespace YouLyricsAPI.Models;

public class Comment
{
    public Guid Id { get; set; }
    public string Content { get; set; }
    public User Author { get; set; }
    public Text Text { get; set; }

    public Comment()
    {
        
    }
    
    public Comment(Guid id, string content, User author, Text text)
    {
        Id = id;
        Content = content;
        Author = author;
        Text = text;
    }
}