/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'openweathermap.org' },
      { protocol: 'https', hostname: 'cdn.weatherapi.com' },
    ],
  },
};

export default nextConfig;