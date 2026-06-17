'use client';
import type { WeatherCondition } from '@/types/weather';

interface Props {
  condition: WeatherCondition;
  isNight?:  boolean;
}

/* ════════════════════════════════════════════════════════
   NIGHT SCENES
════════════════════════════════════════════════════════ */

function ClearNightScene() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="nightSky" cx="50%" cy="40%" r="70%">
          <stop offset="0%"   stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#e0e7ff" />
          <stop offset="70%"  stopColor="#c7d2fe" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="200" fill="url(#nightSky)" />

      {/* Stars */}
      {[
        [30,20],[80,15],[140,25],[200,10],[260,18],[320,12],[370,22],
        [55,45],[110,38],[175,50],[240,35],[300,48],[350,40],
        [20,70],[90,65],[160,72],[230,60],[310,68],[380,55],
        [45,95],[130,88],[210,98],[290,85],[360,92],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 1}
          fill="white" opacity={0.6 + (i % 3) * 0.15}>
          <animate attributeName="opacity"
            values={`${0.4 + (i%3)*0.2};0.9;${0.4 + (i%3)*0.2}`}
            dur={`${2 + (i % 4)}s`} repeatCount="indefinite"
            begin={`${(i * 0.3) % 3}s`} />
        </circle>
      ))}

      {/* Moon glow halo */}
      <circle cx="300" cy="65" r="42" fill="#6366f1" opacity="0.08" />
      {/* Moon disc */}
      <circle cx="300" cy="65" r="30" fill="url(#moonGlow)" />
      {/* Crescent shadow */}
      <circle cx="314" cy="60" r="24" fill="#1e1b4b" opacity="0.85" />

      <ellipse cx="200" cy="200" rx="280" ry="48" fill="#312e81" opacity="0.35" />
      <ellipse cx="200" cy="202" rx="240" ry="30" fill="#020617" opacity="0.6" />
    </svg>
  );
}

