/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_IP_ADDRESS],
  },
};

module.exports = nextConfig;
