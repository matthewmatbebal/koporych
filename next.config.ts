import type { NextConfig } from "next";
import path from "path";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  sassOptions: {
    loadPaths: [path.resolve(__dirname, 'src/styles')],
  },
};

export default withPayload(nextConfig);
