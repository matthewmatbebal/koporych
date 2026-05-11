import type { NextConfig } from "next";
import path from "path";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  sassOptions: {
    loadPaths: [path.resolve(__dirname, 'src/styles')],
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.up.railway.app',
      },
    ],
  },
};

export default withPayload(nextConfig);
