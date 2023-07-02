import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "artbank.go.kr"
            },
            {
                protocol: "https",
                hostname: "demo.70e9f1a0f18a49a29a0cd16c9e0750df.lambdaspaces.com"
            }
        ]
    }
}

export default withPlaiceholder(nextConfig);
