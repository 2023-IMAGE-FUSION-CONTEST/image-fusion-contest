import {create} from "zustand";

type MyStore = {
    toggle: boolean;
    change: () => void;
};

export const useChatToggle = create<MyStore>((set) => ({
    toggle: false,
    change: () => set((state) => ({toggle: !state.toggle}))
}))
