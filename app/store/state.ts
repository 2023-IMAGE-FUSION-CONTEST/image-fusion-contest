import {create} from "zustand";
import {val} from "cheerio/lib/api/attributes";

type MyStore = {
    toggle: boolean;
    change: () => void;
};

export const useChatToggle = create<MyStore>((set) => ({
    toggle: false,
    change: () => set((state) => ({toggle: !state.toggle}))
}))


type chat = {
    loading: boolean,
    input: string,
    response: string,
    setLoading: (value: boolean) => void
    setInput: (value: string) => void
    setResponse: (value: string) => void
}

export const useChatting = create<chat>((set) => ({
    loading: false,
    input: "",
    response: "",
    setLoading: value => set({loading: value}),
    setInput: value => set({input: value}),
    setResponse: value => set(state => ({response: state.response + value})),
}));
