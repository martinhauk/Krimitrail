using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Headers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Net.Http.Headers;

namespace Krimitrail.Server
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);

      builder.Services.AddControllers().AddJsonOptions(jsOptions => jsOptions.JsonSerializerOptions.PropertyNamingPolicy = null);

      var app = builder.Build();

      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseHttpsRedirection();
      app.UseAuthorization();

      app.MapControllers();
      app.MapFallbackToFile("/index.html");

      app.Run();
    }
  }
}
