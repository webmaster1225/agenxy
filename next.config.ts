import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/images/**",
      },
      // Live Instagram posts and avatars on the artist EPKs (src/lib/instagram.ts)
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
  async redirects() {
    // The old single artist template page; each artist now has their own EPK at /artists/[slug].
    return [{ source: "/artists/each-artists", destination: "/artists", permanent: false }];
  },
};

export default nextConfig;
