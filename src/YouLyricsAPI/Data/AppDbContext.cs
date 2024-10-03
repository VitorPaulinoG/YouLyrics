using Microsoft.EntityFrameworkCore;
using YouLyricsAPI.Data.Mappings;
using YouLyricsAPI.Models;

namespace YouLyricsAPI.Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Text> Texts { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }
    public DbSet<TextualGenre> TextualGenres { get; set; }
    public DbSet<Theme> Themes { get; set; }
    
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .ApplyConfiguration(new CommentMap())
            .ApplyConfiguration(new FeedbackMap())
            .ApplyConfiguration(new TextMap())
            .ApplyConfiguration(new TextualGenreMap())
            .ApplyConfiguration(new ThemeMap())
            .ApplyConfiguration(new UserMap());
    }
}