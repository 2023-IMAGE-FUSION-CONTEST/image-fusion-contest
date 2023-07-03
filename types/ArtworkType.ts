export interface ArtworkType {
    id: number,
    title: string,
    description: string,
    year_of_mfg: string,
    type: "oriental" | "western" | "",
    author: string,
    url: string,
    image: string,
    blurDataURL: string,
    imageSize: { width: number, height: number }
}

export type PaintingType = "oriental" | "western";
