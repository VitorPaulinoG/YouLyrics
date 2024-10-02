using Microsoft.EntityFrameworkCore;
using YouLyricsAPI.Data;
using YouLyricsAPI.Models;

namespace YouLyricsAPI.Repositories;

public class UserRepository
{
    private AppDbContext _appDbContext;

    public UserRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }
    
    public async Task<IEnumerable<User>> GetUsersAsync()
        => await _appDbContext.Users.ToListAsync();
    
    public async Task<IEnumerable<User>> GetUsersContainingNameAsync (String name)
        => await _appDbContext.Users
            .Where(user => user.Name.Contains(name))
            .ToListAsync();
    
    public async Task<User> GetUserByIdAsync(Guid id)
        => await _appDbContext.Users
            .FirstOrDefaultAsync(user => user.Id == id);
    
    public async Task<User> GetUserByNameAsync(String name)
        => await _appDbContext.Users
            .FirstOrDefaultAsync(user => user.Name == name);

    public async Task<User> UpdateUserFromId(Guid id, User user)
    {
        User updatedUser = await GetUserByIdAsync(id);
        
        updatedUser.Name = user.Name;
        updatedUser.Email = user.Email;
        await _appDbContext.SaveChangesAsync();
            
        return updatedUser;
    }

    public async Task<User> AddUserAsync(User user)
    {
        await _appDbContext.Users.AddAsync(user);
        await _appDbContext.SaveChangesAsync();
        
        return user;
    }

    public async Task DeleteUserAsync(Guid id)
    {
        User user = await GetUserByIdAsync(id);
        _appDbContext.Users.Remove(user);
        await _appDbContext.SaveChangesAsync();
    }
    
    
}