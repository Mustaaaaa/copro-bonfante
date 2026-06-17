export default function StepHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-light text-gray-900 mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}