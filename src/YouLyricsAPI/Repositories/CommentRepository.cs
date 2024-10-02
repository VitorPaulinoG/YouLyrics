using Microsoft.EntityFrameworkCore;
using YouLyricsAPI.Data;
using YouLyricsAPI.Models;

namespace YouLyricsAPI.Repositories;

public class CommentRepository
{
    private AppDbContext _appDbContext;

    public CommentRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<IEnumerable<Comment>> GetCommentsByTextIdAsync(Guid textId)
        => await _appDbContext.Comments.Where(comment => comment.TextId == textId)
            .Include(comment => comment.Author)
            .ToListAsync();
    
    public async Task<IEnumerable<Comment>> GetCommentsByAuthorIdAsync(Guid authorId)
        => await _appDbContext.Comments.Where(comment => comment.AuthorId == authorId)
            .Include(comment => comment.Author).ToListAsync();
    
    public async Task<Comment> GetCommentByIdAsync(Guid id)
        => await _appDbContext.Comments
            .Include(comment => comment.Author)
            .FirstOrDefaultAsync(comment => comment.Id == id);

    public async Task<Comment> AddCommentAsync(Comment comment)
    {
        await _appDbContext.Comments.AddAsync(comment);
        await _appDbContext.SaveChangesAsync();
        return comment;
    }

    public async Task<Comment> UpdateCommentAsync(Guid id, Comment comment)
    {
        Comment updatedComment = await GetCommentByIdAsync(id);
        updatedComment.Content = comment.Content;
        
        await _appDbContext.SaveChangesAsync();
        return updatedComment;
    }

    public async Task DeleteCommentAsync(Guid commentId)
    {
        Comment comment = await GetCommentByIdAsync(commentId);
        _appDbContext.Comments.Remove(comment);
        
        await _appDbContext.SaveChangesAsync();
    }
    
}