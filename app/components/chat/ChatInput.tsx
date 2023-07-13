'use client'

import {useChatList, useChatting} from "@/app/store/state";
import {val} from "cheerio/lib/api/attributes";
import {useState} from "react";

export function ChatInput() {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [response, setResponse] = useState<String>("");
    const setChatList = useChatList(state => state.setList);

    const prompt = `Q: ${input}Generate a response with less than 100 characters.`

    const generateResponse = async (e: any) => {
        e.preventDefault();
        setResponse("")
        setLoading(true);

        const res = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({prompt,}),
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        const data = res.body;

        if (!data) {
            return
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setResponse((prev) => prev + chunkValue);
        }
        setChatList(response);
        setLoading(false);
    }

    return (
        <div className="absolute left-0 bottom-0 flex">
            <input
                className="w-60 h-12 px-5 text-sm focus:outline-none bg-gray-800 text-gray-100 placeholder-gray-400"
                type="text"
                placeholder="Type your message..."
                onChange={e => setInput(e.target.value)}
            />
            <button className="w-12 bg-fuchsia-700 text-2xl" onClick={e => generateResponse(e)}>
                ▶
            </button>
        </div>
    )
}

