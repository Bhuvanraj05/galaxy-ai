/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Add fallback for 'canvas' module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };
    return config;
  },
  // Disable server-side rendering for PDF viewer
  reactStrictMode: true,
};

module.exports = nextConfig; 