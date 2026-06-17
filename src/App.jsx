import { useState } from 'react';
import { useWizardStore } from './store/useWizardStore';
import ClientManagement from './features/clients/components/ClientManagement';
import ClientStep from './features/clients/components/ClientStep';
import CatalogStep from './features/categories/components/CatalogStep';
import ProposalReview from './features/proposals/components/ProposalReview';
import ProposalHistory from './features/proposals/components/ProposalHistory';
import Modal from './components/ui/Modal';

export default function App() {
  const { 
    currentView, setCurrentView, 
    wizardStep, setWizardStep, 
    selectedClient, setSelectedClient, 
    resetWizard 
  } = useWizardStore();
  
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleConfirmCancel = () => {
    resetWizard();
    setIsCancelModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-light text-gray-900 tracking-widest uppercase">COPRO</h1>
            <p className="text-xs text-gray-500 mt-1 tracking-wide">Configuratore Proposte d'Arredo Bonfante</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2">
            <div className="flex gap-2 bg-gray-100 p-1 rounded-sm">
              <button 
                onClick={() => setCurrentView('clients')}
                className={`px-6 py-2 text-sm font-medium transition-colors rounded-sm ${currentView === 'clients' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                Gestione Clienti
              </button>
              <button 
                onClick={() => setCurrentView('wizard')}
                className={`px-6 py-2 text-sm font-medium transition-colors rounded-sm ${currentView === 'wizard' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                Nuova Proposta
              </button>
              <button 
                onClick={() => setCurrentView('history')}
                className={`px-6 py-2 text-sm font-medium transition-colors rounded-sm ${currentView === 'history' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
              >
                Storico
              </button>
            </div>
            {currentView === 'wizard' && selectedClient && (
              <button 
                onClick={() => setIsCancelModalOpen(true)}
                className="ml-2 px-4 py-2 text-xs font-bold tracking-wider text-red-600 hover:bg-red-50 border border-red-200 rounded-sm transition-colors uppercase"
              >
                Azzera Proposta
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {currentView === 'clients' && (
          <ClientManagement />
        )}

        {currentView === 'history' && (
          <ProposalHistory />
        )}

        {currentView === 'wizard' && (
          <>
            {wizardStep === 1 && (
              <ClientStep 
                onClientSelect={(client) => { 
                  setSelectedClient(client); 
                  setWizardStep(2); 
                }} 
              />
            )}

            {wizardStep === 2 && (
              <CatalogStep onBack={() => setWizardStep(1)} />
            )}

            {wizardStep === 3 && (
              <ProposalReview onBack={() => setWizardStep(2)} />
            )}
          </>
        )}
      </div>

      <Modal 
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Annullare la proposta?"
        message="Sei sicuro di voler azzerare la configurazione corrente? Tutti i dati inseriti finora andranno persi in modo definitivo."
        confirmText="Sì, azzera"
        cancelText="No, continua"
        variant="danger"
      />
    </div>
  );
}