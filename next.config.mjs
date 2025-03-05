/** @type {import('next').NextConfig} */
const nextConfig = {
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
  