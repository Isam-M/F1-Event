namespace F1API.Interfaces;

public interface ICustomDriver
{
    int Id { get; set; }
    string? Name { get; set; }
    int Age { get; set; }
    string? Nationality { get; set; }
    string ? DriverImage { get; set; }
    string ? CarImage { get; set; }
    string ? CarBrand { get; set; }
}
