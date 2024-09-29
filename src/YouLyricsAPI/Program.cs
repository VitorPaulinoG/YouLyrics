using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using YouLyricsAPI.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
