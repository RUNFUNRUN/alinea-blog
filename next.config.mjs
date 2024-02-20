/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@alinea/generated']
  }
};

export default nextConfig;
