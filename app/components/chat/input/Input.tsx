'use client'

import { useState } from "react";
import { useChatList } from "@/app/store/state";
import Button from "@/app/components/chat/input/Button";

const Input = () => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const setChatList = useChatList(state => state.setList);

    const prompt = `Q: ${input}Generate a response with less than 100 characters.`

    const generateResponse = (e: any) => {
        e.preventDefault();
        setLoading(true);

        fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({prompt,}),
        })
            .then(async (res) => {
                if (!res.ok) throw new Error(res.statusText);

                const data = res.body;
                if (!data) return;

                const reader = data.getReader();
                const decoder = new TextDecoder();
                let done = false;

                let response = "";
                while (!done) {
                    const { value, done: doneReading } = await reader.read();
                    done = doneReading;
                    const chunkValue = decoder.decode(value);
                    response += chunkValue;
                }

                setChatList(response);
                setLoading(false);
            });
    }

    return (
        <div className={`w-full h-12 flex`}>
            <div className={`w-60 h-full`}>
                <input
                    className="w-full h-full px-5 text-sm focus:outline-none bg-gray-800 text-gray-100 placeholder-gray-400"
                    type="text"
                    placeholder="Type your message..."
                    onChange={e => setInput(e.target.value)}
                />
            </div>

            <Button handleOnClick={generateResponse} />
        </div>
    )
};

export default Input;
