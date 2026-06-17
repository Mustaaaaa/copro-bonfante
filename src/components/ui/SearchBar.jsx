export default function SearchBar({ value, onChange, placeholder = "Cerca..." }) {
  return (
    <div className="relative max-w-md w-full">
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black transition-colors text-sm"
      />
      <span className="absolute left-2 top-2.5 text-gray-400 select-none">🔍</span>
    </div>
  );
}