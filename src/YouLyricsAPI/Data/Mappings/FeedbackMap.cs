using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YouLyricsAPI.Models;

namespace YouLyricsAPI.Data.Mappings;

public class FeedbackMap : IEntityTypeConfiguration<Feedback>
{
    public void Configure(EntityTypeBuilder<Feedback> builder)
    {
        builder.ToTable("tb_Feedback");
        
        builder.HasKey(feedback => feedback.Id);
        builder.Property(feedback => feedback.Id)
            .ValueGeneratedOnAdd()
            .HasDefaultValue(Guid.NewGuid());

        var jsonOptions = new JsonSerializerOptions();
        builder.Property(feedback => feedback.Review)
            .HasColumnType("NVARCHAR")
            .HasConversion(
                review => JsonSerializer.Serialize(review, jsonOptions),
                review => JsonSerializer.Deserialize<Dictionary<string, float>>(review, jsonOptions)
            )
            .IsRequired();
        
        builder.HasOne(feedback => feedback.Text)
            .WithMany()
            .HasForeignKey(feedback => feedback.TextId)
            .HasConstraintName("FK_Feedback_TextId");
        
        builder.HasOne(feedback => feedback.Author)
            .WithMany()
            .HasForeignKey(feedback => feedback.AuthorId)
            .HasConstraintName("FK_Feedback_AuthorId");
    }
}