using Microsoft.AspNetCore.Mvc;
using YouLyricsAPI.Data;
using YouLyricsAPI.Models;
using YouLyricsAPI.Repositories;

namespace YouLyricsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeedbackController : ControllerBase
{
    private FeedbackRepository _feedbackRepository;

    public FeedbackController(AppDbContext context)
    {
        this._feedbackRepository = new FeedbackRepository(context);   
    }

    [HttpGet("by-text")]
    public async Task<IActionResult> GetFeedbacksByTextId([FromQuery(Name = "textId")] Guid textId)
    {
        var feedbacks = await _feedbackRepository.GetFeedbacksByTextIdAsync(textId);
        return Ok(feedbacks);
    }

    [HttpGet("by-author")]
    public async Task<IActionResult> GetFeedbacksByAuthorId([FromQuery(Name = "authorId")] Guid authorId)
    {
        var feedbacks = await _feedbackRepository.GetFeedbackByAuthorIdAsync(authorId);
        return Ok(feedbacks);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetFeedbackById(Guid id)
    {
        var feedback = await _feedbackRepository.GetFeedbackByIdAsync(id);
        return Ok(feedback);
    }

    [HttpPost]
    public async Task<IActionResult> AddFeedback([FromBody] Feedback feedback)
    {
        var addedFeedback = await _feedbackRepository.AddFeedbackAsync(feedback);
        return CreatedAtAction(nameof(GetFeedbackById), new { id = addedFeedback.Id }, addedFeedback);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateFeedback(Guid id, [FromBody] Feedback feedback)
    {
        var updatedFeedback = await _feedbackRepository.UpdateFeedbackAsync(id, feedback);
        return Ok(updatedFeedback);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteFeedback(Guid id)
    {
        await _feedbackRepository.DeleteFeedbackAsync(id);
        return NoContent();
    }
}