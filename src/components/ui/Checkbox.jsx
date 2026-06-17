export default function Checkbox({ isSelected }) {
  return (
    <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors shrink-0 ${isSelected ? 'bg-black border-black text-white' : 'border-gray-300 bg-white'}`}>
      {isSelected && <span className="text-xs font-bold pointer-events-none">✓</span>}
    </div>
  );
}