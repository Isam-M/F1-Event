namespace F1API.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using F1API.Models;
using F1API.Contexts;

[ApiController]
[Route("api/[controller]")]

public class TeamsController : ControllerBase
{
    private readonly F1Context f1context;

    public TeamsController(F1Context _f1Context)
    {
        f1context = _f1Context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Team>>> Get()
    {
        try
        {
            List<Team> teams = await f1context.Teams.ToListAsync();
            return Ok(teams);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Team>> Get(int id)
    {
        try
        {
            Team? team = await f1context.Teams.FindAsync(id);
            if (team != null)
            {
                return Ok(team);
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
    public async Task<ActionResult<Team>> Post(Team newTeam)
    {
        try
        {
            f1context.Teams.Add(newTeam);
            await f1context.SaveChangesAsync();
            return Ok(newTeam);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put(Team updatedTeam)
    {
        try
        {
            f1context.Entry(updatedTeam).State = EntityState.Modified;
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
            Team? team = await f1context.Teams.FindAsync(id);
            if (team != null)
            {
                f1context.Teams.Remove(team);
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