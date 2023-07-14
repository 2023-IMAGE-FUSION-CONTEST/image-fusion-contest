import { create } from "zustand";
import { ChatGPTMessage } from "@/utils/openAiStream";

type MyStore = {
    toggle: boolean;
    change: () => void;
};

export const useChatToggle = create<MyStore>((set) => ({
    toggle: false,
    change: () => set((state) => ({toggle: !state.toggle}))
}))

type ChatList = {
    list: ChatGPTMessage[];
    setList: (value: ChatGPTMessage) => void,
    reset: (value: string) => void,
}

export const useChatList = create<ChatList>((set) => ({
    list: [],
    setList: value => set(state => ({ list: [...state.list, value] })),
    reset: (value) => set({
        list: [
            { role: "system", content: "너는 작품에 대한 정보를 받고 해당 작품에 대한 설명과 사용자의 질문에 대한 답변과 대화를 해주는 AI야." },
            { role: "system", content: "답변은 항상 한국어로 해줘." },
            { role: "system", content: `너가 알려주고 대화해주어야 할 작품에 대한 정보는 다음과 같아 ${value}` },
        ]
    })
}))
