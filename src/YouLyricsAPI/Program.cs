using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using YouLyricsAPI.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddRouting(options => options.LowercaseUrls = true);
var app = builder.Build();

app.MapControllers();
app.Run();
