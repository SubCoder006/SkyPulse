import WeatherIcon from './WeatherIcon';
import type { DailyItem } from '@/types/weather';

interface Props { data: DailyItem[] }

export default function WeeklyForecast({ data }: Props) {
  const absMin = Math.min(...data.map((d) => d.minTemp));
  const absMax = Math.max(...data.map((d) => d.maxTemp));
  const range  = absMax - absMin || 1;

  return (
    <section className="glass rounded-2xl p-4 animate-slide-up hover-glow" style={{ animationDelay: '0.20s' }}>
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
        7-Day Forecast
      </h3>
      <div className="space-y-1">
        {data.map((item, i) => {
          const barLeft  = ((item.minTemp - absMin) / range) * 100;
          const barWidth = ((item.maxTemp - item.minTemp) / range) * 100;
          return (
            <div key={i}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${i === 0 ? 'bg-sky-accent/10 border border-sky-accent/20' : 'hover:bg-dark-700'}`}>
              <span className={`w-12 text-sm font-medium shrink-0 ${i === 0 ? 'text-sky-accent' : 'text-slate-300'}`}>
                {item.day}
              </span>
              <div className="w-8 shrink-0 flex justify-center">
                <WeatherIcon condition={item.condition} size={22} />
              </div>
              <span className="hidden sm:block text-xs text-slate-500 w-28 truncate shrink-0">{item.label}</span>
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <span className="text-xs text-blue-400 font-semibold w-8 text-right shrink-0">{item.minTemp}°</span>
                <div className="flex-1 h-1.5 bg-dark-600 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 h-full rounded-full bg-gradient-to-r from-blue-400 via-sky-accent to-orange-400"
                    style={{ left: `${barLeft}%`, width: `${Math.max(barWidth, 8)}%` }} />
                </div>
                <span className="text-xs text-orange-400 font-semibold w-8 shrink-0">{item.maxTemp}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}