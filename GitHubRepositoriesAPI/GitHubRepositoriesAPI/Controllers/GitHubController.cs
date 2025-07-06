using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using GitHubRepositoriesAPI.Extensions;
using GitHubRepositoriesAPI.Classes;

[ApiController]
[Route("api/[controller]")]
public class GitHubController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;

    public GitHubController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    [Authorize]
    [HttpGet("search")]
    public async Task<IActionResult> SearchRepositories([FromQuery] string q)
    {
        if (string.IsNullOrWhiteSpace(q))
            return BadRequest("Query parameter 'q' is required.");
        var client = _httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("MyApp", "1.0"));

        var url = $"https://api.github.com/search/repositories?q={Uri.EscapeDataString(q)}";
        var response = await client.GetAsync(url);

        if (!response.IsSuccessStatusCode)
            return StatusCode((int)response.StatusCode, "Error fetching data from GitHub");

        var jsonString = await response.Content.ReadAsStringAsync();
        return Content(jsonString, "application/json");
    }

    [Authorize]
    [HttpPost("addbookmark")]
    public IActionResult AddBookmark([FromBody] Bookmark repo)
    {       
        var bookmarks = HttpContext.Session.Get<List<Bookmark>>("Bookmarks") ?? new List<Bookmark>();
        bookmarks.Add(repo);
        HttpContext.Session.Set("Bookmarks", bookmarks);
        return Ok();
    }

    [Authorize]
    [HttpGet("getbookmarks")]
    public IActionResult GetBookmarks()
    {
        var bookmarks = HttpContext.Session.Get<List<Bookmark>>("Bookmarks") ?? new List<Bookmark>();
        return Ok(bookmarks);
    }
}
