export default function SelectAllButton({ 
  onClick, 
  isAllSelected, 
  textSelect, 
  textDeselect, 
  variant = "primary" 
}) {
  const baseClasses = "font-medium transition-colors whitespace-nowrap cursor-pointer";
  
  const variants = {
    primary: "text-sm text-black hover:text-gray-600 underline underline-offset-4",
    secondary: "text-xs text-gray-600 hover:text-black",
    tertiary: "text-xs text-gray-400 hover:text-black"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variants[variant]}`}
    >
      {isAllSelected ? textDeselect : textSelect}
    </button>
  );
}