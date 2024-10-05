using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using YouLyricsAPI.Data;
using YouLyricsAPI.Models;
using YouLyricsAPI.Repositories;

namespace YouLyricsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TextController : ControllerBase
{
    private TextRepository _textRepository;

    public TextController([FromServices] AppDbContext context)
    {
        this._textRepository = new TextRepository(context);
    }
    
    
    [HttpGet]
    public async Task<IActionResult> GetRecentTexts()
    {
        var texts = await _textRepository.GetTextsOrderingByDateAsync();
        return Ok(texts);
    }

    [HttpGet("title")]
    public async Task<IActionResult> GetTextsContainingTitle([FromQuery(Name = "title")] string title)
    {
        var texts = await _textRepository.GetTextContainingTitleAsync(title);
        return Ok(texts);
    }
    
    [HttpGet("content")]
    public async Task<IActionResult> GetTextsContainingContent([FromQuery(Name = "content")] string content)
    {
        var texts = await _textRepository.GetTextContainingContentAsync(content);
        return Ok(texts);
    }

    [HttpGet]
    public async Task<IActionResult> GetTextsContainingExpression([FromQuery(Name = "expression")] string expression)
    {
        var texts = await _textRepository.GetTextContainingExpressionAsync(expression);
        return Ok(texts);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetTextById([FromRoute] Guid id)
    {
        var text = await _textRepository.GetTextByIdAsync(id);
        return Ok(text);
    }

    [HttpPost]
    public async Task<IActionResult> AddText([FromBody] Text text)
    {
        var addedText = await _textRepository.AddTextAsync(text);
        return CreatedAtAction(nameof(GetTextById), new { id = addedText.Id }, addedText);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateText([FromRoute] Guid id, [FromBody] Text text)
    {
        var updatedText = await _textRepository.UpdateTextAsync(id, text);
        return Ok(updatedText);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteText([FromRoute] Guid id)
    {
        await _textRepository.DeleteTextAsync(id);
        return NoContent();
    }
    
}