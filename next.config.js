/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   transpilePackages: ['@douyinfe/semi-ui', '@douyinfe/semi-icons', '@douyinfe/semi-illustrations']
// };
const semi = require('@douyinfe/semi-next').default({
  /* the extension options */
  reactStrictMode: true,
  output: 'export',
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: `http://10.102.174.243:88/:path*`
  //     }
  //   ];
  // },
  swcMinify: true
  // transpilePackages: ['@douyinfe/semi-ui', '@douyinfe/semi-icons', '@douyinfe/semi-illustrations']
});
module.exports = semi({
  // your custom Next.js configuration
});

// module.exports = nextConfig;
