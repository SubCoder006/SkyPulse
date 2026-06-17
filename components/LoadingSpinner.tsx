export default function LoadingSpinner() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col items-center gap-3 py-6">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 rounded-full border-2 border-sky-accent/20" />
          <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-sky-accent animate-spin" />
          <span className="absolute inset-2 rounded-full bg-sky-accent/10 animate-pulse" />
        </div>
        <p className="text-sm text-slate-400 animate-pulse">Fetching weather data…</p>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <div className="h-48 shimmer-bg animate-shimmer" />
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-3 w-24 rounded shimmer-bg animate-shimmer" />
              <div className="h-8 w-36 rounded shimmer-bg animate-shimmer" />
            </div>
            <div className="h-3 w-16 rounded shimmer-bg animate-shimmer mt-1" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-16 w-28 rounded shimmer-bg animate-shimmer" />
              <div className="h-4  w-24 rounded shimmer-bg animate-shimmer" />
            </div>
            <div className="h-20 w-20 rounded-full shimmer-bg animate-shimmer" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[1,2,3].map((i) => (
          <div key={i} className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2">
            <div className="h-6 w-6 rounded-full shimmer-bg animate-shimmer" />
            <div className="h-3 w-14 rounded shimmer-bg animate-shimmer" />
            <div className="h-6 w-16 rounded shimmer-bg animate-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}