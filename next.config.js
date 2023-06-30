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
            }
        ]
    }
}

module.exports = nextConfig
