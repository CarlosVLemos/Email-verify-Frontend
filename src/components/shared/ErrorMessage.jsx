export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-500/10 dark:bg-red-900/30 border border-red-500/50 dark:border-red-500/40 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚠️</span>
        <p className="text-red-600 dark:text-red-300 font-medium">{message}</p>
      </div>
    </div>
  );
}
