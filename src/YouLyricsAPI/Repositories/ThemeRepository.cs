using Microsoft.EntityFrameworkCore;
using YouLyricsAPI.Data;
using YouLyricsAPI.Models;

namespace YouLyricsAPI.Repositories;

public class ThemeRepository
{
    private AppDbContext _appDbContext;

    public ThemeRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<IEnumerable<Theme>> GetThemesAsync()
        => await _appDbContext.Themes.ToListAsync();
    
    public async Task<Theme> GetThemeByIdAsync(Guid id)
        => await _appDbContext.Themes.FirstOrDefaultAsync(theme => theme.Id == id);
    
    public async Task<Theme> GetThemeByNameAsync(string name)
        => await _appDbContext.Themes.FirstOrDefaultAsync(theme => theme.Name == name);

    public async Task<Theme> AddThemeAsync(Theme theme)
    {
        await _appDbContext.Themes.AddAsync(theme);
        await _appDbContext.SaveChangesAsync();
        return theme;
    }

    public async Task<Theme> UpdateThemeAsync(Guid id, Theme theme)
    {
        Theme updatedTheme = await GetThemeByIdAsync(id);
        
        updatedTheme.Name = theme.Name;
        updatedTheme.Description = theme.Description;

        await _appDbContext.SaveChangesAsync();
        return updatedTheme;
    }

    public async Task DeleteThemeAsync(Guid id)
    {
        Theme theme = await GetThemeByIdAsync(id);
        
        _appDbContext.Themes.Remove(theme);
        await _appDbContext.SaveChangesAsync();
    }
}