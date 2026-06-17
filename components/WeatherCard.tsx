'use client';
import { MapPin, Clock, Thermometer } from 'lucide-react';
import type { WeatherData } from '@/types/weather';
import { getConditionColor } from '@/utils/weatherHelpers';
import WeatherIcon  from './WeatherIcon';
import WeatherImage from './WeatherImage';

interface Props { data: WeatherData }

export default function WeatherCard({ data }: Props) {
  const accentColor = getConditionColor(data.condition);

  return (
    <div className="glass rounded-2xl overflow-hidden animate-slide-up hover-glow">

      {/* Animated scene banner */}
      <WeatherImage condition={data.condition} isNight={data.isNight} />

      <div className="p-5">
        {/* City + country */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <MapPin size={14} style={{ color: accentColor }} />
              <span className="text-xs font-medium" style={{ color: accentColor }}>
                {data.state && `${data.state}, `}{data.country}
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl text-white leading-tight">
              {data.city}
            </h1>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
            <Clock size={11} />
            <span>{data.lastUpdated}</span>
          </div>
        </div>

        {/* Temperature + icon */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-end gap-1">
              <span className="font-display font-bold text-7xl leading-none text-white">
                {data.temperature}
              </span>
              <span className="font-display text-3xl text-slate-300 mb-2">
                {data.unit}
              </span>
            </div>
            <p className="text-slate-300 text-base font-medium mt-1">
              {data.conditionLabel}
            </p>
          </div>
          <WeatherIcon
            condition={data.condition}
            size={80}
            isNight={data.isNight}
          />
        </div>

        {/* Min / Max + Feels Like + Sunrise/Sunset */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <Thermometer size={14} className="text-slate-400" />
            <span className="text-xs text-slate-400">Feels like</span>
            <span className="text-sm font-semibold text-slate-200">
              {data.feelsLike}{data.unit}
            </span>
          </div>
          <div className="h-3 w-px bg-dark-500" />
          <span className="text-xs text-slate-400">
            <span className="text-blue-400 font-semibold">{data.minTemp}{data.unit}</span>
            {' – '}
            <span className="text-orange-400 font-semibold">{data.maxTemp}{data.unit}</span>
          </span>
          <div className="ml-auto flex items-center gap-1">
            <span className="text-[10px] text-slate-500">Sunrise</span>
            <span className="text-[11px] font-medium text-amber-400">{data.sunrise}</span>
            <span className="text-[10px] text-slate-500 ml-2">Sunset</span>
            <span className="text-[11px] font-medium text-orange-500">{data.sunset}</span>
          </div>
        </div>
      </div>
    </div>
  );
}