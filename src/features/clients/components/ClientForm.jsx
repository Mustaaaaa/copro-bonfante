import Input from '../../../components/ui/Input';

export default function ClientForm({ formData, onChange, onSubmit, isLoading, buttonText, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input label="Ragione Sociale / Nome Hotel" name="ragioneSociale" value={formData.ragioneSociale} onChange={onChange} required />
        </div>
        <div>
          <Input label="Telefono Aziendale" name="telefono" value={formData.telefono} onChange={onChange} type="tel" />
        </div>
        <div>
          <Input label="Email" name="email" value={formData.email} onChange={onChange} type="email" />
        </div>
        <div className="md:col-span-2">
          <Input label="Indirizzo" name="indirizzo" value={formData.indirizzo} onChange={onChange} />
        </div>
        <div>
          <Input label="Città" name="citta" value={formData.citta} onChange={onChange} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input label="Provincia" name="provincia" value={formData.provincia} onChange={onChange} maxLength="2" />
          </div>
          <div>
            <Input label="CAP" name="cap" value={formData.cap} onChange={onChange} />
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-6 pt-4">
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-sm font-medium text-gray-500 hover:text-black transition-colors underline underline-offset-4">
            Annulla
          </button>
        )}
        <button disabled={isLoading} type="submit" className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400">
          {isLoading ? 'Salvataggio...' : buttonText}
        </button>
      </div>
    </form>
  );
}