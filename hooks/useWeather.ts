'use client';
import { useState, useCallback } from 'react';
import type { WeatherData, SearchState } from '@/types/weather';
import type { ApiResponse }              from '@/types/api';

interface UseWeatherReturn {
  weatherData: WeatherData | null; isLoading: boolean; error: string | null;
  searchState: SearchState; setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
  fetchWeather: (search: SearchState) => Promise<void>; clearWeather: () => void;
}

const defaultSearch: SearchState = { region: '', country: '', state: '', city: '' };

export function useWeather(): UseWeatherReturn {
  const [weatherData,  setWeatherData]  = useState<WeatherData | null>(null);
  const [isLoading,    setIsLoading]    = useState(false);
  const [error,        setError]        = useState<string | null>(null);
  const [searchState,  setSearchState]  = useState<SearchState>(defaultSearch);

  const fetchWeather = useCallback(async (search: SearchState) => {
    const { city, state, country, region } = search;
    if (!city.trim()) { setError('Please enter a city name.'); return; }

    setIsLoading(true); setError(null); setWeatherData(null);

    try {
      const params = new URLSearchParams({
        city,
        ...(country && { country }),
        ...(state   && { state   }),
        ...(region  && { region  }),
      });
      const res  = await fetch(`/api/weather?${params}`);
      const json = (await res.json()) as ApiResponse<WeatherData>;
      if (!json.success) throw new Error(json.error);
      setWeatherData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearWeather = useCallback(() => {
    setWeatherData(null); setError(null); setSearchState(defaultSearch);
  }, []);

  return { weatherData, isLoading, error, searchState, setSearchState, fetchWeather, clearWeather };
}