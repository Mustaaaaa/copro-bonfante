export default function Modal({ isOpen, onClose, onConfirm, title, message, confirmText = "Conferma", cancelText = "Annulla", variant = "primary" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white border border-gray-100 p-6 rounded-sm max-w-md w-full shadow-xl animate-fade-in">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm} 
            className={`px-4 py-2 text-sm font-medium text-white transition-colors rounded-sm ${variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}