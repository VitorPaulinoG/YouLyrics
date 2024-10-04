using Microsoft.AspNetCore.Mvc;
using YouLyricsAPI.Data;
using YouLyricsAPI.Models;
using YouLyricsAPI.Repositories;

namespace YouLyricsAPI.Controllers;
[ApiController]
[Route("api/[controller]")]
public class TextualGenreController : ControllerBase
{
    private TextualGenreRepository _textualGenreRepository;

    public TextualGenreController([FromServices] AppDbContext context)
    {
        this._textualGenreRepository = new TextualGenreRepository(context);
    }

    [HttpGet]
    public async Task<IActionResult> GetTextualGenres()
    {
        var textualGenres = await this._textualGenreRepository.GetTextualGenresAsync();
        return Ok(textualGenres);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetTextualGenreById(Guid id)
    {
        var textualGenre = await _textualGenreRepository.GetTextualGenreByIdAsync(id);
        return Ok(textualGenre);
    }

    [HttpGet("{name}")]
    public async Task<IActionResult> GetTextualGenreByName(string name)
    {
        var textualGenre = await _textualGenreRepository.GetTextualGenreByNameAsync(name);
        return Ok(textualGenre);
    }

    [HttpPost]
    public async Task<IActionResult> AddTextualGenre([FromBody] TextualGenre textualGenre)
    {
        var addedTextualGenre = await _textualGenreRepository.AddTextualGenreAsync(textualGenre);
        return CreatedAtAction(nameof(GetTextualGenreById),
            new { id = addedTextualGenre.Id },
            addedTextualGenre);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateTextualGenre(Guid id, [FromBody] TextualGenre textualGenre)
    {
        var updatedTextualGenre = await _textualGenreRepository.UpdateTextualGenreAsync(id, textualGenre);
        return Ok(updatedTextualGenre);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteTextualGenre(Guid id)
    {
        await _textualGenreRepository.DeleteTextualGenreAsync(id);
        return NoContent();
    }
    
    
}