using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YouLyricsAPI.Models;

namespace YouLyricsAPI.Data.Mappings;

public class TextMap : IEntityTypeConfiguration<Text>
{
    public void Configure(EntityTypeBuilder<Text> builder)
    {
        builder.ToTable("tb_Text");
        
        builder.HasKey(text => text.Id);
        builder.Property(text => text.Id)
            .ValueGeneratedOnAdd()
            .HasDefaultValue(Guid.NewGuid());

        builder.Property(text => text.Title)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(200)
            .IsRequired();
        builder.Property(text => text.Content)
            .HasColumnType("TEXT")
            .IsRequired();

        builder.HasOne(text => text.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .HasConstraintName("FK_Text_UserId");
            
        builder.Property(text => text.CreatedAt)
            .HasColumnType("DATETIME")
            .HasDefaultValue(DateTime.Now);
        
        builder.HasOne(text => text.TextualGenre)
            .WithMany()
            .HasForeignKey(text => text.TextualGenreId)
            .HasConstraintName("FK_Text_TextualGenreId")
            .IsRequired();
        
        builder.HasMany(text => text.Themes)
            .WithMany()
            .UsingEntity(
                "TextTheme",
                text => text.HasOne(typeof(Theme))
                    .WithMany()
                    .HasForeignKey("ThemeId")
                    .HasConstraintName("FK_TextTheme_ThemeId")
                    .IsRequired(),
                themes => themes.HasOne(typeof(Text))
                    .WithMany()
                    .HasForeignKey("TextId")
                    .HasConstraintName("FK_TextTheme_TextId"),
                textTheme => textTheme.ToTable("tb_TextTheme")
                );
    }
}