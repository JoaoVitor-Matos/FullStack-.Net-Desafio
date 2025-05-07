import type { Lead } from '../types/lead';
import { Check, X, Mail, Phone, User } from 'lucide-react';

interface Props {
  lead: Lead;
  onAccept?: () => void;
  onDecline?: () => void;
  showContactDetails?: boolean;
}

export function LeadCard({ lead, onAccept, onDecline, showContactDetails = false }: Props) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold text-gray-800">{lead.contactFirstName}</h3>
        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
          {lead.category}
        </span>
      </div>

      <p className="text-gray-600 text-sm italic mb-4">"{lead.description}"</p>

      <div className="text-sm text-gray-700 space-y-1 mb-4">
        <p><strong>💰 Preço:</strong> R$ {lead.price}</p>
        <p><strong>📍 Bairro:</strong> {lead.suburb}</p>
        <p><strong>📅 Data:</strong> {new Date(lead.createdAt).toLocaleDateString()}</p>
      </div>

      {showContactDetails && (
        <div className="mt-4 text-sm bg-gray-100 p-4 rounded-xl border border-gray-200 space-y-2">
          <p className="flex items-center gap-2 text-gray-800"><User size={16} /> {lead.contactFullName}</p>
          <p className="flex items-center gap-2 text-gray-800"><Phone size={16} /> {lead.phoneNumber}</p>
          <p className="flex items-center gap-2 text-gray-800"><Mail size={16} /> {lead.email}</p>
        </div>
      )}

      {!showContactDetails && (
        <div className="mt-5 flex gap-4 justify-end">
          <button
            onClick={onAccept}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Check size={18} /> Aceitar
          </button>
          <button
            onClick={onDecline}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <X size={18} /> Recusar
          </button>
        </div>
      )}
    </div>
  );
}
