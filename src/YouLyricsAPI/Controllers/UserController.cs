using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using YouLyricsAPI.Data;
using YouLyricsAPI.Models;
using YouLyricsAPI.Repositories;

namespace YouLyricsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private UserRepository _userRepository;

    public UserController([FromServices] AppDbContext context)
    {
        this._userRepository = new UserRepository(context);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userRepository.GetUsersAsync();
        return Ok(users);
    }

    [HttpGet("contains")]
    public async Task<IActionResult> GetUsersContainingName([FromQuery(Name = "name")] string name)
    {
        var users = await _userRepository.GetUsersContainingNameAsync(name);
        return Ok(users);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetUserById(Guid id)
    {
        var user = await _userRepository.GetUserByIdAsync(id);
        
        if(user == null)
            return NotFound(new { message = "No users found. "});
        
        return Ok(user);
    }    
    
    [HttpGet("{name}")]
    public async Task<IActionResult> GetUserByName(string name)
    {
        var user = await _userRepository.GetUserByNameAsync(name);
        
        if(user == null)
            return NotFound(new { message = "No users found with this name. "});
        
        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> AddUser([FromBody] User user)
    {
        var addedUser = await _userRepository.AddUserAsync(user);
        return CreatedAtAction(nameof(GetUserById), new { id = addedUser.Id }, addedUser);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] User user)
    {
        var updatedUser = await _userRepository.UpdateUserFromId(id, user);
        return Ok(updatedUser);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        await _userRepository.DeleteUserAsync(id);
        return NoContent();
    }
}