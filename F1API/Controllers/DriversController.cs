namespace F1API.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using F1API.Models;
using F1API.Contexts;

[ApiController]
[Route("api/[controller]")]

public class DriversController : ControllerBase
{
    private readonly F1Context f1context;

    public DriversController(F1Context _f1Context)
    {
        f1context = _f1Context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Driver>>> Get()
    {
        try
        {
            List<Driver> drivers = await f1context.Drivers.ToListAsync();
            return Ok(drivers);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Driver>> Get(int id)
    {
        try
        {
            Driver? driver = await f1context.Drivers.FindAsync(id);
            if (driver != null)
            {
                return Ok(driver);
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

    [HttpGet]
    [Route("[action]/{Nationality}")]
    public async Task<ActionResult<List<Driver>>> Get(string Nationality)
    {
        try
        {
            List<Driver> drivers = await f1context.Drivers
                .Where(d => d.Nationality == Nationality)
                .ToListAsync();

            if (drivers.Count > 0)
            {
                return Ok(drivers);
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
    public async Task<ActionResult<Driver>> Post(Driver newdriver)
    {
        try
        {
            f1context.Drivers.Add(newdriver);
            await f1context.SaveChangesAsync();
            return Ok(newdriver);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put(Driver updatedDriver)
    {
        try
        {
            f1context.Entry(updatedDriver).State = EntityState.Modified;
            await f1context.SaveChangesAsync();
            return NoContent();
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
            Driver? driver = await f1context.Drivers.FindAsync(id);
            if (driver != null)
            {
                f1context.Drivers.Remove(driver);
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