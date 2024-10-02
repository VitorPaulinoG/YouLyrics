using Microsoft.EntityFrameworkCore;
using YouLyricsAPI.Data;
using YouLyricsAPI.Models;

namespace YouLyricsAPI.Repositories;

public class TextualGenreRepository
{
    private AppDbContext _appDbContext;

    public TextualGenreRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<IEnumerable<TextualGenre>> GetTextualGenresAsync()
        => await _appDbContext.TextualGenres.ToListAsync ();
    
    public async Task<TextualGenre> GetTextualGenreByIdAsync (Guid id)
        => await _appDbContext.TextualGenres.FirstOrDefaultAsync(x => x.Id == id);
    
    public async Task<TextualGenre> GetTextualGenreByNameAsync (string name)
        => await _appDbContext.TextualGenres.FirstOrDefaultAsync(x => x.Name == name);

    public async Task<TextualGenre> AddTextualGenreAsync(TextualGenre textualGenre)
    {
        await _appDbContext.TextualGenres.AddAsync(textualGenre);
        await _appDbContext.SaveChangesAsync();
        return textualGenre;
    }

    public async Task<TextualGenre> UpdateTextualGenreAsync(Guid id, TextualGenre textualGenre)
    {
        TextualGenre updatedTextualGenre = await GetTextualGenreByIdAsync(id);
        
        textualGenre.Name = updatedTextualGenre.Name;
        textualGenre.Description = updatedTextualGenre.Description;
        
        await _appDbContext.SaveChangesAsync();
        return updatedTextualGenre;
    }

    public async Task DeleteTextualGenreAsync(Guid id)
    {
        TextualGenre textualGenre = await GetTextualGenreByIdAsync(id);
        _appDbContext.TextualGenres.Remove(textualGenre);
        await _appDbContext.SaveChangesAsync();
    }
}