# 🌦️ SkyPulse

SkyPulse is a modern full-stack weather application built with Next.js that provides real-time weather insights with a sleek bluish-dark UI and dynamic condition-based visuals.

## 🚀 Overview

SkyPulse delivers accurate and fast weather updates with a clean, responsive interface. It focuses on performance, modular architecture, and an engaging user experience through dynamic weather representations.

---

## ✨ Features

* 🌍 Real-time weather data fetching
* 🔍 Search weather by city/location
* 🌡️ Detailed metrics (temperature, humidity, wind, visibility)
* 🎨 Dynamic weather icons & visuals (sunny, cloudy, thunder, etc.)
* 🌙 Bluish-dark modern UI theme
* 📱 Fully responsive design
* ⚡ Optimized performance with Next.js

---

## 🛠️ Tech Stack

* **Frontend & Backend:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Utilities:** clsx

---

## 📁 Project Structure
```
SkyPulse/
├── app/          # App router pages & layouts
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── lib/          # Core logic / API handling
├── utils/        # Helper functions
├── types/        # TypeScript definitions
├── public/       # Static assets
└── data/         # Static/mock data (if any)
```
---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

git clone https://github.com/SubCoder006/SkyPulse.git
cd SkyPulse

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Run Development Server

npm run dev

Open 👉 http://localhost:3000

---

## 🔐 Environment Variables

Create a `.env.local` file:
OPENWEATHER_API_KEY=api_key
GEONAMES_USERNAME=your_geonames_username_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
CACHE_WEATHER_TTL=600000
CACHE_FORECAST_TTL=1800000
CACHE_CITIES_TTL=3600000

> Replace with your actual API provider (OpenWeather, WeatherAPI, etc.)

---

## 📦 Scripts

npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Run production build
npm run lint    # Lint code

---

## 🚀 Deployment

Easily deploy using:

* Vercel (recommended)
* Netlify
* Any Node.js hosting platform

---

## 🔮 Future Enhancements

* 📊 Hourly & weekly forecast charts
* 📍 Auto-detect location (Geolocation API)
* ⭐ Save favorite cities
* 🌗 Light/Dark theme toggle
* 📈 Advanced weather analytics

---

## 🤝 Contributing

Contributions are welcome:

1. Fork the repository
2. Create a new branch
3. Make changes
4. Submit a pull request

---

## 📄 License

Add your preferred license (MIT recommended)

---

## 👨‍💻 Author

**SubCoder006**

---

## 💡 Resume Line

**SkyPulse – Weather Forecasting Web App**
Built a full-stack weather application using Next.js and TypeScript, featuring real-time API integration, dynamic UI rendering based on weather conditions, and a responsive bluish-dark themed interface.
