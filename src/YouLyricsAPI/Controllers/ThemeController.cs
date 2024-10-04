using Microsoft.AspNetCore.Mvc;
using YouLyricsAPI.Data;
using YouLyricsAPI.Models;
using YouLyricsAPI.Repositories;

namespace YouLyricsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ThemeController : ControllerBase
{
    private ThemeRepository _themeRepository;

    public ThemeController([FromServices] AppDbContext context)
    {
        this._themeRepository = new ThemeRepository(context);
    }

    [HttpGet]
    public async Task<IActionResult> GetThemes()
    {
        var themes = await _themeRepository.GetThemesAsync();
        return Ok(themes);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetThemeById(Guid id)
    {
        var theme = await _themeRepository.GetThemeByIdAsync(id);
        return Ok(theme);
    }

    [HttpGet("{name}")]
    public async Task<IActionResult> GetThemeByName(string name)
    {
        var theme = await _themeRepository.GetThemeByNameAsync(name);
        return Ok(theme);
    }

    [HttpPost]
    public async Task<IActionResult> AddTheme([FromBody] Theme theme)
    {
        var addedTheme = await _themeRepository.AddThemeAsync(theme);
        return CreatedAtAction(nameof(GetThemeById), new { id = addedTheme.Id }, addedTheme);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateTheme(Guid id, [FromBody] Theme theme)
    {
        var updatedTheme = await _themeRepository.UpdateThemeAsync(id, theme);
        return Ok(updatedTheme);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteTheme(Guid id)
    {
        await _themeRepository.DeleteThemeAsync(id);
        return NoContent();
    }
    
}