function PartlyCloudyNightScene() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="pcnSky" cx="50%" cy="40%" r="70%">
          <stop offset="0%"   stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
      </defs>
      <rect width="400" height="200" fill="url(#pcnSky)" />

      {/* Stars */}
      {[[30,20],[80,15],[140,25],[320,12],[370,22],[55,45],[350,40]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="white" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3"
            dur={`${2 + i}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} />
        </circle>
      ))}

      {/* Moon crescent */}
      <circle cx="130" cy="65" r="26" fill="#c7d2fe" opacity="0.9" />
      <circle cx="143" cy="60" r="20" fill="#1e1b4b"  opacity="0.88" />

      {/* Drifting cloud */}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="-4 0;4 0;-4 0" dur="7s" repeatCount="indefinite" />
        <ellipse cx="210" cy="105" rx="88" ry="36" fill="#334155" />
        <ellipse cx="165" cy="100" rx="55" ry="30" fill="#3b4f65" />
        <ellipse cx="255" cy="98"  rx="58" ry="28" fill="#3b4f65" />
        <ellipse cx="210" cy="88"  rx="48" ry="26" fill="#475569" />
      </g>

      <ellipse cx="200" cy="200" rx="280" ry="48" fill="#020617" opacity="0.7" />
    </svg>
  );
}

function RainyNightScene() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="200" fill="#060e1c" />
      <ellipse cx="200" cy="72" rx="100" ry="42" fill="#0f1f35" />
      <ellipse cx="150" cy="68" rx="68"  ry="36" fill="#0f1f35" />
      <ellipse cx="255" cy="65" rx="72"  ry="33" fill="#0f1f35" />
      {/* Moon barely through clouds */}
      <circle cx="300" cy="40" r="16" fill="#c7d2fe" opacity="0.15" />
      {Array.from({ length: 18 }, (_, i) => (
        <line key={i}
          x1={30+i*22} y1={120+(i*17)%80} x2={27+i*22} y2={135+(i*17)%80}
          stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to="-8 60" dur={`${0.7+(i%4)*0.12}s`}
            repeatCount="indefinite" begin={`${(i*0.08).toFixed(2)}s`} />
        </line>
      ))}
      <ellipse cx="200" cy="200" rx="280" ry="45" fill="#020817" opacity="0.9" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════
   DAY SCENES
════════════════════════════════════════════════════════ */

function SunnyScene() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="skyG" cx="50%" cy="40%" r="70%">
          <stop offset="0%"   stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <radialGradient id="sunG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fef08a" />
          <stop offset="60%"  stopColor="#facc15" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="200" fill="url(#skyG)" />
      <circle cx="200" cy="90" r="60" fill="#facc15" opacity="0.08" />
      <circle cx="200" cy="90" r="38" fill="url(#sunG)">
        <animateTransform attributeName="transform" type="rotate"
          from="0 200 90" to="360 200 90" dur="30s" repeatCount="indefinite" />
      </circle>
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const inner = 44, outer = 60 + (i % 2) * 8;
        return (
          <line key={i}
            x1={200+Math.cos(angle)*inner} y1={90+Math.sin(angle)*inner}
            x2={200+Math.cos(angle)*outer} y2={90+Math.sin(angle)*outer}
            stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
            <animateTransform attributeName="transform" type="rotate"
              from="0 200 90" to="360 200 90" dur="30s" repeatCount="indefinite" />
          </line>
        );
      })}
      <ellipse cx="200" cy="200" rx="280" ry="60" fill="#1e3a5f" opacity="0.6" />
      <ellipse cx="60"  cy="70"  rx="30"  ry="14" fill="white" opacity="0.12" />
      <ellipse cx="330" cy="55"  rx="35"  ry="15" fill="white" opacity="0.10" />
    </svg>
  );
}

function PartlyCloudyScene() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="200" fill="#1e3352" />
      <circle cx="140" cy="80" r="36" fill="#facc15" opacity="0.85">
        <animate attributeName="r" values="36;39;36" dur="4s" repeatCount="indefinite" />
      </circle>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <line key={i}
            x1={140+Math.cos(a)*40} y1={80+Math.sin(a)*40}
            x2={140+Math.cos(a)*55} y2={80+Math.sin(a)*55}
            stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        );
      })}
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="-5 0;5 0;-5 0" dur="6s" repeatCount="indefinite" />
        <ellipse cx="210" cy="105" rx="85" ry="35" fill="#475569" />
        <ellipse cx="170" cy="100" rx="50" ry="30" fill="#4b5563" />
        <ellipse cx="250" cy="98"  rx="55" ry="28" fill="#4b5563" />
        <ellipse cx="210" cy="88"  rx="45" ry="26" fill="#64748b" />
      </g>
      <ellipse cx="200" cy="200" rx="280" ry="55" fill="#0d1520" opacity="0.6" />
    </svg>
  );
}

function CloudyScene() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="200" fill="#1a2535" />
      <g opacity="0.5">
        <ellipse cx="80"  cy="90" rx="65" ry="28" fill="#374151" />
        <ellipse cx="320" cy="75" rx="70" ry="30" fill="#374151" />
      </g>
      <g>
        <animateTransform attributeName="transform" type="translate"
          values="-6 0;6 0;-6 0" dur="5s" repeatCount="indefinite" />
        <ellipse cx="200" cy="100" rx="90" ry="38" fill="#475569" />
        <ellipse cx="155" cy="95"  rx="55" ry="32" fill="#4b5563" />
        <ellipse cx="245" cy="92"  rx="60" ry="30" fill="#4b5563" />
        <ellipse cx="200" cy="82"  rx="50" ry="28" fill="#64748b" />
      </g>
      <ellipse cx="200" cy="200" rx="280" ry="50" fill="#0d1520" opacity="0.7" />
    </svg>
  );
}

function DrizzleScene() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="200" fill="#0d1b32" />
      <ellipse cx="200" cy="68" rx="90" ry="36" fill="#263445" />
      <ellipse cx="148" cy="64" rx="58" ry="30" fill="#2a3a50" />
      <ellipse cx="258" cy="62" rx="62" ry="28" fill="#2a3a50" />
      {Array.from({ length: 24 }, (_, i) => (
        <circle key={i} cx={10+i*17} cy={120+(i*13)%50} r="1.8"
          fill="#93c5fd" opacity="0.6">
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to="-4 55" dur={`${0.9+(i%5)*0.1}s`}
            repeatCount="indefinite" begin={`${(i*0.07).toFixed(2)}s`} />
        </circle>
      ))}
      <ellipse cx="200" cy="200" rx="280" ry="42" fill="#060e1c" opacity="0.8" />
    </svg>
  );
}

function RainyScene() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="200" fill="#0d1b32" />
      <ellipse cx="200" cy="80" rx="100" ry="42" fill="#1e293b" />
      <ellipse cx="150" cy="75" rx="65"  ry="35" fill="#1e293b" />
      <ellipse cx="250" cy="73" rx="70"  ry="32" fill="#1e293b" />
      {Array.from({ length: 18 }, (_, i) => (
        <line key={i}
          x1={30+i*22} y1={120+(i*17)%80} x2={27+i*22} y2={135+(i*17)%80}
          stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to="-8 60" dur={`${0.7+(i%4)*0.12}s`}
            repeatCount="indefinite" begin={`${(i*0.08).toFixed(2)}s`} />
        </line>
      ))}
      <ellipse cx="200" cy="200" rx="280" ry="45" fill="#050d1a" opacity="0.8" />
    </svg>
  );
}

function ThunderScene() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="200" fill="#0e0620" />
      <ellipse cx="200" cy="70" rx="110" ry="45" fill="#0f0820" />
      <ellipse cx="140" cy="65" rx="75"  ry="38" fill="#120a24" />
      <ellipse cx="265" cy="62" rx="80"  ry="36" fill="#120a24" />
      <polyline points="210,80 195,115 208,115 193,150"
        fill="none" stroke="#e879f9" strokeWidth="3.5"
        strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="opacity"
          values="0;0;0;1;0;1;0;0;0;0" dur="3.5s" repeatCount="indefinite" />
      </polyline>
      <polyline points="210,80 195,115 208,115 193,150"
        fill="none" stroke="#f0abfc" strokeWidth="8"
        strokeLinecap="round" opacity="0.25">
        <animate attributeName="opacity"
          values="0;0;0;0.3;0;0.3;0;0;0;0" dur="3.5s" repeatCount="indefinite" />
      </polyline>
      {Array.from({ length: 14 }, (_, i) => (
        <line key={i} x1={20+i*28} y1={130} x2={14+i*28} y2={148}
          stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to="-10 55" dur={`${0.6+(i%3)*0.1}s`}
            repeatCount="indefinite" begin={`${(i*0.06).toFixed(2)}s`} />
        </line>
      ))}
      <ellipse cx="200" cy="200" rx="280" ry="40" fill="#030108" opacity="0.9" />
    </svg>
  );
}

function SnowyScene() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="200" fill="#1a2a4a" />
      <ellipse cx="200" cy="72" rx="95" ry="38" fill="#334155" />
      <ellipse cx="148" cy="68" rx="60" ry="32" fill="#3b4f65" />
      <ellipse cx="258" cy="65" rx="65" ry="30" fill="#3b4f65" />
      {Array.from({ length: 20 }, (_, i) => (
        <circle key={i} cx={15+i*20} cy={115+(i*19)%60} r={2+(i%3)}
          fill="#bae6fd" opacity="0.7">
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to={`${i%2===0?5:-5} 70`}
            dur={`${3+(i%5)*0.5}s`} repeatCount="indefinite"
            begin={`${(i*0.14).toFixed(2)}s`} />
        </circle>
      ))}
      <ellipse cx="200" cy="200" rx="280" ry="55" fill="#e2e8f0" opacity="0.15" />
    </svg>
  );
}

function FoggyScene() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="200" fill="#0f172a" />
      {[0,1,2,3,4].map((i) => (
        <rect key={i} x="-20" y={50+i*32} width="440" height="20"
          fill="#334155" opacity={0.3-i*0.04} rx="10">
          <animateTransform attributeName="transform" type="translate"
            values={`${i%2===0?'-8 0':'8 0'};${i%2===0?'8 0':'-8 0'};${i%2===0?'-8 0':'8 0'}`}
            dur={`${6+i}s`} repeatCount="indefinite" />
        </rect>
      ))}
    </svg>
  );
}

function WindyScene() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="200" fill="#162438" />
      {[
        {y:55,w:200,x:20,dur:'1.8s',delay:'0s'},
        {y:80,w:260,x:0,dur:'2.1s',delay:'0.2s'},
        {y:105,w:180,x:50,dur:'1.6s',delay:'0.4s'},
        {y:130,w:230,x:10,dur:'2.3s',delay:'0.1s'},
        {y:155,w:150,x:80,dur:'1.9s',delay:'0.3s'},
      ].map((l, i) => (
        <path key={i}
          d={`M${l.x},${l.y} Q${l.x+l.w*0.4},${l.y-12} ${l.x+l.w},${l.y}`}
          fill="none" stroke="#38bdf8" strokeWidth="2"
          strokeLinecap="round" opacity="0.4">
          <animate attributeName="opacity" values="0;0.5;0"
            dur={l.dur} repeatCount="indefinite" begin={l.delay} />
          <animateTransform attributeName="transform" type="translate"
            from="0 0" to="20 0" dur={l.dur}
            repeatCount="indefinite" begin={l.delay} />
        </path>
      ))}
      <ellipse cx="200" cy="200" rx="280" ry="48" fill="#0a1520" opacity="0.7" />
    </svg>
  );
}

function HazyScene() {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="200" fill="#201c10" />
      <circle cx="150" cy="85" r="40" fill="#d97706" opacity="0.4">
        <animate attributeName="opacity" values="0.3;0.5;0.3"
          dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="85" r="28" fill="#fbbf24" opacity="0.5" />
      {[0,1,2,3].map((i) => (
        <rect key={i} x="0" y={70+i*34} width="400" height="26"
          fill="#92400e" opacity={0.08-i*0.01} rx="0">
          <animateTransform attributeName="transform" type="translate"
            values={`${i%2===0?'-6 0':'6 0'};${i%2===0?'6 0':'-6 0'};${i%2===0?'-6 0':'6 0'}`}
            dur={`${7+i}s`} repeatCount="indefinite" />
        </rect>
      ))}
      <ellipse cx="200" cy="200" rx="280" ry="50" fill="#1a1005" opacity="0.8" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════
   WRAPPER
════════════════════════════════════════════════════════ */

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/5">
      {children}
    </div>
  );
}

export default function WeatherImage({ condition, isNight = false }: Props) {
  // Night-specific scenes
  if (isNight) {
    if (condition === 'sunny')         return <Wrap><ClearNightScene /></Wrap>;
    if (condition === 'partly-cloudy') return <Wrap><PartlyCloudyNightScene /></Wrap>;
    if (condition === 'rainy')         return <Wrap><RainyNightScene /></Wrap>;
    if (condition === 'drizzle')       return <Wrap><RainyNightScene /></Wrap>;
  }

  // Day scenes (also fallback for night conditions without a custom scene)
  if (condition === 'sunny')         return <Wrap><SunnyScene /></Wrap>;
  if (condition === 'partly-cloudy') return <Wrap><PartlyCloudyScene /></Wrap>;
  if (condition === 'cloudy')        return <Wrap><CloudyScene /></Wrap>;
  if (condition === 'drizzle')       return <Wrap><DrizzleScene /></Wrap>;
  if (condition === 'rainy')         return <Wrap><RainyScene /></Wrap>;
  if (condition === 'thunderstorm')  return <Wrap><ThunderScene /></Wrap>;
  if (condition === 'snowy')         return <Wrap><SnowyScene /></Wrap>;
  if (condition === 'foggy')         return <Wrap><FoggyScene /></Wrap>;
  if (condition === 'windy')         return <Wrap><WindyScene /></Wrap>;
  if (condition === 'hazy')          return <Wrap><HazyScene /></Wrap>;
  return <Wrap><SunnyScene /></Wrap>;
}