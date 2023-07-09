import ClientSection from "@/app/components/ClientSection";

export default function Home() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 text-center">
            <h1 className="my-4 text-6xl font-bold text-white">GPT PAGE</h1>
            <ClientSection />
        </div>
    )
}
