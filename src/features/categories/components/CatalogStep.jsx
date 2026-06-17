import { useState } from 'react';
import { useWizardStore } from '../../../store/useWizardStore';
import { useCatalog } from '../../../hooks/useCatalog';
import { useCatalogSelection } from '../../../hooks/useCatalogSelection';
import SearchBar from '../../../components/ui/SearchBar';
import Checkbox from '../../../components/ui/Checkbox';
import StepFooter from '../../../components/ui/StepFooter';
import StepHeader from '../../../components/ui/StepHeader';
import SelectAllButton from '../../../components/ui/SelectAllButton';

export default function CatalogStep({ onBack }) {
  const { finalSelection, setFinalSelection, setWizardStep } = useWizardStore();
  const { catalog, isLoading } = useCatalog();
  const [searchTerm, setSearchTerm] = useState('');

  const {
    filteredCatalog,
    selectedSubIds,
    selectedServiceIds,
    collapsedCats,
    isAllGlobalSelected,
    toggleAllGlobal,
    toggleCategoryGroup,
    toggleSubcategory,
    toggleService,
    toggleCollapse,
    generateFinalSelection
  } = useCatalogSelection(finalSelection, catalog, searchTerm);

  const handleProceed = () => {
    setFinalSelection(generateFinalSelection());
    setWizardStep(3);
  };

  if (isLoading) return <div className="text-center py-12 text-gray-500 text-sm">Caricamento catalogo...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-sm border border-gray-100 rounded-sm animate-fade-in">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <StepHeader 
          title="Selezione Aree di Intervento e Tipologie Opere" 
          subtitle="Esplora il catalogo e seleziona le aree di intervento e le tipologie di opere necessarie." 
        />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Cerca area di intervento o tipologia di opere..." />
          <SelectAllButton 
            onClick={toggleAllGlobal}
            isAllSelected={isAllGlobalSelected}
            textSelect="Seleziona Tutto"
            textDeselect="Deseleziona Tutto"
            variant="primary"
          />
        </div>
      </div>

      <div className="space-y-6 mb-8 max-h-150 overflow-y-auto pr-4 custom-scrollbar">
        {filteredCatalog.map((cat) => {
          const isCatSelected = cat.subcategories.every(s => selectedSubIds.has(s.id)) && cat.subcategories.length > 0;
          const isCollapsed = collapsedCats.has(cat.id);

          return (
            <div key={cat.id} className="border border-gray-200 rounded-sm overflow-hidden bg-white">
              <div 
                className="bg-gray-200 px-4 py-3 border-b border-gray-300 flex justify-between items-center cursor-pointer hover:bg-gray-300 transition-colors"
                onClick={(e) => toggleCollapse(e, cat.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-mono text-lg">{isCollapsed ? '+' : '-'}</span>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">{cat.title}</h3>
                </div>
                <SelectAllButton 
                  onClick={(e) => toggleCategoryGroup(e, cat)}
                  isAllSelected={isCatSelected}
                  textSelect="Seleziona Gruppo"
                  textDeselect="Deseleziona Gruppo"
                  variant="secondary"
                />
              </div>
              
              {!isCollapsed && (
                <div className="divide-y divide-gray-100 animate-fade-in">
                  {cat.subcategories.map((sub) => (
                    <div key={sub.id} className={`p-4 transition-colors ${selectedSubIds.has(sub.id) ? 'bg-gray-50' : ''}`}>
                      <div className="flex gap-4 items-start">
                        <div className="mt-1 cursor-pointer" onClick={() => toggleSubcategory(sub)}>
                          <Checkbox isSelected={selectedSubIds.has(sub.id)} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-sm font-bold text-black cursor-pointer" onClick={() => toggleSubcategory(sub)}>{sub.title}</h4>
                            {sub.services && sub.services.length > 0 && (
                              <SelectAllButton 
                                onClick={() => toggleSubcategory(sub)}
                                isAllSelected={sub.services.every(srv => selectedServiceIds.has(srv.id))}
                                textSelect="Seleziona Servizi"
                                textDeselect="Deseleziona Servizi"
                                variant="tertiary"
                              />
                            )}
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed mb-4">{sub.description}</p>
                          
                          {sub.services && sub.services.length > 0 && (
                            <div className="ml-2 pl-4 border-l-2 border-green-200 space-y-2 mt-2">
                              {sub.services.map(srv => (
                                <div key={srv.id} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleService(sub.id, srv.id)}>
                                  <Checkbox isSelected={selectedServiceIds.has(srv.id)} />
                                  <span className={`text-xs font-medium ${selectedServiceIds.has(srv.id) ? 'text-green-700' : 'text-gray-500'}`}>
                                    {srv.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {cat.subcategories.length === 0 && (
                    <div className="p-4 text-xs text-gray-500 italic">Nessuna tipologia opere trovata.</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {filteredCatalog.length === 0 && <p className="text-sm text-gray-500">Nessuna voce trovata nel catalogo.</p>}
      </div>

      <StepFooter 
        onBack={onBack} 
        onProceed={handleProceed} 
        backText="Torna ai Clienti" 
        proceedText={`Vai al Riepilogo \u2192`} 
        isProceedDisabled={selectedSubIds.size === 0} 
      />
    </div>
  );
}