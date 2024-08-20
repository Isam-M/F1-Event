namespace F1API.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using F1API.Models;
using F1API.Contexts;

[ApiController]
[Route("api/[controller]")]

public class RacesController : ControllerBase
{
    private readonly F1Context f1context;

    public RacesController(F1Context _f1Context)
    {
        f1context = _f1Context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Race>>> Get()
    {
        try
        {
            List<Race> races = await f1context.Races.ToListAsync();
            return Ok(races);
        }
        catch
        {
            return StatusCode(500);
        }

    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Race>> Get(int id)
    {
        try
        {
            Race? race = await f1context.Races.FindAsync(id);
            if (race != null)
            {
                return Ok(race);
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
    [Route("[action]/{WinnerName}")]
    public async Task<ActionResult<List<Race>>> Get(string WinnerName)
    {
        try
        {
            List<Race> races = await f1context.Races
                .Where(r => r.WinnerName == WinnerName)
                .ToListAsync();

            if (races.Count > 0)
            {
                return Ok(races);
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
    public async Task<IActionResult> Post(Race newRace)
    {
        try
        {
            f1context.Races.Add(newRace);
            await f1context.SaveChangesAsync();
            return Ok();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put(Race updatedRace)
    {
        try
        {
            f1context.Entry(updatedRace).State = EntityState.Modified;
            await f1context.SaveChangesAsync();
            return Ok();
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
            Race? race = await f1context.Races.FindAsync(id);
            if (race != null)
            {
                f1context.Races.Remove(race);
                await f1context.SaveChangesAsync();
                return Ok();
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