import {ChatGPTMessage} from "@/utils/openAiStream";

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


type ChatRoomVisible = {
    toggle: boolean;
    change: () => void;
    reset: () => void;
};


type Chat = {
    input: string;
    setInput: (value: string) => void;
    AITyping: boolean;
    setAITyping: (value: boolean) => void;
}


type ChatList = {
    list: ChatGPTMessage[];
    setList: (value: ChatGPTMessage) => void,
    reset: (value: string) => void,
}

type SelectedAvatar = {
    onSelected: boolean;
    change: () => void;
}
