'use client'

import { useState } from "react";
import { useChatList, useImageDetail } from "@/app/store/state";
import Button from "@/app/components/chat/input/Button";
import {responseParse} from "@/utils/sessionStorage";

const Input = () => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const setChatList = useChatList(state => state.setList);
    const imageDetail = useImageDetail(state => state.description);
    const imageAuthor = useImageDetail(state => state.author);

    const prompt = `
    Your role as an AI is to provide answers to questions related to an image that I provide.
    Sentences that start with "D:" are descriptions of the image, while sentences that start with "Q:" are user's questions.
    Sentences that start with "R:" are records of the previous chats, formatted as [Q: Question A: Answer]. 
    These reference previous conversations, and if it's empty, it implies that it's the first conversation.

        D: ${imageDetail}, author: ${imageAuthor}
        Q: ${input}
        R: ${sessionStorage.getItem("before")}
        
    Your goal is to provide answers to the user's current questions related to the image, based on the previous chat. If you know additional information that's not included in the description, explain it.
    After providing an answer, mark with "<>==<>" and summarize the question and answer in the format "Q: Question A: Answer".

    For example, for a question like "D: Description of the image... Q: Question about the image... A: Answer about the image...", the response should be something like "My thoughts on the given image and question are...".
    Avoid repeating sentences starting with "D:", "Q:", "R:".

Responses should be provided in Korean.
    `


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
                response = responseParse(response);
                setChatList(response);
                setLoading(false);
            });
    }

    return (
        <div className={`w-full h-12 flex rounded-b-xl overflow-hidden bg-[#1A1D25] px-5 justify-center items-center border-t border-purple-700`}>
            <input
                className="w-full h-full text-sm bg-[#1A1D25] focus:outline-none text-gray-100 placeholder-gray-400"
                type="text"
                placeholder="Type your message..."
                onChange={e => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") generateResponse(e);
                }}
            />

            <Button handleOnClick={generateResponse} />
        </div>
    )
};

export default Input;
