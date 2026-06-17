import { Droplets, Wind, Thermometer, Eye, Gauge, Zap, CloudRain, Sunrise, Sunset } from 'lucide-react';
import type { WeatherData } from '@/types/weather';
import { windLabel, uvLabel } from '@/utils/weatherHelpers';

interface Props { data: WeatherData }

export default function WeatherDetails({ data }: Props) {
  const primary = [
    { icon: <Droplets size={22} />, label: 'Humidity',   value: `${data.humidity}%`,      sub: data.humidity>70?'High':data.humidity>40?'Moderate':'Low', color:'#60a5fa' },
    { icon: <Wind size={22} />,     label: 'Wind',       value: `${data.windSpeed} km/h`,  sub: `${data.windDirection} · ${windLabel(data.windSpeed)}`,    color:'#38bdf8' },
    { icon: <Thermometer size={22}/>,label:'Feels Like', value: `${data.feelsLike}${data.unit}`, sub: data.feelsLike>data.temperature?'Warmer':data.feelsLike<data.temperature?'Cooler':'Same', color:'#f97316' },
  ];
  const extended = [
    { icon: <Eye size={18} />,      label: 'Visibility',     value: `${data.visibility} km`,  color: '#a78bfa' },
    { icon: <Gauge size={18} />,    label: 'Pressure',       value: `${data.pressure} hPa`,   color: '#34d399' },
    { icon: <Zap size={18} />,      label: 'UV Index',       value: String(data.uvIndex), sub: uvLabel(data.uvIndex), color: '#fbbf24' },
    { icon: <CloudRain size={18} />,label: 'Precipitation',  value: `${data.precipitation} mm`, color: '#60a5fa' },
    { icon: <Sunrise size={18} />,  label: 'Sunrise',        value: data.sunrise,              color: '#fcd34d' },
    { icon: <Sunset size={18} />,   label: 'Sunset',         value: data.sunset,               color: '#fb923c' },
  ];

  return (
    <section className="space-y-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="grid grid-cols-3 gap-3">
        {primary.map((item) => (
          <div key={item.label} className="glass-card rounded-2xl p-4 flex flex-col items-center text-center hover-glow">
            <span style={{ color: item.color }} className="mb-2">{item.icon}</span>
            <p className="text-slate-400 text-xs mb-1">{item.label}</p>
            <p className="font-display font-bold text-lg text-white leading-tight">{item.value}</p>
            {item.sub && <p className="text-xs mt-0.5" style={{ color: item.color }}>{item.sub}</p>}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {extended.map((item) => (
          <div key={item.label} className="glass-card rounded-xl p-3 flex items-center gap-2.5 hover-glow">
            <span style={{ color: item.color }} className="shrink-0">{item.icon}</span>
            <div className="min-w-0">
              <p className="text-slate-500 text-[10px] leading-none mb-0.5">{item.label}</p>
              <p className="text-sm font-semibold text-slate-200 truncate">{item.value}</p>
              {'sub' in item && item.sub && <p className="text-[10px]" style={{ color: item.color }}>{item.sub}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}