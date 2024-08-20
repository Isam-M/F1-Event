namespace F1API.Models;

using F1API.Interfaces;

public class Race : IRace
{
    public int Id { get; set; }
    public string? WinnerName { get; set; }
    public string? WinnerTime { get; set; } // bruker for å displaye tiden i riktig format
    public string? GrandPrix { get; set; }
    public int NumberOfLaps { get; set; }
}