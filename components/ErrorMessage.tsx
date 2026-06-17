import { CloudOff, RefreshCw } from 'lucide-react';

interface Props { message: string; onRetry?: () => void; }

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="glass rounded-2xl p-8 flex flex-col items-center gap-4 text-center
                    animate-fade-in border border-red-500/20">
      <div className="relative">
        <CloudOff size={52} className="text-red-400 opacity-80" strokeWidth={1.5} />
        <span className="absolute inset-0 rounded-full border border-red-400/30 animate-ping
                         opacity-20 pointer-events-none scale-150" />
      </div>
      <div>
        <h3 className="font-display font-semibold text-lg text-slate-200 mb-1">Something went wrong</h3>
        <p className="text-sm text-slate-400 max-w-xs">{message}</p>
      </div>
      <ul className="text-xs text-slate-500 space-y-1 text-left w-full max-w-xs">
        <li>• Check the city name spelling</li>
        <li>• Make sure you selected the correct country</li>
        <li>• Try a nearby larger city</li>
      </ul>
      {onRetry && (
        <button onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold
                     text-sky-accent border border-sky-accent/40
                     hover:bg-sky-accent/10 hover:border-sky-accent transition-all duration-200">
          <RefreshCw size={14} />Try again
        </button>
      )}
    </div>
  );
}