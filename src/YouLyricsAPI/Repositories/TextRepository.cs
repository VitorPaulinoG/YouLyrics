using Microsoft.EntityFrameworkCore;
using YouLyricsAPI.Data;
using YouLyricsAPI.Models;

namespace YouLyricsAPI.Repositories;

public class TextRepository
{
    private AppDbContext _appDbContext;

    public TextRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<IEnumerable<Text>> GetTextsAsync()
        => await _appDbContext.Texts
            .Include(text => text.TextualGenre)
            .Include(text => text.Themes)
            .ToListAsync();
    
    public async Task<IEnumerable<Text>> GetTextsOrderingByDateAsync()
        => await _appDbContext.Texts
            .OrderByDescending(text => text.CreatedAt)
            .Include(text => text.TextualGenre)
            .Include(text => text.Themes)
            .ToListAsync();
    
    public async Task<IEnumerable<Text>> GetTextContainingTitleAsync(string title)
        => await _appDbContext.Texts
            .Where(text => text.Title.Contains(title))
            .Include(text => text.TextualGenre)
            .Include(text => text.Themes)
            .ToListAsync();
    
    public async Task<IEnumerable<Text>> GetTextContainingContentAsync(string content)
        => await _appDbContext.Texts
            .Where(text => text.Content.Contains(content))
            .Include(text => text.TextualGenre)
            .Include(text => text.Themes)
            .ToListAsync();
    
    public async Task<IEnumerable<Text>> GetTextContainingExpressionAsync(string expression)
        => await _appDbContext.Texts
            .Where(text => 
                text.Title.Contains(expression) ||
                text.Content.Contains(expression)) 
            .Include(text => text.TextualGenre)
            .Include(text => text.Themes)
            .ToListAsync();

    public async Task<Text> GetTextByIdAsync(Guid id)
        => await _appDbContext.Texts
            .Include(text => text.TextualGenre)
            .Include(text => text.Themes)
            .FirstOrDefaultAsync(text => text.Id == id);
    
    public async Task<Text> AddTextAsync(Text text)
    {
        await _appDbContext.Texts.AddAsync(text);
        await _appDbContext.SaveChangesAsync();
        return text;
    }

    public async Task<Text> UpdateTextAsync(Guid id, Text text)
    {
        Text updatedText = await GetTextByIdAsync(id);
        updatedText.Title = text.Title;
        updatedText.Content = text.Content;
        updatedText.Themes = text.Themes;

        await _appDbContext.SaveChangesAsync();
        return updatedText;
    }

    public async Task DeleteTextAsync(Guid id)
    {
        Text text = await GetTextByIdAsync(id);
        _appDbContext.Texts.Remove(text);
        await _appDbContext.SaveChangesAsync();
    }
    
}