import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchClients, createClient, updateClient } from '../features/clients/services/clientService';

export function useClients() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClients().then(data => {
      setClients(data);
      setIsLoading(false);
    });
  }, []);

  const filteredClients = useMemo(() => {
    if (!searchTerm) return clients;
    const lowerSearch = searchTerm.toLowerCase();
    return clients.filter(c => 
      c.ragioneSociale.toLowerCase().includes(lowerSearch) ||
      c.citta.toLowerCase().includes(lowerSearch) ||
      (c.telefono && c.telefono.includes(lowerSearch)) ||
      (c.email && c.email.toLowerCase().includes(lowerSearch))
    );
  }, [clients, searchTerm]);

  const handleCreateOrUpdate = useCallback(async (clientData, editingId) => {
    setIsLoading(true);
    try {
      if (editingId) {
        const updated = await updateClient({ ...clientData, id: editingId });
        setClients(prev => prev.map(c => c.id === updated.id ? updated : c));
        return updated;
      } else {
        const newClient = await createClient(clientData);
        setClients(prev => [newClient, ...prev]);
        return newClient;
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { clients: filteredClients, isLoading, searchTerm, setSearchTerm, handleCreateOrUpdate };
}