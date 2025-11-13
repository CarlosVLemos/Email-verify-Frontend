export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚠️</span>
        <p className="text-red-300 font-medium">{message}</p>
      </div>
    </div>
  );
}
