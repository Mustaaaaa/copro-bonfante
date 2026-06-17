import { useState } from 'react';
import { useClients } from '../../../hooks/useClients';
import SearchBar from '../../../components/ui/SearchBar';
import StepHeader from '../../../components/ui/StepHeader';
import ClientForm from './ClientForm';
import ToggleFormButton from '../../../components/ui/ToggleFormButton';
import ClientGrid from '../../../components/shared/ClientGrid';

export default function ClientManagement() {
  const { clients, isLoading, searchTerm, setSearchTerm, handleCreateOrUpdate } = useClients();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClientId, setEditingClientId] = useState(null);
  const [formData, setFormData] = useState({
    ragioneSociale: '', indirizzo: '', citta: '', provincia: '', cap: '', telefono: '', email: ''
  });

  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
    if (isFormOpen) {
      setEditingClientId(null);
      setFormData({ ragioneSociale: '', indirizzo: '', citta: '', provincia: '', cap: '', telefono: '', email: '' });
    }
  };

  const handleEditClient = (client) => {
    setFormData(client);
    setEditingClientId(client.id);
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateOrUpdate(formData, editingClientId);
    handleToggleForm();
  };

  if (isLoading && clients.length === 0) {
    return <div className="text-gray-500 animate-pulse text-sm text-center py-12">Caricamento anagrafica...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-sm border border-gray-100 rounded-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
        <div className="flex-1 w-full flex flex-col gap-4">
          <StepHeader 
            title="Gestione Anagrafica Clienti" 
            subtitle="Consulta, aggiungi o modifica i dati dei clienti." 
          />
          {!isFormOpen && (
            <SearchBar 
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder="Cerca per nome, città, telefono o email..." 
            />
          )}
        </div>
        <ToggleFormButton 
          isOpen={isFormOpen} 
          onClick={handleToggleForm} 
          openText="+ Nuovo Cliente" 
        />
      </div>

      {isFormOpen ? (
        <ClientForm 
          formData={formData} 
          onChange={handleInputChange} 
          onSubmit={handleSubmit} 
          isLoading={isLoading} 
          buttonText={editingClientId ? "Salva Modifiche" : "Salva Cliente"}
          onCancel={handleToggleForm}
        />
      ) : (
        <ClientGrid 
          clients={clients} 
          onClientClick={handleEditClient} 
          actionText="Modifica Dati" 
        />
      )}
    </div>
  );
}