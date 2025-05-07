import axios from 'axios';
import type { Lead } from '../types/lead';

const api = axios.create({
  baseURL: 'http://localhost:5085/api/leads',
});

export const getInvitedLeads = () => api.get<Lead[]>('/invited');
export const getAcceptedLeads = () => api.get<Lead[]>('/accepted');
export const acceptLead = (id: number) => api.post(`/${id}/accept`); 
export const declineLead = (id: number) => api.post(`/${id}/decline`); 