import { useEffect, useState } from 'react';
import { getAcceptedLeads } from '../services/leadService';
import type { Lead } from '../types/lead';
import { LeadCard } from '../components/leadcard';
import { Navbar } from '../components/navbar';

export default function AcceptedPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAcceptedLeads();
      setLeads(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Leads Aceitos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              showContactDetails
            />
          ))}
        </div>
      </main>
    </div>
  );
}
