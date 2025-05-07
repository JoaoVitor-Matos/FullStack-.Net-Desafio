export type LeadStatus = 'Invited' | 'Accepted' | 'Declined';

export interface Lead {
  id: number;
  contactFirstName: string;
  contactFullName?: string;
  phoneNumber?: string;
  email?: string;
  suburb: string;
  category: string;
  description: string;
  price: number;
  createdAt: string;
  status: LeadStatus;
}
