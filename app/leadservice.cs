using data;
using domain;
using Microsoft.EntityFrameworkCore;

namespace app.services;

public class LeadService
{
    private readonly AppDbContext _db;

    public LeadService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Lead>> GetInvitedLeadsAsync()
    {
        return await _db.Leads.Where(l => l.Status == LeadStatus.Invited).ToListAsync();
    }

    public async Task<List<Lead>> GetAcceptedLeadsAsync()
    {
        return await _db.Leads.Where(l => l.Status == LeadStatus.Accepted).ToListAsync();
    }

    public async Task<Lead?> GetLeadByIdAsync(int id)
    {
        return await _db.Leads.FindAsync(id);
    }
        public void AddLead(Lead lead)
    {
        _db.Leads.Add(lead);
    }

    public async Task SaveChangesAsync()
    {
        await _db.SaveChangesAsync();
    }

    public async Task AcceptLeadAsync(int id)
    {
        var lead = await _db.Leads.FindAsync(id);
        if (lead == null) return;

        if (lead.Price > 500)
            lead.Price *= 0.9m;

        lead.Status = LeadStatus.Accepted;
        await _db.SaveChangesAsync();

        File.WriteAllText("notificacao.txt", $"Lead {lead.Id} aceito e notificação enviada.");
    }

    public async Task DeclineLeadAsync(int id)
    {
        var lead = await _db.Leads.FindAsync(id);
        if (lead == null) return;

        lead.Status = LeadStatus.Declined;
        await _db.SaveChangesAsync();
    }
        public async Task<List<Lead>> GetDeclinedLeadsAsync()
    {
        return await _db.Leads.Where(l => l.Status == LeadStatus.Declined).ToListAsync();
    }
}