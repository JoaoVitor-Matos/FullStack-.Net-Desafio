using app.services;
using domain;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace api.Controllers;

[ApiController]
[Route("api/leads")]
public class LeadsController : ControllerBase
{
    private readonly LeadService _leadService;

    public LeadsController(LeadService leadService)
    {
        _leadService = leadService;
    }

    [HttpGet("invited")]
    public async Task<IActionResult> GetInvitedLeads()
    {
        var leads = await _leadService.GetInvitedLeadsAsync();
        return Ok(leads);
    }

    [HttpGet("accepted")]
    public async Task<IActionResult> GetAcceptedLeads()
    {
        var leads = await _leadService.GetAcceptedLeadsAsync();
        return Ok(leads);
    }

    [HttpPost("{id}/accept")]
    public async Task<IActionResult> AcceptLead(int id)
    {
        var lead = await _leadService.GetLeadByIdAsync(id); // Adicione este método ao LeadService
        if (lead == null)
            return NotFound(new { message = "Lead não encontrado" });

        await _leadService.AcceptLeadAsync(id);
        return Ok();
    }

    [HttpPost("{id}/decline")]
    public async Task<IActionResult> DeclineLead(int id)
    {
        var lead = await _leadService.GetLeadByIdAsync(id); // Adicione este método ao LeadService
        if (lead == null)
            return NotFound(new { message = "Lead não encontrado" });

        await _leadService.DeclineLeadAsync(id);
        return Ok();
    }
    [HttpPost]
    public async Task<IActionResult> CreateLead([FromBody] Lead newLead)
    {
        newLead.Status = LeadStatus.Invited;
        newLead.CreatedAt = DateTime.UtcNow;
        _leadService.AddLead(newLead);
        await _leadService.SaveChangesAsync();

        return CreatedAtAction(nameof(GetInvitedLeads), new { id = newLead.Id }, newLead);
    }
        [HttpGet("declined")]
    public async Task<IActionResult> GetDeclinedLeads()
    {
        var leads = await _leadService.GetDeclinedLeadsAsync();
        return Ok(leads);
    }
}