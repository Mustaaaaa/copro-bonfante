import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { APP_VIEWS, WIZARD_STEPS } from '../constants/routes';

const getDefaultLuogoData = () => `Cerea, ${new Date().toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;

export const useWizardStore = create(
  persist(
    (set) => ({
      currentView: APP_VIEWS.WIZARD,
      wizardStep: WIZARD_STEPS.CLIENT_SELECTION,
      selectedClient: null,
      finalSelection: [],
      docMeta: {
        luogoData: getDefaultLuogoData(),
        commessa: '',
        oggetto: '',
        riferimento: ''
      },

      setCurrentView: (view) => set({ currentView: view }),
      setWizardStep: (step) => set({ wizardStep: step }),
      setSelectedClient: (client) => set({ selectedClient: client }),
      setFinalSelection: (selection) => set({ finalSelection: selection }),
      setDocMeta: (meta) => set({ docMeta: meta }),
      
      resetWizard: () => set({
        selectedClient: null,
        finalSelection: [],
        wizardStep: WIZARD_STEPS.CLIENT_SELECTION,
        currentView: APP_VIEWS.WIZARD,
        docMeta: { luogoData: getDefaultLuogoData(), commessa: '', oggetto: '', riferimento: '' }
      }),
    }),
    {
      name: 'copro-wizard-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);