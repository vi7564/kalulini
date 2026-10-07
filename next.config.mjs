/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'images.unsplash.com',
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com'
    ],
  },
};

export default nextConfig;
