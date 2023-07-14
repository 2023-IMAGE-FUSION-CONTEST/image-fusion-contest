'use client'

import { useState } from "react";
import { useChatList } from "@/app/store/state";
import Button from "@/app/components/chat/input/Button";

const Input = () => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const chatList = useChatList(state => state.list);
    const setChatList = useChatList(state => state.setList);

    const generateResponse = (e: any) => {
        e.preventDefault();
        setLoading(true);

        fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: [...chatList, { role: "user", content: input }] }),
        })
            .then(async (res) => {
                if (!res.ok) throw new Error(res.statusText);

                setChatList({ role: "user", content: input });
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

                setChatList({ role: "assistant", content: response });
                setLoading(false);
                setInput("");
            });
    }

    return (
        <div className={`w-full h-12 flex rounded-b-xl overflow-hidden bg-[#1A1D25] px-5 justify-center items-center border-t border-purple-700`}>
            <input
                className="w-full h-full text-sm bg-[#1A1D25] focus:outline-none text-gray-100 placeholder-gray-400"
                type="text"
                placeholder="Type your message..."
                onChange={e => setInput(e.target.value)}
                onKeyUp={(e) => {
                    e.preventDefault();
                    if (e.key === "Enter") generateResponse(e);
                }}
            />

            <Button handleOnClick={generateResponse} />
        </div>
    )
};

export default Input;
