  
module.exports = {
// Your Next.js config
    output: 'standalone',
    productionBrowserSourceMaps: false,
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