
export default function ClientGrid({ clients, onClientClick, actionText }) {
  if (clients.length === 0) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8 text-sm text-gray-500 border border-dashed border-gray-300 rounded-sm">
        Nessun cliente trovato.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {clients.map((client) => (
        <div 
          key={client.id} 
          onClick={() => onClientClick(client)}
          className="group cursor-pointer border border-gray-200 p-5 rounded-sm flex flex-col justify-between h-full hover:border-black transition-colors"
        >
          <div>
            <h3 className="font-medium text-lg text-gray-900 group-hover:text-black transition-colors">{client.ragioneSociale}</h3>
            <div className="text-sm text-gray-500 mt-3 space-y-1">
              <p>{client.indirizzo}</p>
              <p>{client.citta} {client.provincia && `(${client.provincia})`} {client.cap}</p>
              <div className="pt-2 mt-2 border-t border-gray-100 space-y-1">
                {client.telefono && <p>Tel: <span className="text-gray-700">{client.telefono}</span></p>}
                {client.email && <p>Email: <span className="text-gray-700">{client.email}</span></p>}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end items-center text-xs text-gray-400">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-black font-medium">{actionText} &rarr;</span>
          </div>
        </div>
      ))}
    </div>
  );
}