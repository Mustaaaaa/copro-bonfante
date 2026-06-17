import { useState, useMemo, useCallback } from 'react';
import { useProposals } from '../../../hooks/useProposals';
import { generateExcelProposal } from '../services/proposalService';
import SearchBar from '../../../components/ui/SearchBar';
import StepHeader from '../../../components/ui/StepHeader';

export default function ProposalHistory() {
  const { proposals, isLoading } = useProposals();
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);

  const filteredProposals = useMemo(() => {
    if (!searchTerm) return proposals;
    const lowerSearch = searchTerm.toLowerCase();
    return proposals.filter(p => 
      p.client.ragioneSociale.toLowerCase().includes(lowerSearch) ||
      p.docMeta.commessa.toLowerCase().includes(lowerSearch) ||
      p.docMeta.oggetto.toLowerCase().includes(lowerSearch)
    );
  }, [proposals, searchTerm]);

  const handleDownload = useCallback(async (proposal) => {
    setDownloadingId(proposal.id);
    await generateExcelProposal(proposal);
    setDownloadingId(null);
  }, []);

  if (isLoading) return <div className="text-center py-12 text-gray-500 text-sm">Caricamento storico...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-sm border border-gray-100 rounded-sm animate-fade-in">
      <div className="mb-8 border-b border-gray-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex-1 w-full">
          <StepHeader 
            title="Storico Proposte" 
            subtitle="Consulta i preventivi generati e riscarica i file Excel." 
          />
          <SearchBar 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Cerca per cliente, commessa o oggetto..." 
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredProposals.map((proposal) => (
          <div key={proposal.id} className="border border-gray-200 rounded-sm p-5 flex flex-col md:flex-row justify-between items-center gap-4 hover:border-black transition-colors">
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">Cliente</span>
                <p className="font-medium text-gray-900">{proposal.client.ragioneSociale}</p>
                <p className="text-xs text-gray-500">{proposal.docMeta.luogoData}</p>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">Commessa</span>
                <p className="font-medium text-gray-900">{proposal.docMeta.commessa}</p>
                <p className="text-xs text-gray-500">{proposal.docMeta.oggetto}</p>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">Voci Selezionate</span>
                <p className="text-sm text-gray-600">{proposal.categories.length} Macro-Categorie</p>
              </div>
            </div>
            
            <button 
              onClick={() => handleDownload(proposal)}
              disabled={downloadingId === proposal.id}
              className="w-full md:w-auto bg-gray-100 text-black px-6 py-2 text-sm font-medium hover:bg-gray-200 transition-colors shrink-0 flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {downloadingId === proposal.id ? 'Scaricando...' : '↓ Scarica Excel'}
            </button>
          </div>
        ))}

        {filteredProposals.length === 0 && (
          <div className="text-center py-12 text-sm text-gray-500 border border-dashed border-gray-300 rounded-sm">
            {proposals.length === 0 ? 'Nessuna proposta salvata nello storico.' : 'Nessuna proposta corrisponde alla ricerca.'}
          </div>
        )}
      </div>
    </div>
  );
}