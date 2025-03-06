/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cdn.shopify.com", // ✅ Allow external Shopify images
      },
    ],
  },
    async redirects() {
      return [
        {
          source: "/", // Redirect from root
          destination: "/Home", // Go to /Home
          permanent: true, // 301 redirect
        },
      ];
    },
  };
  
  export default nextConfig; // ✅ Correct for .mjs
  