namespace F1API.Models;

using F1API.Interfaces;

public class CustomDriver : ICustomDriver
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Age { get; set; }
    public string? Nationality { get; set; }
    public string? DriverImage { get; set; }
    public string? CarImage { get; set; }
    public string? CarBrand { get; set; }

}