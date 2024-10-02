using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YouLyricsAPI.Models;

namespace YouLyricsAPI.Data.Mappings;

public class CommentMap : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.ToTable("tb_Comment");
        
        builder.HasKey(comment => comment.Id);
        builder.Property(comment => comment.Id)
            .ValueGeneratedOnAdd();

        builder.Property(comment => comment.Content)
            .HasColumnType("TEXT")
            .IsRequired();
        builder.HasOne(comment => comment.Author)
            .WithMany()
            .HasForeignKey(comment => comment.AuthorId)
            .HasConstraintName("FK_Comment_AuthorId");

        builder.HasOne(comment => comment.Text)
            .WithMany()
            .HasForeignKey(comment => comment.TextId)
            .HasConstraintName("FK_Comment_TextId");
    }
}