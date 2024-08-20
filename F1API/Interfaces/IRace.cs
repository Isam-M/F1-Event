namespace F1API.Interfaces
{
    public interface IRace
    {
        int Id { get; set; }
        string? WinnerName { get; set; }
        string? WinnerTime { get; set; } // bruker for å displaye tiden i riktig format
        string? GrandPrix { get; set; }
        int NumberOfLaps { get; set; }
    }
}