import './globals.css'
import { Inter } from 'next/font/google'
import Header from "@/app/components/rootlayout/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Diffusion Talk',
    description: 'OpenAI와 Stable Diffusion을 활용한 화풍 합성 및 AI 큐레이션 서비스',
}

export default function RootLayout({
   children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body className={`${inter.className} bg-[#0F131B]`}>
                <Header />
                { children }
            </body>
        </html>
    )
}
