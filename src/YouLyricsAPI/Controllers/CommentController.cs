using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using YouLyricsAPI.Data;
using YouLyricsAPI.Models;
using YouLyricsAPI.Repositories;

namespace YouLyricsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommentController : ControllerBase
{
    private CommentRepository _commentRepository;

    public CommentController(AppDbContext context)
    {
        this._commentRepository = new CommentRepository(context);
    }
    
    [HttpGet("by-text")]
    public async Task<IActionResult> GetCommentsByTextId([FromQuery(Name = "textId")] Guid textId)
    {
        var comments = await _commentRepository.GetCommentsByTextIdAsync(textId);
        return Ok(comments);
    }

    [HttpGet("by-author")]
    public async Task<IActionResult> GetCommentsByAuthorId([FromQuery(Name = "authorId")] Guid authorId)
    {
        var comments = await _commentRepository.GetCommentsByAuthorIdAsync(authorId);
        return Ok(comments);
    }    
    
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetCommentById(Guid id)
    {
        var comment = await _commentRepository.GetCommentByIdAsync(id);
        return Ok(comment);
    }

    [HttpPost]
    public async Task<IActionResult> AddComment([FromBody] Comment comment)
    {
        var addedComment = await _commentRepository.AddCommentAsync(comment);
        return CreatedAtAction(nameof(GetCommentById), new { id = addedComment.Id }, addedComment);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateComment(Guid id, [FromBody] Comment comment)
    {
        var updatedComment = await _commentRepository.UpdateCommentAsync(id, comment);
        return Ok(updatedComment);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteComment(Guid id)
    {
        await _commentRepository.DeleteCommentAsync(id);
        return NoContent();
    }
    
    
    
    
    
}