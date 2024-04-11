const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: false,
    workboxOptions: {
      disableDevLogs: true,
    }
  });
  
module.exports = {
// Your Next.js config
    output: 'standalone',
    async rewrites() {
      console.error(process.env.NEXT_PUBLIC_RESOURCE_DOMAIN)
      return [
        {
          source: '/configs/:path*',
          destination: process.env.NEXT_PUBLIC_RESOURCE_DOMAIN + '/:path*',
        }
      ]
  },
};