/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001/api/v1" // development api
        : "http://localhost:3001/api/v1", // production api
  },
};

module.exports = nextConfig;
