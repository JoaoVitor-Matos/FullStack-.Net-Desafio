import { useEffect, useState } from 'react';
import { Navbar } from '../components/navbar';
import { LeadCard } from '../components/leadcard';
import axios from 'axios';
import type { Lead } from '../types/lead';

export default function DeclinedPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5085/api/leads/declined').then((res) => {
      setLeads(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Leads Recusados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} showContactDetails />
          ))}
        </div>
      </main>
    </div>
  );
}
