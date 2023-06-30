export interface ArtworkType {
    title: string,
    description: string,
    year_of_mfg: string,
    type: "oriental" | "western" | "",
    author: string,
    url: string,
    image: string
}

export type PaintingType = "oriental" | "western";
