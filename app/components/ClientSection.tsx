"use client";

import { useState } from "react";

export default function ClientSection() {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [response, setResponse] = useState<String>("");
    return (
        <div className="w-full max-w-xl">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                maxLength={200}
                className="focus:ring-neu w-full rounded-md border border-neutral-400
               p-4 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-900"
                placeholder={"챗봇에게 메세지 보내기"}
            />
            {!loading ? (
                <button
                    className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-black/80"
                >
                    보내기 &rarr;
                </button>
            ) : (
                <button
                    disabled
                    className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white"
                >
                    <div className="animate-pulse font-bold tracking-widest">...</div>
                </button>
            )}
            {response && (
                <div className="mt-8 rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100">
                    {response}
                </div>
            )}
        </div>
    );
}
