namespace F1API.Contexts;

using Microsoft.EntityFrameworkCore;
using F1API.Models;

public class F1Context : DbContext
{
    public F1Context(DbContextOptions<F1Context> options) : base(options){}

    public DbSet<Driver> Drivers { get; set; } // tabeller
    public DbSet<Race> Races { get; set; }
    public DbSet<Team> Teams { get; set; }
    public DbSet<CustomDriver> CustomDrivers { get; set; }

}