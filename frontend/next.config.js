/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  output: 'standalone', // Change this line
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;