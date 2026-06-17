let mockClients = [
  { 
    id: '1', 
    ragioneSociale: 'Hotel Ferdinando II', 
    indirizzo: 'Piazza Garibaldi, 5', 
    citta: 'Napoli', 
    provincia: 'NA', 
    cap: '80100',
    telefono: '0812345678',
    email: 'info@hotelferdinando.it'
  },
  { 
    id: '2', 
    ragioneSociale: 'Resort Miramare', 
    indirizzo: 'Viale Vespucci, 12', 
    citta: 'Rimini', 
    provincia: 'RN', 
    cap: '47921',
    telefono: '0541987654',
    email: 'contatti@resortmiramare.com'
  }
];

export const fetchClients = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockClients]), 400);
  });
};

export const createClient = async (clientData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newClient = { ...clientData, id: crypto.randomUUID() };
      mockClients = [newClient, ...mockClients];
      resolve(newClient);
    }, 400);
  });
};

export const updateClient = async (updatedClient) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockClients = mockClients.map(c => c.id === updatedClient.id ? updatedClient : c);
      resolve(updatedClient);
    }, 400);
  });
};