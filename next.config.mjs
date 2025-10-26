import { withContentlayer } from "next-contentlayer2";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  turbopack: {},

  redirects: async () => {
    return [
      {
        source: "/resume",
        destination:
          "https://docs.google.com/document/d/1jVX1D--iSqTOtFp_wR7tGbtvLeZIu9AAiQSf3bc0-fY/edit?usp=sharing",
        permanent: true,
      },
    ];
  },
};

export default withContentlayer(nextConfig);
