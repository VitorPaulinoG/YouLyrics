using Microsoft.EntityFrameworkCore;
using YouLyricsAPI.Data;
using YouLyricsAPI.Models;

namespace YouLyricsAPI.Repositories;

public class FeedbackRepository
{
    private AppDbContext _appDbContext;

    public FeedbackRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<IEnumerable<Feedback>> GetFeedbacksByTextIdAsync(Guid textId)
        => await _appDbContext.Feedbacks.Where(feedback => feedback.TextId == textId).ToListAsync();
    
    public async Task<IEnumerable<Feedback>> GetFeedbackByAuthorIdAsync (Guid authorId)
        => await _appDbContext.Feedbacks.Where(feedback => feedback.AuthorId == authorId).ToListAsync();
    
    public async Task<Feedback> GetFeedbackByIdAsync(Guid id)
        => await _appDbContext.Feedbacks.FirstOrDefaultAsync(feedback => feedback.Id == id);

    public async Task<Feedback> AddFeedbackAsync(Feedback feedback)
    {
        await _appDbContext.Feedbacks.AddAsync(feedback);
        await _appDbContext.SaveChangesAsync();
        return feedback;
    }

    public async Task<Feedback> UpdateFeedbackAsync(Guid id, Feedback feedback)
    {
        Feedback updatedFeedback = await GetFeedbackByIdAsync(id);
        updatedFeedback.Review = feedback.Review;
        
        await _appDbContext.SaveChangesAsync();
        return updatedFeedback;
    }

    public async Task DeleteFeedbackAsync(Guid id)
    {
        Feedback feedback = await GetFeedbackByIdAsync(id);
        _appDbContext.Feedbacks.Remove(feedback);
        await _appDbContext.SaveChangesAsync();
    }
    
}