/** @type {import('next').NextConfig} */
const nextConfig = {
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
