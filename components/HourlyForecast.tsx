import WeatherIcon from './WeatherIcon';
import type { HourlyItem } from '@/types/weather';

interface Props { data: HourlyItem[] }

export default function HourlyForecast({ data }: Props) {
  return (
    <section
      className="glass rounded-2xl p-4 animate-slide-up hover-glow"
      style={{ animationDelay: '0.15s' }}
    >
      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
        Hourly Forecast
      </h3>

      <div className="flex gap-3 overflow-x-auto pb-1 -mb-1">
        {data.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-2 px-3 py-3 rounded-xl shrink-0
                        transition-all duration-200 cursor-default
                        ${i === 0
                          ? 'bg-sky-accent/15 border border-sky-accent/40'
                          : 'hover:bg-dark-700'}`}
          >
            <span className={`text-xs font-medium
                              ${i === 0 ? 'text-sky-accent' : 'text-slate-400'}`}>
              {i === 0 ? 'Now' : item.time}
            </span>

            <WeatherIcon
              condition={item.condition}
              size={24}
              isNight={item.isNight}
            />

            <span className="text-sm font-semibold text-slate-200">
              {item.temp}°
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}