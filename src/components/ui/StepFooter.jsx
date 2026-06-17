export default function StepFooter({ onBack, onProceed, backText = "Indietro", proceedText = "Procedi", isProceedDisabled = false }) {
  return (
    <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-6">
      <button 
        onClick={onBack} 
        className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
      >
        &larr; {backText}
      </button>
      <button 
        onClick={onProceed} 
        disabled={isProceedDisabled}
        className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
      >
        {proceedText}
      </button>
    </div>
  );
}