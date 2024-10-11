/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "commonwealth.im" },
      { hostname: "googleusercontent.com" },
    ],
  },
}

export default nextConfig
