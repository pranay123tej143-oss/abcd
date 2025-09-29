/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      mqtt: "commonjs mqtt",
    });
    return config;
  },
};

export default nextConfig;
