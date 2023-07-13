'use client'

import { useState } from "react";
import { useChatList } from "@/app/store/state";
import Button from "@/app/components/chat/input/Button";
import {responseParse} from "@/utils/sessionStorage";

const Input = () => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const setChatList = useChatList(state => state.setList);

    const prompt = `Q: ${input}
        이전 질문, 답변: ${sessionStorage.getItem("before")}
        해당 질문의 [ ] 속에는 이전 대화 기록이 들어있어, 만약 비어있다면 우린 처음 대화하는거야,
        이전 대화를 토대로 현재 질문에 대해 200글자 이내의 답변을 제공해줘, 답변을 제공한 후 "<>==<>" 를 적은 후 해당 질문과 답변의 요약을 Q: 질문 A: 답변 형식으로 요약해줘
        해당 질문에 대한 답변만 제공하면 되므로, 이전 질문에 대한 설명은 답변 안해도 돼
        
        예를들어 "Q: 리그오브레전드에 대해 아나요?.... A: 리그오브레전드는 이러한 것입니다... <>===<> Q: 리그오브레전드에 대해 질문 A: 리그오브 레전드에 대한 설명 요약"
        
        이러한 형식이 되야해
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
