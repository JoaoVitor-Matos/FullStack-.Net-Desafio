namespace domain;

public enum LeadStatus
{
    Invited,
    Accepted,
    Declined
}

public class Lead
{
    public int Id { get; set; }
    public string ContactFirstName { get; set; } = string.Empty;
    public string? ContactFullName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string Suburb { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public DateTime CreatedAt { get; set; }
    public LeadStatus Status { get; set; }
}
