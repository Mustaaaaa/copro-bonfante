import { useState, useCallback } from 'react';
import StepHeader from '../../../components/ui/StepHeader';
import Input from '../../../components/ui/Input';
import { saveProposal, generateExcelProposal } from '../services/proposalService';
import ExcelPreview from './ExcelPreview';
import { useWizardStore } from '../../../store/useWizardStore';
import DraggableCategoryList from './DraggableCategoryList';

export default function ProposalReview({ onBack }) {
  const { 
    selectedClient: client, 
    finalSelection: categories, 
    docMeta, 
    setFinalSelection, 
    setDocMeta, 
    resetWizard 
  } = useWizardStore();

  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [isEditingMeta, setIsEditingMeta] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const handleMetaChange = useCallback((e) => {
    const { name, value } = e.target;
    setDocMeta({ ...docMeta, [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  }, [docMeta, errors, setDocMeta]);

  const handleSaveMeta = useCallback(() => {
    const newErrors = {};
    if (!docMeta.commessa.trim()) newErrors.commessa = true;
    if (!docMeta.oggetto.trim()) newErrors.oggetto = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsEditingMeta(false);
  }, [docMeta]);

  const handleEditMeta = useCallback(() => setIsEditingMeta(true), []);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      const proposalData = { client, docMeta, categories };
      await saveProposal(proposalData);
      await generateExcelProposal(proposalData);
      setDownloadComplete(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  }, [client, docMeta, categories]);

  return (
    <>
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-sm border border-gray-100 rounded-sm animate-fade-in">
        <div className="mb-8 border-b border-gray-200 pb-6 text-center">
          <StepHeader 
            title="Revisione e Dati Documento" 
            subtitle="Compila i dati di intestazione e controlla la gerarchia prima di generare l'Excel." 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-1 flex flex-col gap-6 h-fit">
            <div className="bg-gray-50 p-6 rounded-sm border border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Destinatario</h3>
              <p className="font-medium text-gray-900 text-lg mb-1">{client.ragioneSociale}</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{client.indirizzo}</p>
                <p>{client.citta} {client.provincia ? `(${client.provincia})` : ''} {client.cap ? `- ${client.cap}` : ''}</p>
                {client.telefono && <p className="pt-2">Tel: {client.telefono}</p>}
                {client.email && <p>Email: {client.email}</p>}
              </div>
            </div>

            <div className={`p-6 rounded-sm border transition-colors ${isEditingMeta ? 'bg-white border-black shadow-sm' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                <h3 className="text-xs font-bold text-black uppercase tracking-wider">
                  Dettagli Intestazione
                </h3>
                {!isEditingMeta && (
                  <button onClick={handleEditMeta} className="text-xs font-medium text-gray-500 hover:text-black underline underline-offset-4">
                    Modifica
                  </button>
                )}
              </div>

              {isEditingMeta ? (
                <div className="space-y-5">
                  <Input label="Luogo e Data" name="luogoData" value={docMeta.luogoData} onChange={handleMetaChange} required />
                  <div>
                    <Input label="Commessa N°" name="commessa" value={docMeta.commessa} onChange={handleMetaChange} required />
                    {errors.commessa && <p className="text-xs text-red-500 mt-1">La commessa è obbligatoria.</p>}
                  </div>
                  <div>
                    <Input label="Oggetto" name="oggetto" value={docMeta.oggetto} onChange={handleMetaChange} required />
                    {errors.oggetto && <p className="text-xs text-red-500 mt-1">L'oggetto è obbligatorio.</p>}
                  </div>
                  <Input label="Riferimento (Opzionale)" name="riferimento" value={docMeta.riferimento} onChange={handleMetaChange} />
                  <button 
                    onClick={handleSaveMeta}
                    className="w-full bg-black text-white py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors mt-2"
                  >
                    Salva Intestazione
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-sm animate-fade-in">
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase">Luogo e Data</span>
                    <p className="text-gray-900 font-medium">{docMeta.luogoData}</p>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase">Commessa</span>
                    <p className="text-gray-900 font-medium">{docMeta.commessa}</p>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase">Oggetto</span>
                    <p className="text-gray-900 font-medium">{docMeta.oggetto}</p>
                  </div>
                  {docMeta.riferimento && (
                    <div>
                      <span className="block text-xs font-semibold text-gray-400 uppercase">Riferimento</span>
                      <p className="text-gray-900 font-medium">{docMeta.riferimento}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <DraggableCategoryList 
            categories={categories} 
            setFinalSelection={setFinalSelection} 
          />
        </div>

        <div className="flex flex-col items-center border-t border-gray-100 pt-8 mt-4">
          {downloadComplete ? (
             <div className="text-center animate-fade-in w-full">
               <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                  <span className="text-2xl text-green-600">✓</span>
               </div>
               <h3 className="text-xl font-medium text-gray-900 mb-2">Pronto!</h3>
               <button onClick={() => { resetWizard(); setDownloadComplete(false); }} className="text-sm font-medium text-gray-500 hover:text-black underline underline-offset-4 mt-4">
                 Inizia una nuova proposta
               </button>
             </div>
          ) : (
            <div className="w-full flex justify-between items-center">
              <button onClick={onBack} className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                &larr; Modifica Voci
              </button>
              <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
                <button 
                  onClick={() => setShowPreview(true)} 
                  disabled={isEditingMeta}
                  className="text-sm font-medium text-black border border-black px-6 py-4 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anteprima Excel
                </button>
                <div className="flex flex-col items-end">
                  <button 
                    onClick={handleGenerate} 
                    disabled={isGenerating || isEditingMeta}
                    className="bg-black text-white px-10 py-4 text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? 'Generazione...' : 'Genera Excel Preventivo'}
                  </button>
                  {isEditingMeta && (
                    <p className="text-xs text-red-500 mt-2 font-medium">
                      * Salva i dettagli di intestazione per procedere
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPreview && (
        <ExcelPreview 
          client={client}
          docMeta={docMeta}
          categories={categories}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}