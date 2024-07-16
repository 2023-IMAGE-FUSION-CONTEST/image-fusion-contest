import { create } from "zustand";
import { ChatGPTMessage } from "@/utils/openAiStream";

type SelectedArtwork = {
    id: number;
    title: string;
    description: string;
    author: string;
    type: string;
    year_of_mfg: string;
    url: string;
    image: string;
    imageSize: {
        width: number;
        height: number;
    };
    blurDataURL: string;
    setSelectedArtwork: (value: SelectedArtwork) => void;
    reset: () => void;
    selected: boolean;
    setSelected: (value: boolean) => void;
};

export const useSelectedArtwork = create<SelectedArtwork>((set, get) => ({
    id: 0,
    title: "",
    description: "",
    author: "",
    type: "",
    year_of_mfg: "",
    url: "",
    image: "",
    imageSize: {
        width: 0,
        height: 0,
    },
    blurDataURL: "",
    setSelectedArtwork: (value) => set(value),
    reset: () => set({
        id: 0,
        title: "",
        description: "",
        author: "",
        type: "",
        year_of_mfg: "",
        url: "",
        image: "",
        imageSize: {
            width: 0,
            height: 0,
        },
        blurDataURL: "",
        selected: false,
    }),
    selected: false,
    setSelected: (value) => set({ selected: value }),
}));

type ChatRoomVisible = {
    toggle: boolean;
    change: () => void;
    reset: () => void;
};

export const useChatToggle = create<ChatRoomVisible>((set) => ({
    toggle: false,
    change: () => set((state) => ({ toggle: !state.toggle })),
    reset: () => set({ toggle: false }),
}))

type Chat = {
    input: string;
    setInput: (value: string) => void;
    AITyping: boolean;
    setAITyping: (value: boolean) => void;
}

export const useChat = create<Chat>((set) => ({
    input: "",
    setInput: (value) => set({ input: value }),
    AITyping: false,
    setAITyping: (value) => set({ AITyping: value }),
}))

type ChatList = {
    list: ChatGPTMessage[];
    setList: (value: ChatGPTMessage) => void,
    reset: (value: string) => void,
}

export const useChatList = create<ChatList>((set) => ({
    list: [],
    setList: value => set((state) => ({ list: [...state.list, value] })),
    reset: (value) => set({
        list: [
            { role: "system", content: "너는 작품에 대한 정보를 받고 해당 작품에 대한 설명과 사용자의 질문에 대한 답변과 대화를 해주는 AI야." },
            { role: "system", content: "답변은 항상 한국어로, 그리고 존댓말로 해줘. 작품에 대해 큐레이팅을 한다고 생각하면 좋아. 너무 딱딱한 표현 대신 사용자에게 친근하고 친절하게 대답해줘." },
            { role: "system", content: "너가 알려주고 대화해주어야 할 작품에 대한 정보는 다음과 같은 형식으로 입력될거야. {작가}|{작품명}|{제작년도}|{화풍}|{작품설명}|{작품 이미지 url}" },
            { role: "system", content: "사용자가 작품 이미지에 대해서 잘문한다면 {작품 이미지 url}에서 이미지를 가져와서 분석한 뒤에 답변해줘." },
            { role: "system", content: "답변할 때 마크다운 문법은 지양해주고 엔터를 표현하고 싶으면 html tag인 <br />을 사용해줘" },
            { role: "system", content: value },
        ]
    })
}))
