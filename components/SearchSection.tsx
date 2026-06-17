'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Globe, MapPin, Search, X, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { regions }            from '@/data/regions';
import { countriesByRegion }  from '@/data/countries';
import { statesByCountry }    from '@/data/states';
import { getCitySuggestions } from '@/data/cities';
import type { SearchState }   from '@/types/weather';

interface Props {
  onSearch:       (state: SearchState) => void;
  isLoading:      boolean;
  searchState:    SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
}

export default function SearchSection({ onSearch, isLoading, searchState, setSearchState }: Props) {
  const { region, country, state: selectedState, city } = searchState;
  const [cityQuery,       setCityQuery]       = useState('');
  const [suggestions,     setSuggestions]     = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const cityRef = useRef<HTMLInputElement>(null);

  const countryList = region  ? countriesByRegion[region]  ?? [] : [];
  const stateGroups = country ? statesByCountry[country]   ?? [] : [];

  const selectRegion  = (r: string) => { setSearchState({ region: r, country: '', state: '', city: '' }); setCityQuery(''); setSuggestions([]); };
  const selectCountry = (c: string) => { setSearchState((p) => ({ ...p, country: c, state: '', city: '' })); setCityQuery(''); };
  const selectState   = (s: string) => { setSearchState((p) => ({ ...p, state: s, city: '' })); setCityQuery(''); setSuggestions([]); };

  const handleCityInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setCityQuery(q);
    setSearchState((p) => ({ ...p, city: '' }));
    if (q.length >= 2) { setSuggestions(getCitySuggestions(q, selectedState)); setShowSuggestions(true); }
    else { setSuggestions([]); setShowSuggestions(false); }
  }, [selectedState, setSearchState]);

  const selectCity = (c: string) => { setCityQuery(c); setSearchState((p) => ({ ...p, city: c })); setShowSuggestions(false); };

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.parentElement?.contains(e.target as Node))
        setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const handleSearch = () => {
    const resolved = city || cityQuery;
    if (!resolved.trim()) return;
    onSearch({ region, country, state: selectedState, city: resolved.trim() });
  };

  const step = !region ? 1 : !country ? 2 : !selectedState ? 3 : 4;

  return (
    <section className="glass rounded-2xl p-5 mb-6 space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Globe size={18} className="text-sky-accent" />
        <h2 className="font-display font-semibold text-base text-slate-200">Find Weather</h2>
        <div className="ml-auto flex gap-1">
          {[1,2,3,4].map((s) => (
            <span key={s} className={clsx('h-1.5 rounded-full transition-all duration-300',
              s <= step ? 'bg-sky-accent w-5' : 'bg-dark-500 w-3')} />
          ))}
        </div>
      </div>

      {/* Step 1 — Region */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-widest">Region</label>
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button key={r.id} onClick={() => selectRegion(r.id)}
              className={clsx('px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200',
                region === r.id
                  ? 'bg-sky-accent/20 border-sky-accent text-sky-accent shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                  : 'border-dark-500 text-slate-400 hover:border-sky-accent/50 hover:text-slate-200')}>
              {r.emoji} {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 — Country */}
      {region && (
        <div className="animate-slide-up">
          <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-widest">Country</label>
          <div className="max-h-36 overflow-y-auto rounded-xl border border-dark-500 p-2
                          grid grid-cols-2 sm:grid-cols-3 gap-1.5 pr-3">
            {countryList.map((c) => (
              <button key={c} onClick={() => selectCountry(c)}
                className={clsx('px-3 py-1.5 rounded-lg text-sm text-left truncate transition-all',
                  country === c
                    ? 'bg-sky-accent/15 text-sky-accent border border-sky-accent/40'
                    : 'text-slate-300 hover:bg-dark-700 hover:text-slate-100')}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 — State */}
      {country && stateGroups.length > 0 && (
        <div className="animate-slide-up">
          <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-widest">State / Province</label>
          <div className="max-h-44 overflow-y-auto rounded-xl border border-dark-500 p-2 space-y-3">
            {stateGroups.map((group) => (
              <div key={group.label}>
                {stateGroups.length > 1 && (
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-1 mb-1">
                    {group.label}
                  </p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {group.items.map((s) => (
                    <button key={s} onClick={() => selectState(s)}
                      className={clsx('px-3 py-1.5 rounded-lg text-sm text-left truncate transition-all',
                        selectedState === s
                          ? 'bg-sky-accent/15 text-sky-accent border border-sky-accent/40'
                          : 'text-slate-300 hover:bg-dark-700 hover:text-slate-100')}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {country && stateGroups.length === 0 && (
        <p className="text-xs text-slate-500 italic px-1 animate-fade-in">
          No sub-regions listed for {country} — enter city directly.
        </p>
      )}

      {/* Step 4 — City */}
      {country && (
        <div className="animate-slide-up">
          <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-widest">City / Village</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              ref={cityRef}
              type="text"
              value={cityQuery}
              onChange={handleCityInput}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder={selectedState ? `Search city in ${selectedState}…` : `Search any city in ${country}…`}
              className="glass-input w-full pl-10 pr-10 py-3 rounded-xl text-sm text-slate-200 placeholder:text-slate-500"
            />
            {cityQuery && (
              <button onClick={() => { setCityQuery(''); setSuggestions([]); setShowSuggestions(false); setSearchState((p) => ({ ...p, city: '' })); cityRef.current?.focus(); }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors">
                <X size={15} />
              </button>
            )}
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-50 left-0 right-0 top-full mt-1.5 glass rounded-xl
                             border border-sky-accent/20 overflow-hidden shadow-xl animate-slide-down">
                {suggestions.map((c, i) => (
                  <li key={i}>
                    <button onMouseDown={() => selectCity(c)}
                      className="w-full px-4 py-2.5 text-sm text-left text-slate-200
                                 hover:bg-sky-accent/10 hover:text-sky-accent
                                 flex items-center gap-2 transition-colors">
                      <MapPin size={13} className="text-slate-500 shrink-0" />
                      <span>{c}</span>
                      {selectedState && <span className="ml-auto text-xs text-slate-500 shrink-0">{selectedState}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Search button */}
      <button onClick={handleSearch} disabled={isLoading || (!city && !cityQuery)}
        className={clsx('w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300',
          isLoading || (!city && !cityQuery)
            ? 'bg-dark-600 text-slate-500 cursor-not-allowed'
            : 'bg-sky-accent text-dark-950 hover:bg-sky-light hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]')}>
        {isLoading ? <><Loader2 size={16} className="animate-spin" />Fetching weather…</> : <><Search size={16} />Get Weather</>}
      </button>
    </section>
  );
}