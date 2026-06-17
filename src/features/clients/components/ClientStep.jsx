import { useState } from 'react';
import { useClients } from '../../../hooks/useClients';
import SearchBar from '../../../components/ui/SearchBar';
import StepHeader from '../../../components/ui/StepHeader';
import ClientForm from './ClientForm';
import ToggleFormButton from '../../../components/ui/ToggleFormButton';
import ClientGrid from '../../../components/shared/ClientGrid';

export default function ClientStep({ onClientSelect }) {
  const { clients, isLoading, searchTerm, setSearchTerm, handleCreateOrUpdate } = useClients();
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [formData, setFormData] = useState({ ragioneSociale: '', indirizzo: '', citta: '', provincia: '', cap: '', telefono: '', email: '' });

  const handleToggleForm = () => {
    setIsCreatingNew(!isCreatingNew);
    if (!isCreatingNew) setFormData({ ragioneSociale: '', indirizzo: '', citta: '', provincia: '', cap: '', telefono: '', email: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newClient = await handleCreateOrUpdate(formData, null);
    onClientSelect(newClient);
  };

  if (isLoading && clients.length === 0) return <div className="text-center py-12">Caricamento...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-sm border border-gray-100 rounded-sm">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4 gap-4">
        <div className="flex-1">
          <StepHeader title="Selezione Cliente" subtitle="Seleziona un cliente o creane uno nuovo." />
          {!isCreatingNew && <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Cerca..." />}
        </div>
        <ToggleFormButton isOpen={isCreatingNew} onClick={handleToggleForm} openText="+ Nuovo Cliente" />
      </div>

      {isCreatingNew ? (
        <ClientForm formData={formData} onChange={(e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))} onSubmit={handleSubmit} isLoading={isLoading} buttonText="Crea e Seleziona" onCancel={handleToggleForm} />
      ) : (
        <ClientGrid clients={clients} onClientClick={onClientSelect} actionText="Seleziona" />
      )}
    </div>
  );
}