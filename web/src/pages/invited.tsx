import { useEffect, useState } from 'react';
import {
  getInvitedLeads,
  acceptLead,
  declineLead,
} from '../services/leadService';
import type { Lead } from '../types/lead';
import { LeadCard } from '../components/leadcard';
import { Navbar } from '../components/navbar';
import { AxiosError } from 'axios';


interface ApiErrorResponse {
  message?: string;
}

export default function InvitedPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const loadLeads = async () => {
    try {
      const response = await getInvitedLeads();
      setLeads(response.data);
    } catch (err) {
      console.error('Erro ao carregar leads:', err);
      alert('Erro ao carregar leads');
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleAccept = async (id: number) => {
    try {
      
      const lead = leads.find((l) => l.id === id);
      if (!lead) {
        throw new Error('Lead não encontrado');
      }

      console.log(`Tentando aceitar lead com ID: ${id}`);
      await acceptLead(id);
      console.log(`Lead ${id} aceito com sucesso`);
      
      
      alert(`${lead.contactFirstName || 'Lead'} aceito`);
      
      await loadLeads(); 
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      console.error('Erro ao aceitar lead:', err);
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
      alert('Erro ao aceitar lead: ' + errorMessage);
    }
  };

  const handleDecline = async (id: number) => {
    try {
     
      const lead = leads.find((l) => l.id === id);
      if (!lead) {
        throw new Error('Lead não encontrado');
      }

      console.log(`Tentando recusar lead com ID: ${id}`);
      await declineLead(id);
      console.log(`Lead ${id} recusado com sucesso`);
      
      
      alert(`${lead.contactFirstName || 'Lead'} recusado`);
      
      await loadLeads(); 
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      console.error('Erro ao recusar lead:', err);
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
      alert('Erro ao recusar lead: ' + errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Leads Convidados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onAccept={() => handleAccept(lead.id)}
              onDecline={() => handleDecline(lead.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
