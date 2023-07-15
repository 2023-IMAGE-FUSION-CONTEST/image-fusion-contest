'use client'

import {useChat, useChatList} from "@/app/store/state";
import Button from "@/app/components/chat/input/Button";

const Input = () => {
    const input = useChat(state => state.input);
    const setInput = useChat(state => state.setInput);
    const setAITyping = useChat(state => state.setAITyping);
    const chatList = useChatList(state => state.list);
    const setChatList = useChatList(state => state.setList);

    const generateResponse = () => {
        if (!input) return;

        setAITyping(true);
        setInput("");
        setChatList({ role: "user", content: input });

        fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: [...chatList, { role: "user", content: input }] }),
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

                setChatList({ role: "assistant", content: response });
                setAITyping(false);
            });
    }

    return (
        <div className={`w-full h-12 flex rounded-b-xl overflow-hidden bg-[#1A1D25] px-5 justify-center items-center border-t border-purple-700`}>
            <input
                className="w-full h-full text-sm bg-[#1A1D25] focus:outline-none text-gray-100 placeholder-gray-400"
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.nativeEvent.isComposing) return;
                    if (e.key === "Enter") generateResponse();
                }}
            />

            <Button handleOnClick={() => generateResponse()} />
        </div>
    )
};

export default Input;
