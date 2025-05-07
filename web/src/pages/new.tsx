import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import axios, { AxiosError } from 'axios';
import type { Lead } from '../types/lead';

interface ApiErrorResponse {
  message?: string;
}

export default function NewLeadPage() {
  const navigate = useNavigate();
  const [lead, setLead] = useState<Partial<Lead>>({
    contactFirstName: '',
    contactFullName: '',
    phoneNumber: '',
    email: '',
    suburb: '',
    category: '',
    description: '',
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLead((prev) => ({
      ...prev,
      [name]: name === 'price' ? (value === '' ? 0 : parseFloat(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...lead,
        status: 'Invited',
        createdAt: new Date().toISOString(),
      };
      await axios.post('http://localhost:5085/api/leads', payload);
      alert('Lead criado com sucesso!');
      navigate('/invited');
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao criar lead';
      console.error('Erro ao criar lead:', err);
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Navbar />
      <main className="max-w-xl mx-auto p-6 bg-white mt-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Novo Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {[
            { name: 'contactFirstName', label: 'Primeiro nome', type: 'text', required: true },
            { name: 'contactFullName', label: 'Nome completo', type: 'text', required: true },
            { name: 'phoneNumber', label: 'Telefone', type: 'text',required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'suburb', label: 'Bairro', type: 'text', required: true },
            { name: 'category', label: 'Categoria', type: 'text', required: true },
          ].map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                required={field.required}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-black bg-white"
              />
            </div>
          ))}

          <div>
            <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              required
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black bg-white"
            />
          </div>

          <div>
            <label htmlFor="price" className="block font-medium text-gray-700 mb-1">
              Preço
            </label>
            <input
              id="price"
              name="price"
              type="number"
              required
              min="0"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-black bg-white"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Salvar
          </button>
        </form>
      </main>
    </div>
  );
}
