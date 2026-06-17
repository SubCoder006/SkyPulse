'use client';

import Navbar         from '@/components/Navbar';
import SearchSection  from '@/components/SearchSection';
import WeatherCard    from '@/components/WeatherCard';
import WeatherDetails from '@/components/WeatherDetails';
import HourlyForecast from '@/components/HourlyForecast';
import WeeklyForecast from '@/components/WeeklyForecast';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage   from '@/components/ErrorMessage';
import { useWeather } from '@/hooks/useWeather';
import { getWeatherBg } from '@/utils/weatherHelpers';
import type { SearchState } from '@/types/weather';

export default function Home() {
  const {
    weatherData, isLoading, error,
    searchState, setSearchState,
    fetchWeather, clearWeather,
  } = useWeather();

  const handleSearch = (s: SearchState) => fetchWeather(s);
  const bgClass = getWeatherBg(weatherData?.condition);

  return (
    <main className={`min-h-screen transition-all duration-700 ${bgClass}`}>
      <div className="max-w-2xl mx-auto px-4 pb-16">

        <Navbar />

        <SearchSection
          onSearch={handleSearch}
          isLoading={isLoading}
          searchState={searchState}
          setSearchState={setSearchState}
        />

        {isLoading && <LoadingSpinner />}

        {error && !isLoading && (
          <ErrorMessage message={error} onRetry={() => fetchWeather(searchState)} />
        )}

        {weatherData && !isLoading && !error && (
          <div className="space-y-4">
            <WeatherCard    data={weatherData} />
            <WeatherDetails data={weatherData} />
            <HourlyForecast data={weatherData.hourly} />
            <WeeklyForecast data={weatherData.daily}  />
            <button
              onClick={clearWeather}
              className="w-full py-3 rounded-xl text-sm font-medium text-slate-400
                         border border-dark-500 hover:border-sky-accent/40
                         hover:text-sky-accent transition-all duration-200"
            >
              Search another city
            </button>
          </div>
        )}

        {!weatherData && !isLoading && !error && (
          <div className="flex flex-col items-center gap-3 py-16 text-center animate-fade-in">
            <div className="text-6xl select-none">🌤️</div>
            <p className="text-slate-400 text-sm max-w-xs">
              Select a region and country above, then search for any city to see live weather.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}