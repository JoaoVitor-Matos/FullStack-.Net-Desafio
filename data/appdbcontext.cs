using Microsoft.EntityFrameworkCore;
using domain;
namespace data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Lead> Leads => Set<Lead>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Lead>()
            .Property(l => l.Price)
            .HasPrecision(10, 2);
    }
}
