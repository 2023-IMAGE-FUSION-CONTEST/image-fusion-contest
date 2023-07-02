/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "artbank.go.kr"
            },
            {
                protocol: "https",
                hostname: "demo.70e9f1a0f18a49a29a0cd16c9e0750df.lambdaspaces.com"
            }
        ]
    }
}

module.exports = nextConfig
