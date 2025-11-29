export const DayCardTool = ({ date, temperature, label }: { date: string, temperature: number, label: string }) => {
  return (
    <div className="max-w-sm mx-auto rounded-xl shadow-lg overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-6 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-zinc-400 uppercase tracking-wide mb-1">Day Card</span>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{label}</h2>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <span className="text-sm text-zinc-500">Date</span>
          <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{date}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-zinc-500">Temperature</span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{temperature}&deg;F</span>
        </div>
      </div>
    </div>
  );
};