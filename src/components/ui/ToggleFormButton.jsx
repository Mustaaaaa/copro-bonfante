export default function ToggleFormButton({ isOpen, onClick, openText, closeText = "Torna alla lista" }) {
  return (
    <button
      onClick={onClick}
      className="text-sm font-medium text-black hover:text-gray-600 transition-colors underline underline-offset-4 whitespace-nowrap mb-2"
    >
      {isOpen ? closeText : openText}
    </button>
  );
}