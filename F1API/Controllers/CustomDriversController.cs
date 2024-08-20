namespace F1API.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using F1API.Models;
using F1API.Contexts;

[ApiController]
[Route("api/[controller]")]

public class CustomDriversController : ControllerBase
{
    private readonly F1Context f1context;

    public CustomDriversController(F1Context _f1Context)
    {
        f1context = _f1Context;
    }

    [HttpGet]
    public async Task<ActionResult<List<CustomDriver>>> Get()
    {
        try
        {
            List<CustomDriver> customdrivers = await f1context.CustomDrivers.ToListAsync();
            return Ok(customdrivers);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CustomDriver>> Get(int id)
    {
        try
        {
            CustomDriver? customdriver = await f1context.CustomDrivers.FindAsync(id);
            if (customdriver != null)
            {
                return Ok(customdriver);
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPost]
    public async Task<ActionResult<CustomDriver>> Post(CustomDriver newcustomdriver)
    {
        try
        {
            f1context.CustomDrivers.Add(newcustomdriver);
            await f1context.SaveChangesAsync();
            return Ok(newcustomdriver);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put(CustomDriver updatedcustomdriver)
    {
        try
        {
            f1context.CustomDrivers.Entry(updatedcustomdriver).State = EntityState.Modified;
            await f1context.SaveChangesAsync();
            return Ok(updatedcustomdriver);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            CustomDriver? customdriver = await f1context.CustomDrivers.FindAsync(id);
            if (customdriver != null)
            {
                f1context.CustomDrivers.Remove(customdriver);
                await f1context.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }
}