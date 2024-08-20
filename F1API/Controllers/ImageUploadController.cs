namespace F1API.Controllers;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]

public class ImageUploadController : ControllerBase
{
    private readonly IWebHostEnvironment environment;

    public ImageUploadController(IWebHostEnvironment _environment)
    {
        environment = _environment;
    }

    [HttpPost]
    public IActionResult PostImage(IFormFile formFile)
    {
        try
        {
            string webRootPath = environment.WebRootPath;
            string absolutePath = Path.Combine($"{webRootPath}/images/{formFile.FileName}");

            using (var stream = new FileStream(absolutePath, FileMode.Create))
            {
                formFile.CopyTo(stream);
            }

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }

}