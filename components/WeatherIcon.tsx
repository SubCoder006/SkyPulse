import {
  Sun, Moon, MoonStar, Cloud, CloudRain, CloudMoon,
  CloudLightning, CloudSnow, CloudDrizzle, CloudFog,
  Wind, CloudHail,
} from 'lucide-react';
import type { WeatherCondition } from '@/types/weather';

interface Props {
  condition: WeatherCondition;
  size?:     number;
  isNight?:  boolean;
  className?: string;
}

export default function WeatherIcon({
  condition,
  size      = 64,
  isNight   = false,
  className = '',
}: Props) {
  const glow = `drop-shadow-[0_0_${Math.round(size * 0.14)}px_currentColor] ${className}`;
  const sw   = 1.5;

  /* ── Night variants ─────────────────────────────────────────────── */
  if (isNight) {
    switch (condition) {

      case 'sunny':
        return (
          <MoonStar
            size={size}
            className={`text-indigo-200 ${glow}`}
            strokeWidth={sw}
          />
        );

      case 'partly-cloudy':
        return (
          <div className="relative inline-flex items-center justify-center"
               style={{ width: size, height: size }}>
            <Moon
              size={size * 0.65}
              className="text-indigo-200 absolute top-0 right-0"
              strokeWidth={sw}
            />
            <Cloud
              size={size * 0.78}
              className="text-slate-400 absolute bottom-0 left-0"
              strokeWidth={sw}
            />
          </div>
        );

      case 'cloudy':
        return (
          <Cloud
            size={size}
            className={`text-slate-500 ${glow}`}
            strokeWidth={sw}
          />
        );

      case 'drizzle':
        return (
          <CloudDrizzle
            size={size}
            className={`text-blue-400 ${glow}`}
            strokeWidth={sw}
          />
        );

      case 'rainy':
        return (
          <div className="relative inline-flex items-center justify-center"
               style={{ width: size, height: size }}>
            <Moon
              size={size * 0.45}
              className="text-indigo-200 absolute top-0 right-0"
              strokeWidth={sw}
            />
            <CloudRain
              size={size * 0.85}
              className={`text-blue-400 absolute bottom-0 left-0 ${glow}`}
              strokeWidth={sw}
            />
          </div>
        );

      case 'thunderstorm':
        return (
          <CloudLightning
            size={size}
            className={`text-purple-400 animate-lightning ${glow}`}
            strokeWidth={sw}
          />
        );

      case 'snowy':
        return (
          <CloudSnow
            size={size}
            className={`text-sky-200 ${glow}`}
            strokeWidth={sw}
          />
        );

      case 'foggy':
        return (
          <CloudFog
            size={size}
            className={`text-slate-400 ${glow}`}
            strokeWidth={sw}
          />
        );

      case 'windy':
        return (
          <Wind
            size={size}
            className={`text-indigo-300 ${glow}`}
            strokeWidth={sw}
          />
        );

      case 'hazy':
        return (
          <CloudMoon
            size={size}
            className={`text-amber-300 ${glow}`}
            strokeWidth={sw}
          />
        );
    }
  }

  /* ── Day variants ───────────────────────────────────────────────── */
  switch (condition) {

    case 'sunny':
      return (
        <Sun
          size={size}
          className={`text-yellow-400 ${glow}`}
          strokeWidth={sw}
        />
      );

    case 'partly-cloudy':
      return (
        <div className="relative inline-flex items-center justify-center"
             style={{ width: size, height: size }}>
          <Sun
            size={size * 0.70}
            className="text-yellow-400 absolute top-0 right-0"
            strokeWidth={sw}
          />
          <Cloud
            size={size * 0.78}
            className="text-slate-400 absolute bottom-0 left-0"
            strokeWidth={sw}
          />
        </div>
      );

    case 'cloudy':
      return (
        <Cloud
          size={size}
          className={`text-slate-400 ${glow}`}
          strokeWidth={sw}
        />
      );

    case 'drizzle':
      return (
        <CloudDrizzle
          size={size}
          className={`text-blue-400 ${glow}`}
          strokeWidth={sw}
        />
      );

    case 'rainy':
      return (
        <CloudRain
          size={size}
          className={`text-blue-500 ${glow}`}
          strokeWidth={sw}
        />
      );

    case 'thunderstorm':
      return (
        <CloudLightning
          size={size}
          className={`text-purple-400 animate-lightning ${glow}`}
          strokeWidth={sw}
        />
      );

    case 'snowy':
      return (
        <CloudSnow
          size={size}
          className={`text-sky-200 ${glow}`}
          strokeWidth={sw}
        />
      );

    case 'foggy':
      return (
        <CloudFog
          size={size}
          className={`text-slate-400 ${glow}`}
          strokeWidth={sw}
        />
      );

    case 'windy':
      return (
        <Wind
          size={size}
          className={`text-sky-accent ${glow}`}
          strokeWidth={sw}
        />
      );

    case 'hazy':
      return (
        <CloudHail
          size={size}
          className={`text-amber-400 ${glow}`}
          strokeWidth={sw}
        />
      );

    default:
      return (
        <Sun
          size={size}
          className={`text-yellow-400 ${glow}`}
          strokeWidth={sw}
        />
      );
  }
}