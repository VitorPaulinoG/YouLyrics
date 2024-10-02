using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YouLyricsAPI.Models;

namespace YouLyricsAPI.Data.Mappings;

public class UserMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("tb_User");
        
        builder.HasKey(user => user.Id);
        builder.Property(user => user.Id)
            .ValueGeneratedOnAdd();

        builder.Property(user => user.Name)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(100)
            .IsRequired();
        
        builder.Property(user => user.Email)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(200)
            .IsRequired();
        
        builder.Property(user => user.Password)
            .HasColumnType("NVARCHAR")
            .HasMaxLength(32)
            .IsRequired();
        
        builder.Property(user => user.Level)
            .HasColumnType("INT")
            .HasDefaultValue(1)
            .IsRequired();
    }
}