import React from 'react';

const PreviewRow = ({ label, value }) => (
  <tr>
    <td className="border border-gray-300 p-2 font-bold w-1/4">{label}</td>
    <td className="border border-gray-300 p-2 w-3/4">{value}</td>
  </tr>
);

const CategoryHeaderRow = ({ title }) => (
  <tr>
    <td colSpan="2" className="border border-gray-300 p-2 font-bold bg-gray-100 text-blue-900">
      {title}
    </td>
  </tr>
);

const SubcategoryRow = ({ title, description }) => (
  <>
    <tr>
      <td colSpan="2" className="border border-gray-300 p-2 font-semibold pl-6">
        {title}
      </td>
    </tr>
    <tr>
      <td colSpan="2" className="border border-gray-300 p-2 text-xs text-gray-600 pl-6 italic">
        {description}
      </td>
    </tr>
  </>
);

const ServiceRow = ({ title }) => (
  <tr>
    <td colSpan="2" className="border border-gray-300 p-2 text-xs pl-10">
      - {title}
    </td>
  </tr>
);

export default function ExcelPreview({ client, docMeta, categories, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-gray-200 shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col rounded-sm">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Anteprima Foglio di Calcolo</h2>
            <p className="text-xs text-gray-500">I dati mostrati riflettono la struttura dell'Excel che verrà generato.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
          >
            CHIUDI ANTEPRIMA ✕
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <div className="bg-white p-8 shadow-sm border border-gray-300 min-w-200 font-mono text-sm">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <PreviewRow label="Luogo e Data" value={docMeta.luogoData} />
                <PreviewRow label="Cliente" value={client.ragioneSociale} />
                <PreviewRow label="Commessa" value={docMeta.commessa} />
                <PreviewRow label="Oggetto" value={docMeta.oggetto} />
                {docMeta.riferimento && (
                  <PreviewRow label="Riferimento" value={docMeta.riferimento} />
                )}
                
                <tr><td colSpan="2" className="h-4"></td></tr>

                <tr>
                  <td colSpan="2" className="border border-gray-300 p-2 font-bold bg-gray-200 text-center uppercase">
                    VOCI 
                  </td>
                </tr>
                
                {categories.map(cat => (
                  <React.Fragment key={cat.id}>
                    <CategoryHeaderRow title={cat.title} />
                    {cat.subcategories.map(sub => (
                      <React.Fragment key={sub.id}>
                        <SubcategoryRow title={sub.title} description={sub.description} />
                        {sub.services?.map(srv => (
                          <ServiceRow key={srv.id} title={srv.title} />
                        ))}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}