using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YouLyricsAPI.Models;

namespace YouLyricsAPI.Data.Mappings;

public class ThemeMap : IEntityTypeConfiguration<Theme>
{
    public void Configure(EntityTypeBuilder<Theme> builder)
    {
        builder.ToTable("tb_Theme");
        
        builder.HasKey(theme => theme.Id);
        builder.Property(theme => theme.Id)
            .ValueGeneratedOnAdd()
            .HasDefaultValue(Guid.NewGuid());

        builder.Property(theme => theme.Name)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(200)
            .IsRequired();
        
        builder.Property(theme => theme.Description)
            .HasColumnType("NVARCHAR")
            .HasDefaultValue(string.Empty);
    }
}