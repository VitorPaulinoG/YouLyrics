using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YouLyricsAPI.Models;

namespace YouLyricsAPI.Data.Mappings;

public class TextualGenreMap : IEntityTypeConfiguration<TextualGenre>
{
    public void Configure(EntityTypeBuilder<TextualGenre> builder)
    {
        builder.ToTable("tb_TextualGenre");
        
        builder.HasKey(textualGenre => textualGenre.Id);
        builder.Property(textualGenre => textualGenre.Id)
            .ValueGeneratedOnAdd();

        builder.Property(textualGenre => textualGenre.Name)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(200)
            .IsRequired();
        
        builder.Property(textualGenre => textualGenre.Description)
            .HasColumnType("TEXT")
            .HasDefaultValue(string.Empty);
    }
}