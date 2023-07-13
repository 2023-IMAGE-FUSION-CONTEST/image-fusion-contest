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
    },
    async rewrites() {
        return [
            {
                source: "/gallery/oriental",
                has: [
                    {
                        type: "query",
                        key: "page",
                        value: "(?<page>.*)"
                    }
                ],
                destination: "/gallery/oriental/:page",
            },
            {
                source: "/gallery/oriental",
                missing: [
                    {
                        type: "query",
                        key: "page"
                    }
                ],
                destination: "/gallery/oriental/1",
            },
            {
                source: "/gallery/western",
                missing: [
                    {
                        type: "query",
                        key: "page"
                    }
                ],
                destination: "/gallery/western/1",
            },
            {
                source: "/gallery/culture",
                missing: [
                    {
                        type: "query",
                        key: "page"
                    }
                ],
                destination: "/gallery/culture/1",
            },
        ]
    }
}

export default withPlaiceholder(nextConfig);
