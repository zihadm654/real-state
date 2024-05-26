// FIX: I changed .mjs to .js
// More info: https://github.com/shadcn-ui/taxonomy/issues/100#issuecomment-1605867844

import("./src/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
};

// const withContentlayer = createContentlayerPlugin({
//   // Additional Contentlayer config options
// });

module.exports = nextConfig;
